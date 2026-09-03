"use client";
import { useStoreContext } from "@/provider/StoreProvider";
import Contact from "components/src/major/Contact";
import { PageHeader } from "components/src/major/PageHeader";

const Page = () => {
  const { storeDetails } = useStoreContext();

  return (
    <div className="flex h-full w-full flex-col justify-start">
      <PageHeader title="Contact Us" />
      <Contact storeDetails={storeDetails} />
    </div>
  );
};
export default Page;
