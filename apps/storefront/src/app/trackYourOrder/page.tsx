import { PageHeader } from "components/src/major/PageHeader";
import OrderTracking from "./OrderTracking";

const Page = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <PageHeader title="Order" />
      <OrderTracking />
    </div>
  );
};
export default Page;
