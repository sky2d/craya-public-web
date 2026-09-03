"use client";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import UploadImage from "../icons/iconFiles/FileUpload.svg";
import { ImageSizeType, StorefrontComponentType, UploadedFile, UploadedFileStatus } from "../interfaces";
import { uploadFile } from "../services/api";
import { componentAspectRatio } from "../utils/componentAspectRatio";
import { showPopup } from "./Popups";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type SingleImageUploadProps = {
  changeImage: (image: UploadedFile) => void;
  image?: UploadedFile;
  className?: string;
  componentType?: StorefrontComponentType;
  imageSize?: ImageSizeType | null;
  Android?: boolean;
  noOfImages?: number;
  imageIndex?: number;
  productAspectRatio?: number;
  borderRadius?: string;
  fileType?: "image" | "video";
};

export const ImageUpload: React.FC<SingleImageUploadProps> = ({
  changeImage,
  image,
  componentType,
  className = "",
  imageSize,
  Android,
  noOfImages,
  imageIndex,
  productAspectRatio,
  borderRadius,
  fileType,
}) => {
  // 👇 Correct typing: Antd UploadFile wrapping UploadedFile
  const [file, setFile] = useState<UploadFile<UploadedFile> | null>(null);

  const aspectRatio = componentType ? componentAspectRatio(componentType, imageSize!, Android, imageIndex, noOfImages) : undefined;

  useEffect(() => {
    if (image) {
      setFile({
        uid: "1",
        name: image.fileName || "Uploaded Image",
        status: "done",
        url: image.fileUrl,
        response: image,
      });
    } else {
      setFile(null);
    }
  }, [image]);

  const beforeUpload = async (fileObj: FileType) => {
    setFile({
      uid: fileObj.uid,
      name: fileObj.name,
      status: "uploading",
      percent: 0,
    });

    const result = await uploadFile(fileObj);

    if (result.error) {
      message.error(result.error);
      setFile(prev => (prev ? { ...prev, status: "error" } : null));
      return false;
    }

    showPopup("success", `${fileType === "video" ? "Video" : "Image"} uploaded successfully`);

    const uploadedFile: UploadedFile = {
      id: result.data?.id || "",
      fileName: fileObj.name,
      fileUrl: result.data?.fileUrl || "",
      contentType: result.data?.contentType || "",
      status: UploadedFileStatus.UPLOADED,
      userId: result.data?.userId || "",
    };

    changeImage(uploadedFile);

    setFile({
      uid: fileObj.uid,
      name: fileObj.name,
      status: "done",
      url: uploadedFile.fileUrl,
      response: uploadedFile,
    });

    return false; // prevent default upload
  };

  return (
    <div className={`${className} relative rounded-[16px] border-4 border-[#F3F3F3]`}>
      {file?.url ? (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-brand-color1">
          {file.status === "uploading" ? (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-color3 border-t-transparent" />
          ) : (
            <div className="group relative h-full w-full">
              {fileType === "video" ? (
                <video src={file.url} controls className="h-full object-cover" />
              ) : (
                <Image src={file.url} fill alt={file.name} className={`${borderRadius} h-full w-full object-contain`} />
              )}
              {/* Reupload/Edit overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black-dark1/40 opacity-0 transition-opacity group-hover:opacity-100">
                {fileType === "video" ? (
                  <Upload beforeUpload={beforeUpload} showUploadList={false} accept="video/*">
                    <button className="rounded py-1 text-sm text-white-light4 transition-transform hover:scale-105">
                      <FiUpload className="text-brand-color1" size={24} />
                    </button>
                  </Upload>
                ) : (
                  <ImgCrop
                    modalOk="Upload"
                    modalCancel="Cancel"
                    aspect={aspectRatio?.aspectRatio || productAspectRatio}
                    zoomSlider={!aspectRatio}
                    aspectSlider={!aspectRatio}
                    modalProps={{
                      okButtonProps: {
                        className: "bg-brand-color1 hover:!bg-brand-color1 hover:opacity-90",
                      },
                      cancelButtonProps: {
                        className:
                          "border !border-black-dark2 hover:!border-brand-color1 !text-black-dark1 hover:!text-brand-color1 bg-!white-light3",
                      },
                    }}
                  >
                    <Upload beforeUpload={beforeUpload} showUploadList={false} accept="image/*">
                      <button className="rounded py-1 text-sm text-white-light4 transition-transform hover:scale-105">
                        <FiUpload className="text-brand-color1" size={24} />
                      </button>
                    </Upload>
                  </ImgCrop>
                )}
              </div>
            </div>
          )}
        </div>
      ) : fileType === "video" ? (
        <Upload
          beforeUpload={beforeUpload}
          showUploadList={false}
          accept="video/*"
          className="[&_.ant-upload]:block [&_.ant-upload]:h-full [&_.ant-upload]:w-full"
        >
          <div
            className={`hover:border-gray-400 hover:text-gray-700 h-full w-full rounded-[14px] ${
              !componentType ? "border-[0.5px] border-dashed" : ""
            } border-brand-color3`}
          >
            {componentType && aspectRatio ? (
              <div className="relative h-full w-full hover:cursor-pointer">
                <Image src={aspectRatio.configImage!} draggable={false} alt="Config Image" fill />
              </div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="relative flex aspect-square w-9 items-center justify-center rounded-full bg-brand-color3 p-2">
                  <Image src={UploadImage} alt="Image Upload" width={20} height={20} />
                </div>
                <span className="mt-2 text-xs font-normal">Upload a Video</span>
                <p className="mt-2 text-[8px] font-normal text-[#606060]">
                  <span className="text-[#3079FF] underline">Choose a file </span>, max size 5mb
                </p>
              </div>
            )}
          </div>
        </Upload>
      ) : (
        <ImgCrop
          modalOk="Upload"
          modalCancel="Cancel"
          aspect={aspectRatio?.aspectRatio || productAspectRatio}
          zoomSlider={!aspectRatio}
          aspectSlider={!aspectRatio}
          modalProps={{
            okButtonProps: {
              className: "bg-brand-color1 hover:!bg-brand-color1 hover:opacity-90",
            },
            cancelButtonProps: {
              className: "border !border-black-dark2 hover:!border-brand-color1 !text-black-dark1 hover:!text-brand-color1 bg-!white-light3",
            },
          }}
        >
          <Upload
            beforeUpload={beforeUpload}
            showUploadList={false}
            accept="image/*"
            className="[&_.ant-upload]:block [&_.ant-upload]:h-full [&_.ant-upload]:w-full"
          >
            <div
              className={`hover:border-gray-400 hover:text-gray-700 h-full w-full rounded-[14px] ${
                !componentType ? "border-[0.5px] border-dashed" : ""
              } border-brand-color3`}
            >
              {componentType && aspectRatio ? (
                <div className="relative h-full w-full hover:cursor-pointer">
                  <Image src={aspectRatio.configImage!} draggable={false} alt="Config Image" fill />
                </div>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <div className="relative flex aspect-square w-9 items-center justify-center rounded-full bg-brand-color3 p-2">
                    <Image src={UploadImage} alt="Image Upload" width={20} height={20} />
                  </div>
                  <span className="mt-2 text-xs font-normal">Upload an Image</span>
                  <p className="mt-2 text-[8px] font-normal text-[#606060]">
                    <span className="text-[#3079FF] underline">Choose a file </span>, max size 5mb
                  </p>
                </div>
              )}
            </div>
          </Upload>
        </ImgCrop>
      )}
    </div>
  );
};
