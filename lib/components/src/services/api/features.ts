import { Feature } from "../../interfaces/feature";
import { getRequest } from "./apiRequests";

export const getFeatures = () => {
  return getRequest<Feature[]>({
    endpoint: "/features",
  });
};
