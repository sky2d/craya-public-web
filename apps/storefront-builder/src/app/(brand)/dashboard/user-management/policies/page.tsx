import { WhiteBackgroundWrapper } from "@/components/dashboard/WhiteBackgroundWrapper";
import { PolicyList } from "./PolicyList";
import { RadioGroup } from "./RadioGroup";

const PolicyPage = () => {
  const policyBulletPoints = [
    "Spreading Self Love & Positivity With Each Product We Create",
    "Obsessed With Colors, Sunshine, Sass & Badass | Jewelry & More",
    "Obsessed With Colors, Sunshine, Sass & Badass | Jewelry & More",
    "Obsessed With Colors, Sunshine, Sass & Badass | Jewelry & More",
  ];

  return (
    <div className="flex w-full flex-col gap-1 px-2">
      <WhiteBackgroundWrapper className="mb-2 w-full text-start text-xl font-medium">Policies :</WhiteBackgroundWrapper>

      <WhiteBackgroundWrapper>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <PolicyList title="🚫 Cancellation and Refund Policy :" points={policyBulletPoints} />
            <PolicyList title="🚚 Shipping Policy :" points={policyBulletPoints} />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="flex items-center gap-1 text-[clamp(10px,0.7vw,15px)] font-medium">💢 Exchange Policy :</h2>
            <RadioGroup />
          </div>
        </div>
      </WhiteBackgroundWrapper>
    </div>
  );
};

export default PolicyPage;
