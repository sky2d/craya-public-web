import Send from "components/src/icons/iconFiles/Send.svg";
import FancyButton from "components/src/minor/FancyButton";
import Image from "next/image";
const StartSelling = () => (
  <div className="w-full">
    {/* content */}

    <p className="text-[40px] font-black text-white-light4 sm:text-[4.5vw]">
      Start selling now
      <br />
      with Craya
    </p>
    <div className="my-4 flex w-full items-center justify-center">
      <FancyButton
        onClick={() => window.open("https://form.jotform.com/251038220051036", "_blank")}
        text="Become a Seller"
        icon={<Image src={Send} alt="Send" width={20} height={20} />}
        className="mt-4 cursor-pointer hover:translate-y-1 hover:shadow-md"
      />
    </div>
  </div>
);

export default StartSelling;
