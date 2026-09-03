"use client";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Image, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import { COLORS } from "components/src/constant/colors";
import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import deleteImage from "../icons/popupImages/storeFrontBuilder/deleteImage.png";
import { UploadedFile, UploadedFileStatus } from "../interfaces";
import { uploadFile } from "../services/api";
import { ModalBox } from "./ModalBox";
import { showPopup } from "./Popups";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type MultipleImageUploadProps = {
  changeImage: (image: UploadedFile, remove?: boolean) => void;
  images: UploadedFile[] | undefined;
};
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

export const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({ changeImage, images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<UploadFile | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileResponses, setFileResponses] = useState<Record<string, UploadedFile>>({});

  useEffect(() => {
    if (images) {
      setFileList(
        images.map((img, index) => ({
          uid: String(index),
          name: img.fileName || `Image ${index + 1}`,
          status: "done",
          url: img.fileUrl,
          response: img,
        })),
      );
    }
  }, [images]);

  const handleRemove = (file: UploadFile) => {
    if (!fileToDelete) return;
    setFileList(prevFileList => prevFileList.filter(item => item.uid !== file.uid));
    const removedFile = file.response || fileResponses[file.uid];
    if (removedFile) {
      changeImage(removedFile, true);
    }
    setIsModalOpen(false);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ file, fileList }) => {
    if (file.status === "removed") {
      setFileList(fileList);
    }
  };

  const beforeUpload = async (file: FileType) => {
    // Add to list immediately with uploading status
    setFileList(prev => {
      if (prev.some(item => item.uid === file.uid)) return prev; // avoid duplicates
      return [...prev, { uid: file.uid, name: file.name, status: "uploading", percent: 0 }];
    });

    const result = await uploadFile(file);

    if (result.error) {
      message.error(result.error);
      setFileList(prev => prev.map(item => (item.uid === file.uid ? { ...item, status: "error" } : item)));
      return false;
    }

    showPopup("success", "File uploaded successfully");

    const uploadedFile: UploadedFile = {
      id: result.data?.id || "",
      fileName: file.name,
      fileUrl: result.data?.fileUrl || "",
      contentType: result.data?.contentType || "",
      status: UploadedFileStatus.UPLOADED,
      userId: result.data?.userId || "",
    };

    changeImage(uploadedFile);

    setFileList(prev =>
      prev.map(item => (item.uid === file.uid ? { ...item, status: "done", url: uploadedFile.fileUrl, response: uploadedFile } : item)),
    );

    setFileResponses(prev => ({ ...prev, [file.uid]: uploadedFile }));

    return false; // prevent default upload
  };

  return (
    <>
      <ModalBox
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        type2
        doubleButton
        doubleButtonLabel="Delete"
        handleDoubleButtonClick={() => handleRemove(fileToDelete!)}
        image={deleteImage}
        title="Attention!!"
        description="Are you sure you want to delete the component."
      />
      <div className={`grid w-full grid-cols-6 gap-2`}>
        {fileList.map(file => (
          <div
            key={file.uid}
            className="relative flex aspect-[1/1.6] w-full items-center justify-center overflow-hidden rounded-lg border border-brand-color1 bg-brand-color1"
          >
            {file.status === "uploading" ? (
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-color3 border-t-transparent">{/* Spinner */}</div>
            ) : (
              <div className="group relative h-full w-full">
                <img src={file.url} alt="Preview" className="h-full w-full object-cover" />

                {/* Overlay with icons */}
                <div className="absolute inset-0 flex items-center justify-center bg-black-dark1/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex flex-col justify-center gap-2 text-2xl text-white-light4">
                    <button className="transition-transform hover:scale-110" onClick={() => handlePreview(file)}>
                      <FaRegEye />
                    </button>
                    <button
                      className="transition-transform hover:scale-110"
                      onClick={() => {
                        setFileToDelete(file);
                        setIsModalOpen(true);
                      }}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <ImgCrop
          modalOk="Upload"
          modalCancel="Cancel"
          aspect={0.625}
          modalProps={{
            okButtonProps: {
              className: "bg-brand-color1 hover:!bg-brand-color1 hover:opacity-90 ",
            },
            cancelButtonProps: {
              className: "border !border-black-dark2 hover:!border-brand-color1 !text-black-dark1 hover:!text-brand-color1  bg-!white-light3",
            },
          }}
        >
          <Upload
            beforeUpload={beforeUpload}
            showUploadList={false}
            onChange={handleChange}
            fileList={fileList}
            className="[&_.ant-upload]:block [&_.ant-upload]:h-full [&_.ant-upload]:w-full"
          >
            <div className="flex aspect-[1/1.6] h-full w-full cursor-pointer items-center justify-center rounded-lg border-2 border-brand-color3">
              <TiPlus color={COLORS.plusIconColor} className="text-2xl" />
            </div>
          </Upload>
        </ImgCrop>
      </div>
      {previewImage && (
        <Image
          draggable={false}
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: visible => setPreviewOpen(visible),
            afterOpenChange: visible => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};
