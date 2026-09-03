import { Loader } from "@/utils/loader";
import { TryRefreshComponent } from "components/src/auth/RefreshClient";
import { getSSRSessionHelper } from "components/src/auth/session";
import { SimpleProduct } from "components/src/interfaces";
import { getBestSellingProduct, getNewArrivalProduct, searchProducts, searchProductsByTag } from "components/src/services/api";
import dynamic from "next/dynamic";

const ErrorPage = dynamic(() => import("components/src/module/ErrorPage").then(mod => mod.ErrorPage), { ssr: false });

const AllProduct = dynamic(() => import("./AllProducts"), {
  ssr: true,
  loading: () => <Loader />,
});

type SearchParams = {
  search?: string;
  tag?: string;
  bestSellingProduct?: string;
  newArrivalProduct?: string;
};

async function fetchProducts(params: SearchParams, token: string) {
  try {
    if (params.search) {
      return await searchProducts(params.search, token);
    }

    if (params.tag) {
      return await searchProductsByTag([params.tag], token);
    }

    if (params.bestSellingProduct) {
      return await getBestSellingProduct(params.bestSellingProduct);
    }

    if (params.newArrivalProduct) {
      return await getNewArrivalProduct(params.newArrivalProduct);
    }

    return { data: [], error: null };
  } catch (err: unknown) {
    const errorMessage =
      typeof err === "object" && err !== null && "message" in err ? (err as { message?: string }).message || "Unknown error" : "Unknown error";
    return { data: [], error: errorMessage };
  }
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { accessTokenPayload, hasToken, error, accessToken } = await getSSRSessionHelper();

  if (hasToken && (!accessTokenPayload || error)) {
    return <TryRefreshComponent key={Date.now()} />;
  }

  const { data: searchedProducts = [], error: allProductsError } = await fetchProducts(searchParams, accessToken || "");
  return (
    <div className="flex h-full w-full justify-center overflow-x-hidden">
      <AllProduct fetchedProducts={searchedProducts as SimpleProduct[]} errorMessage={allProductsError} />
    </div>
  );
}
