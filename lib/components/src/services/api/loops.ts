import { Loop } from "../../interfaces";
import { deleteRequest, getRequest, postRequest, putRequest } from "./apiRequests";

export const getLoops = (storeId: string) => {
  return getRequest<Loop[]>({
    endpoint: `/loops?storeId=${storeId}`,
  });
};

export const createLoop = (loop: any) => {
  return postRequest<Loop>({
    endpoint: `/loops`,
    body: loop,
  });
};

export const updateLoop = (loop: any) => {
  return putRequest<Loop>({
    endpoint: `/loops/${loop.id}`,
    body: loop,
  });
};

export const deleteLoop = (loopId: string) => {
  return deleteRequest<Loop>({
    endpoint: `/loops/${loopId}`,
  });
};
