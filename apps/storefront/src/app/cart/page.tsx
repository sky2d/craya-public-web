import { SessionAuthForNextJS } from "@/components/auth/SessionAuthForNextJS";
import { CouponProvider } from "@/provider/CouponProvider";
import { Loader } from "@/utils/loader";

import dynamic from "next/dynamic";

const CheckoutScreen = dynamic(() => import("./CheckoutScreen"), {
  ssr: true,
  loading: () => <Loader />,
});

const Page = () => (
  <div className="flex h-full w-full justify-center">
    <SessionAuthForNextJS>
      <CouponProvider>
        <CheckoutScreen />
      </CouponProvider>
    </SessionAuthForNextJS>
  </div>
);

export default Page;
