"use client";
import { WhiteBackgroundWrapper } from "@/components/dashboard/WhiteBackgroundWrapper";
import { UploadedFile } from "components/src/interfaces";
import { ImageUpload } from "components/src/minor";

type Props = {
  logo?: UploadedFile;
  onLogoChange: (image: UploadedFile) => void;
};

export default function StoreLogoSection({ logo, onLogoChange }: Props) {
  return (
    <>
      <WhiteBackgroundWrapper className="mb-2 w-full rounded-[10px] border border-[#CDCDCD] p-3 text-start text-xl font-medium">
        Logo:
      </WhiteBackgroundWrapper>
      <WhiteBackgroundWrapper className="flex w-full flex-col items-center rounded-[10px] border border-[#CDCDCD] p-4 text-start text-xl font-medium">
        <p className="w-full text-start text-base font-medium">Logo Image :</p>
        <div className="flex w-full justify-center p-5">
          <ImageUpload image={logo} changeImage={onLogoChange} className="aspect-square h-full w-3/4" />
        </div>
      </WhiteBackgroundWrapper>
    </>
  );
}
