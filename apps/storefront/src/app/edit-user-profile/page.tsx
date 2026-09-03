import { SessionAuthForNextJS } from "@/components/auth/SessionAuthForNextJS";
import { Loader } from "@/utils/loader";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Customize Your Profile – Craya Shopping",
  description: "Update your account, preferences, and shopping behavior. Make Craya more you.",
  keywords: ["Edit Craya account", "update Craya profile", "manage shopping preferences Craya"],
  openGraph: {
    title: "Edit Your Craya Profile",
    description: "Personalize your account, update preferences, and manage your shopping journey at Craya.",
    url: "https://craya.shop/edit-user-profile",
    siteName: "Craya",
    type: "website",
    images: [
      {
        url: "/icons/CrayaLogo.svg",
        width: 1200,
        height: 630,
        alt: "Craya Profile OG Image",
      },
    ],
  },
};

const EditUserProfile = dynamic(() => import("./EditUserProfile"), {
  ssr: false,
  loading: () => <Loader />,
});

const Page = () => (
  <div className="flex h-full w-full justify-center">
    <SessionAuthForNextJS>
      <EditUserProfile />
    </SessionAuthForNextJS>
  </div>
);

export default Page;
