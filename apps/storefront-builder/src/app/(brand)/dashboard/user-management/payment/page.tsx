import { WhiteBackgroundWrapper } from "@/components/dashboard/WhiteBackgroundWrapper";
import PayoutClient from "./PayoutClient";

export default async function PayoutsPage() {
  return (
    <main className="flex h-full w-full flex-col gap-2 px-2">
      <WhiteBackgroundWrapper className="w-full">
        <h2 className="text-lg font-semibold">Bank Account :</h2>
      </WhiteBackgroundWrapper>

      <PayoutClient />
    </main>
  );
}
