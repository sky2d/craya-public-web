import { UploadedFile } from "../interfaces/files";

export interface Feature {
  id: string;
  name: string;
  description: string;
  imageId: string;
  status: "BETA" | "ALPHA" | "RELEASED";
  priority: number;
  targetUsers: string[];
  launchDate: string;
  createdAt: string;
  updatedAt: string;
  isFake: boolean;
  image: UploadedFile;
}
