import { WhiteBackgroundWrapper } from "@/components/dashboard/WhiteBackgroundWrapper";
import ContactPage from "components/src/major/Contact";
import CrayaFaqSection from "components/src/major/CrayaFaqSection";

const HelpAndSupport = () => {
  return (
    <div className="w-full px-2">
      <WhiteBackgroundWrapper className="flex flex-col gap-2">
        <div className="flex w-full flex-col items-center gap-2 text-center">
          <h1 className="text-[clamp(24px,1.8vw,37px)]">Need Assistance ?</h1>
          <p className="text-[clamp(13px,0.8vw, 16px)] w-full max-w-[50%] text-center text-black-dark3">
            If you are feeling overwhelmed, remember you don’t have to face it alone. Reach out and get the help you need.
          </p>
        </div>
        <ContactPage global />
        <CrayaFaqSection />
      </WhiteBackgroundWrapper>
    </div>
  );
};

export default HelpAndSupport;
