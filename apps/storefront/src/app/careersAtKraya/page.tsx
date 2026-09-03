import { PageHeader } from "components/src/major/PageHeader";
import NotFound from "../not-found";

const Page = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <PageHeader title="Carrier" />
      <NotFound />
    </div>
  );
};
export default Page;
