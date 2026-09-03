export enum UploadedFileStatus {
  UPLOADED = "UPLOADED",
  PENDING = "PENDING",
  FAILED = "FAILED",
}

export interface UploadedFile {
  id?: string;
  key?: string;
  contentType: string;
  status: UploadedFileStatus;
  userId: string;
  fileUrl: string;
  fileName: string;
  originalName?: string;
}

export interface UploadSignature {
  api_key: string;
  timestamp: string;
  signature: string;
  folder: string;
  public_id: string;
  uploadUrl: string;
}

export interface UploadUrlResponse {
  id: string;
  uploadSignature: UploadSignature;
}

export interface UpdateStatusOfFile<T> {
  status: string;
  message: string;
  data: T;
}
