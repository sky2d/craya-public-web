import ReviewModel from "@/components/model/ReviewModel";
import { WhiteBackgroundWrapper } from "@/components/wrapper/WhiteBackgroundWrapper";
import type { ProgressProps } from "antd";
import { Progress } from "antd";
import { Store } from "antd/es/form/interface";
import ReviewImage from "components/src/icons/iconFiles/ReviewImage.svg";
import { Review } from "components/src/interfaces";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import CustomerReviews from "../../../component/CustomerReviews";

interface ProductReviewsProps {
  reviews?: Review[];
  storeDetails?: Store;
}

const twoColors: ProgressProps["strokeColor"] = {
  "0%": "#FACF30",
  "100%": "#B2900E",
};

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews, storeDetails }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  const calculateAverageRating = (reviews: Review[]): number => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };
  const getRatingDistribution = (reviews: Review[]) => {
    const ratingCounts = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        ratingCounts[review.rating - 1]++;
      }
    });

    const totalReviews = reviews.length;
    return ratingCounts.map(count => (totalReviews ? (count / totalReviews) * 100 : 0));
  };

  const ratingPercentages = getRatingDistribution(reviews || []);

  const primaryColor = storeDetails?.primaryColor;
  const review = reviews ? reviews[0] : null;

  return (
    <>
      {reviews && reviews.length > 0 ? (
        <div className="w-full flex-col">
          <WhiteBackgroundWrapper className="flex items-start justify-center rounded-2xl shadow-xl">
            <div className="w-1/2">
              <p className="flex items-center justify-center text-7xl font-extrabold sm:text-[5vw]" style={{ color: primaryColor }}>
                {calculateAverageRating(reviews).toFixed(1)}
                <span className="mx-1 text-5xl sm:text-[3vw]">
                  <FaStar className="text-[#FACF30]" />
                </span>
              </p>
              <p className="rounded-3xl p-2 text-center text-sm font-bold text-white-light4" style={{ backgroundColor: primaryColor }}>
                {reviews.length} reviews
              </p>
            </div>
            <div className="flex w-1/2 flex-col p-2">
              {ratingPercentages
                .map((percent, index) =>
                  percent > 0 ? (
                    <div key={index} className="flex h-full w-full items-center justify-center text-base font-medium text-[#6A6A6A]">
                      {index + 1} <FaStar className="mx-1 text-[#FACF30]" />
                      <Progress percent={percent} status="active" showInfo={false} strokeColor={twoColors} />
                    </div>
                  ) : null,
                )
                .reverse()}
            </div>
          </WhiteBackgroundWrapper>
          {review && (
            <div className="rounded-lg p-2 shadow-xl">
              <CustomerReviews review={review} />
              <p
                className="flex w-full items-center justify-end text-right text-blue-400 hover:cursor-pointer"
                onClick={() => setIsReviewModalOpen(true)}
              >
                View All <IoIosArrowForward className="mx-1" />
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white flex w-full items-center justify-center rounded-2xl p-6 text-center shadow-lg">
          <div className="relative flex aspect-square h-full max-h-14 w-full max-w-14 cursor-pointer items-center justify-center rounded-full p-2 hover:shadow-lg">
            <Image src={ReviewImage} draggable={false} alt="Share" fill className="h-full w-full object-contain" />
          </div>
          <div className="mx-auto">
            <p className="text-lg font-semibold" style={{ color: primaryColor }}>
              No reviews available for this product.
            </p>
          </div>
        </div>
      )}
      <ReviewModel isModalOpen={isReviewModalOpen} handleCancel={() => setIsReviewModalOpen(false)} reviews={reviews} />
    </>
  );
};

export default ProductReviews;
