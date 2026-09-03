import { fetchReviews } from "components/src/services/api";

export const checkIfUserReviewedProduct = async (productIds: string[], userId: string): Promise<Record<string, boolean>> => {
  const result: Record<string, boolean> = {};

  for (const productId of productIds) {
    const { data: reviewsData } = await fetchReviews(productId);
    const productReviews = reviewsData?.reviews ?? [];

    const alreadyReviewed = productReviews.some(review => review.userId === userId);
    result[productId] = alreadyReviewed;
  }

  return result;
};
