import ContactBanner from "components/src/icons/iconFiles/ContactBanner.png";
import Image from "next/image";
import { MdOutlineArrowForwardIos } from "react-icons/md";

interface ContactFounderProps {
  openWhatsAppChat: () => void;
}

export const ContactFounder: React.FC<ContactFounderProps> = ({ openWhatsAppChat }) => {
  return (
    <div
      className="flex cursor-pointer flex-col items-center justify-center p-4 transition-shadow duration-200 ease-in-out hover:shadow-md"
      onClick={openWhatsAppChat}
    >
      <Image
        src={ContactBanner}
        draggable={false}
        alt="Contact Us via WhatsApp"
        style={{ objectFit: "cover", width: "100%", height: "auto" }}
        priority
      />
      <div className="mt-4 flex w-full items-center justify-between gap-4 p-4">
        <p className="text-xs font-black text-brand-color1 sm:text-[2vw]">
          {" "}
          Mujhse baat karo, mai sab sort kardunga. I am just a chill guy like that.
        </p>
        <button className="text-3xl text-brand-color1 focus:outline-none" aria-label="Chat on WhatsApp">
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </div>
  );
};
