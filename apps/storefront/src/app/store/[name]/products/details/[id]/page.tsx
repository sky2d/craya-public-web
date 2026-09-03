import { Loader } from "@/utils/loader";
import { getSSRSessionHelper } from "components/src/auth/session";
import { Product } from "components/src/interfaces";
import { fetchProduct, fetchReviews, searchProductsByTag } from "components/src/services/api";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import SimilarProduct from "./component/SimilarProduct";
import ProductDetailScreen from "./ProductDetailScreen";

const ErrorPage = dynamic(() => import("components/src/module/ErrorPage").then(mod => mod.ErrorPage), { ssr: false });

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const { data: product } = await fetchProduct(params.id);

    const name = product?.name || "Product";
    const description = product?.description || "Discover this amazing product in our store.";
    const image = product?.image?.fileUrl || "/default-og-image.jpg";

    return {
      title: name,
      description: description,
      openGraph: {
        title: name,
        description: description,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: name,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found",
      description: "The requested product was not found.",
      openGraph: {
        title: "Product Not Found",
        description: "The requested product was not found.",
        images: [
          {
            url: "/default-og-image.jpg",
            width: 1200,
            height: 630,
            alt: "Product Not Found",
          },
        ],
      },
    };
  }
}

async function SimilarProductsWrapper({ productTags, productId, storeId }: { productTags: string[]; productId: string; storeId: string }) {
  if (!productTags || productTags.length === 0) return null;
  const { accessTokenPayload, hasToken, error, accessToken } = await getSSRSessionHelper();

  if (!accessToken || !hasToken || error || !accessTokenPayload) {
    return null;
  }

  const { data, error: similarProductError } = await searchProductsByTag(productTags, accessToken);
  if (!data || similarProductError) return null;

  const similarProducts: Product[] = data.filter(p => p.storeId === storeId && p.id !== productId);

  return <SimilarProduct products={similarProducts} />;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const { data: productData, error: productError } = await fetchProduct(params.id);
  const { data: reviewsData } = await fetchReviews(params.id);

  if (!productData || !productData.id || productError) {
    return <ErrorPage description="Product not found." />;
  }

  const productTags = productData.productDetails.map(p => p.value);

  return (
    <>
      <ProductDetailScreen product={productData} reviews={reviewsData?.reviews || []} />
      <Suspense fallback={<Loader />}>
        <SimilarProductsWrapper productTags={productTags} productId={productData.id} storeId={productData.storeId} />
      </Suspense>
    </>
  );
};

export default Page;
