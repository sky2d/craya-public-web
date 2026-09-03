import { Address } from "./address";
import { Coupon } from "./Coupon";
import { UploadedFile } from "./files";
import { Product } from "./product";
import { Policies, StorefrontComponent } from "./storefront";
import { User } from "./user";

export interface SocialContacts {
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
}

export interface sizeProfileImagedata {
  imageId: string[];
  image?: UploadedFile[];
}

export interface Store {
  id?: string;
  name: string;
  address: string;
  primaryColor: string;
  description: string;
  logoId?: string;
  logo?: UploadedFile;
  isOnboarding: boolean;
  socials?: SocialContacts;
  url?: string;
  user?: User;
  storeTags: string[];
  sizeChartImageIds?: string[];
  sizeChartImages?: UploadedFile[];
  addresses?: Address[];
}

export interface StoreSocialError {
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
}

export interface UpdateStore extends Partial<Store> {}

export interface StoreLink {
  url: string;
}

export interface StoreError {
  name?: string;
  address?: string;
  primaryColor?: string;
  description?: string;
  logo?: string;
  storeTags?: string;
}

export interface StoreData {
  id: string;
  name: string;
  user: User;
  logoId: string;
  address: string;
  primaryColor: string;
  description: string;
  isOnboarding: boolean;
  url?: string;
  logo: UploadedFile;
  products: Product[];
  socials: SocialContacts;
  storefrontComponents: StorefrontComponent[];
  policies: Policies[];
  coupons: Coupon[];
  storeTags: string[];
  sizeChartImageIds?: string[];
  sizeChartImages?: UploadedFile[];
}

export interface StoreNameExistStatus {
  exists: boolean;
}
export interface UserExistStatus {
  exists: boolean;
}

export interface CompletionResult {
  percentage: number;
  details: {
    completed: string[];
    missing: string[];
    user: {
      completed: string[];
      missing: string[];
      percentage: number;
    };
    store: {
      completed: string[];
      missing: string[];
      percentage: number;
    };
  };
}
