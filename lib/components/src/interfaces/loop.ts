import { UploadedFile } from "./files";
import { SimpleProduct } from "./product";

export enum LoopStatus {
  ACTIVE = "ACTIVE",
  DRAFT = "DRAFT",
  ARCHIVE = "ARCHIVE",
}

export enum Presence {
  FEED = "FEED",
  CAROUSEL = "CAROUSEL",
}

export interface Loop {
  id?: string;
  status: LoopStatus;
  video: UploadedFile;
  videoId?: string;
  productsId?: string[];
  products: SimpleProduct[];
  presence: Presence;
  description?: string;
}
