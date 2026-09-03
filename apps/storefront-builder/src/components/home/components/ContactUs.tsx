import ContactBanner from "components/src/icons/iconFiles/ContactBanner.png";
import Image from "next/image";
import { MdOutlineArrowForwardIos } from "react-icons/md";

export const ContactUs = () => {
  const openWhatsApp = () => {
    const phoneNumber = "918294545018"; // your WhatsApp number with country code (no + sign)
    const message = "Hii Craya";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };
  return (
    <div className="flex items-center justify-center p-4">
      <div
        onClick={openWhatsApp}
        className="w-3/4 cursor-pointer rounded-2xl shadow-xl outline-none transition-transform focus:ring-4 active:scale-90"
      >
        <Image src={ContactBanner} alt="contact us" objectFit="cover" />
        <div className="flex items-center justify-between gap-4 p-4">
          <p className="text-brand-color1 heading-4">
            Talk to the founder. Get in touch with &apos;the man&apos;regarding any queries, requests and issues.
          </p>
          <button className="text-brand-color1 heading-4">
            <MdOutlineArrowForwardIos />
          </button>
        </div>
      </div>
    </div>
  );
};
