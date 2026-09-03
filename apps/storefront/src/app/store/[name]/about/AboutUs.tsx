"use client";
import { useStorefrontContext } from "@/provider/StorefrontProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import { StorefrontComponentType } from "components/src/interfaces";
import ImageSkeletonLoader from "components/src/major/ImageSkeletonLoader";
import { PageHeader } from "components/src/major/PageHeader";
import Image from "next/image";
import React, { useState } from "react";

const AboutUs: React.FC = () => {
  const { storeDetails } = useStoreContext();
  const { storefront } = useStorefrontContext();
  const [loader, setLoader] = useState(true);

  const brandInfo = storefront?.storefrontComponents.find(component => component.type === StorefrontComponentType.BRAND_INFO);
  const img = brandInfo?.data.images[0];
  const text = brandInfo?.data.texts[0];

  return (
    <div className="h-full min-h-screen w-full">
      <PageHeader title="About Us" backgroundColor={storeDetails?.primaryColor} />

      <div className="flex w-full flex-col items-center justify-center px-2 py-8">
        <div className="flex w-full justify-center sm:w-3/4">
          <div className="relative w-full overflow-hidden rounded-md sm:w-3/4" style={{ aspectRatio: "1/0.45" }}>
            {!img?.fileUrl ? (
              <div className="bg-gray-200 text-gray-500 flex h-full w-full items-center justify-center">Image Not Found</div>
            ) : (
              <>
                {loader && <ImageSkeletonLoader aspectRatio={"1/0.4"} />}
                <Image
                  draggable={false}
                  src={img.fileUrl}
                  alt="Store Image"
                  width={1200}
                  height={500}
                  className="h-full w-full rounded-md object-cover"
                  style={{ aspectRatio: "1/0.4" }}
                  onLoad={() => setLoader(false)}
                />
              </>
            )}
          </div>
        </div>

        <div className="my-4 w-full sm:w-3/4">
          <h2 className="mb-4 text-center text-xl font-bold lg:text-4xl">{storeDetails?.name}</h2>
          <p className="text-gray-700 mb-4 lg:text-xl">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
