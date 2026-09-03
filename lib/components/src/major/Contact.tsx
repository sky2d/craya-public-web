"use client";
import { ContactFormData, ContactFormError, Store } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { InputFieldType } from "components/src/interfaces/InputField";
import { Button2, InputField2, showPopup, TextAreaField } from "components/src/minor";
import { contactUs } from "components/src/services/api";
import Image from "next/image";
import { useState } from "react";
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaWhatsapp } from "react-icons/fa";
import BoxCrayaLogo from "../icons/iconFiles/BoxCrayaLogo.png";
import { LoadingWithGif } from "../minor/Loading";
import { openWhatsAppChat } from "../utils/openWhatsAppChat";
import { validateContactUsField } from "../validator/contactUs.validator";
import { ContactFounder } from "./ContactFounder";

const MAX_MESSAGE_LENGTH = 200;

interface ContactPageProps {
  global?: boolean;
  storeDetails?: Store;
  showContactFounder?: boolean;
}
const ContactPage: React.FC<ContactPageProps> = ({ global, storeDetails, showContactFounder }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formError, setFormError] = useState<ContactFormError | null>();
  const handleChange = (field: keyof typeof formData, value: string) => {
    if (field === "message" && value.length > 200) return;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validateError = validateContactUsField(formData);
    if (validateError) {
      setFormError(validateError);
      return;
    }
    setFormError(null);
    if (global) {
      setLoading(true);
      const { error } = await contactUs(formData);
      setLoading(false);
      if (error) {
        showPopup("error", "Unable to send a contact mail");
        return;
      }
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  };

  const getSocialLink = (platform: "whatsapp" | "instagram" | "facebook" | "linkedIn") => {
    if (global) {
      switch (platform) {
        case "whatsapp":
          return "https://wa.me/918294545018";
        case "instagram":
          return "https://www.instagram.com/yourglobalprofile";
        case "linkedIn":
          return "https://www.linkedin.com/company/craya/";
        default:
          return "#";
      }
    } else if (storeDetails?.socials) {
      switch (platform) {
        case "whatsapp":
          return storeDetails.socials.whatsapp ? `https://wa.me/${storeDetails.socials.whatsapp}` : "#";
        case "instagram":
          return storeDetails.socials.instagram || "#";
        case "facebook":
          return storeDetails.socials.facebook || "#";
        case "linkedIn":
          return "#"; // if store doesn't support LinkedIn, return #
        default:
          return "#";
      }
    }
    return "#";
  };

  const handleSocialClick = (platform: "whatsapp" | "instagram" | "linkedIn") => {
    const link = getSocialLink(platform);
    if (link !== "#") window.open(link, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingWithGif isCentre={true} />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-start sm:p-4">
      <div className="my-4 flex h-auto w-full flex-col items-center justify-center gap-2 p-2 sm:w-3/4 md:flex-row md:items-stretch">
        <div className="w-full flex-1 rounded-lg border-[1px] border-[#BDBDBD] p-2 sm:p-6">
          <h2 className="mb-4 text-lg font-semibold">Contact Us</h2>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <InputField2
                type={InputFieldType.TEXT}
                placeholder="First Name*"
                value={formData.firstName}
                errorMessage={formError?.firstName}
                onChange={e => handleChange("firstName", e.target.value)}
              />
              <InputField2
                type={InputFieldType.TEXT}
                placeholder="Last Name*"
                value={formData.lastName}
                errorMessage={formError?.lastName}
                onChange={e => handleChange("lastName", e.target.value)}
              />
            </div>
            <InputField2
              type={InputFieldType.EMAIL}
              placeholder="Email*"
              value={formData.email}
              errorMessage={formError?.email}
              onChange={e => handleChange("email", e.target.value)}
            />
            <InputField2
              type={InputFieldType.TEXT}
              placeholder="Phone Number*"
              value={formData.phone}
              errorMessage={formError?.phone}
              onChange={e => handleChange("phone", e.target.value)}
            />
            <div className="relative">
              <TextAreaField
                placeholder="Your message..."
                errorMessage={formError?.message}
                value={formData.message}
                onChange={e => handleChange("message", e.target.value)}
              />
              <p className="mt-1 text-right text-sm text-textGray">
                {formData.message.length}/{MAX_MESSAGE_LENGTH} characters
              </p>
            </div>

            <Button2 type={ButtonType.PRIMARY} label="Send Message" handleClick={handleSubmit} />
          </div>
        </div>
        <div
          className="mt-6 flex w-full flex-1 flex-col items-start justify-center rounded-lg p-2 text-white-light4 shadow-lg sm:p-6 md:mt-0"
          style={{ backgroundColor: global ? "#7C54E9" : storeDetails?.primaryColor }}
        >
          <div className="flex flex-col space-y-4">
            <h2 className="mb-2 text-4xl font-semibold">Contact Information</h2>
            <p className="mb-4">Say something to start a live chat!</p>
            <div className="mb-2 flex items-center">
              <FaPhone className="mr-2" />
              <span>{global ? "+91 8294545018" : storeDetails?.user?.phone || "Not available"}</span>
            </div>
            <div className="mb-4 flex items-center">
              <FaEnvelope className="mr-2" />
              <span>{global ? "crayacares@craya.shop" : storeDetails?.user?.email || "Not available"}</span>
            </div>
          </div>
          <div className="flex h-full w-full items-end justify-between">
            <div className="flex space-x-2">
              {(global
                ? ["whatsapp", "instagram", "linkedIn"]
                : Object.entries(storeDetails?.socials || {})
                    .filter(([, value]) => value?.trim())
                    .map(([key]) => key)
              ).map(platform => {
                const icons = {
                  whatsapp: <FaWhatsapp />,
                  instagram: <FaInstagram />,
                  linkedIn: <FaLinkedin />,
                  facebook: <FaFacebook />,
                };

                const handleClick = () => {
                  if (global) {
                    handleSocialClick(platform as "whatsapp" | "instagram" | "linkedIn");
                  } else {
                    const link = storeDetails?.socials?.[platform as keyof typeof storeDetails.socials];
                    if (!link) return;

                    let webLink = link;
                    let appLink = link;

                    if (platform === "instagram") {
                      const username = link.split("/").filter(Boolean).pop() || link.replace("@", "").trim();
                      webLink = `https://instagram.com/${username}`;
                      appLink = `instagram://user?username=${username}`;
                    } else if (platform === "facebook") {
                      const username = link.split("/").filter(Boolean).pop() || link.trim();
                      webLink = `https://linkedin.com/in/${username}`;
                      appLink = `linkedin://in/${username}`;
                    } else if (platform === "whatsapp") {
                      let phone = link.replace(/\D/g, "");
                      if (!phone.startsWith("91")) phone = "91" + phone;
                      webLink = `https://wa.me/${phone}`;
                      appLink = `whatsapp://send?phone=${phone}`;
                    }

                    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
                    if (isMobile) {
                      window.location.href = appLink;
                      setTimeout(() => window.open(webLink, "_blank"), 1000);
                    } else {
                      window.open(webLink, "_blank");
                    }
                  }
                };

                return (
                  <div
                    key={platform}
                    onClick={handleClick}
                    className="flex aspect-square h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white-light4 text-brand-color1 transition-transform duration-200 hover:scale-105"
                    style={{ color: storeDetails?.primaryColor }}
                  >
                    {icons[platform as keyof typeof icons]}
                  </div>
                );
              })}
            </div>

            <div className={`flex w-full max-w-36 p-1 ${!global && "rounded-md bg-white-light4"}`}>
              {global ? (
                <Image draggable={false} src={BoxCrayaLogo} className="h-full w-full object-contain" alt="Craya Logo" />
              ) : (
                <Image
                  src={storeDetails?.logo?.fileUrl || ""}
                  width={300}
                  draggable={false}
                  height={300}
                  className="h-full w-full rounded-2xl object-contain shadow-md"
                  alt="Craya Logo"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {global && showContactFounder && (
        <div className="flex w-full items-center justify-center sm:w-3/4 sm:p-4">
          <ContactFounder openWhatsAppChat={openWhatsAppChat} />
        </div>
      )}
    </div>
  );
};

export default ContactPage;
