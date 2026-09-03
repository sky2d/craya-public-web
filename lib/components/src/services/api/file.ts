import { ApiReturn, UploadedFile, UploadedFileStatus, UploadUrlResponse } from "../../interfaces";
import { getRequest, putRequest } from "./apiRequests";

export const updateFileStatus = async (id: string, status: UploadedFileStatus, originalName?: string) =>
  putRequest<UploadedFile>({
    endpoint: `/files/${id}`,
    body: { status, originalName: originalName },
  });

export const uploadFile = async (file: File, fileName?: string): Promise<ApiReturn<UploadedFile>> => {
  const contentType = file.type || "application/octet-stream";
  const signedUrlResponse = await getRequest<UploadUrlResponse>({
    endpoint: "/files/signed-upload-url",
    params: { contentType },
  });

  if (signedUrlResponse.error || !signedUrlResponse.data) {
    return { error: signedUrlResponse.error || "Unable to upload file" };
  }

  const { uploadSignature } = signedUrlResponse.data;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", uploadSignature.api_key);
  formData.append("timestamp", uploadSignature.timestamp);
  formData.append("signature", uploadSignature.signature);
  if (uploadSignature.folder) formData.append("folder", uploadSignature.folder);
  if (uploadSignature.public_id) formData.append("public_id", uploadSignature.public_id);

  let isUploaded = false;
  try {
    const response = await fetch(uploadSignature.uploadUrl, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      isUploaded = true;
    }
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
  }

  if (!isUploaded) {
    updateFileStatus(signedUrlResponse.data.id, UploadedFileStatus.FAILED);
    return { error: "Unable to upload file" };
  }

  return updateFileStatus(signedUrlResponse.data.id, UploadedFileStatus.UPLOADED, fileName);
};
