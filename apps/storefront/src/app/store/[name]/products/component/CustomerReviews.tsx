import { Avatar, Rate } from "antd";
import { Review } from "components/src/interfaces";
import Image from "next/image";

interface CustomerReviewsProps {
  review: Review;
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ review }) => {
  return (
    <div className="flex w-full flex-col sm:p-2">
      <div className="flex items-center justify-between">
        <p className="flex items-center">
          <Avatar src={review.user.image?.fileUrl} className="border-white border-2 shadow-md" size="large" />
          <span className="ml-2 text-sm font-medium lg:text-lg">{review.user.name}</span>
        </p>
        <Rate allowHalf defaultValue={review.rating} className="w-36" />
      </div>
      <p className="my-2 p-2 text-base font-semibold">{review.comment}</p>
      <div className="flex items-center justify-start">
        {review.images?.map((image, index) => (
          <div key={index} className="m-1">
            <Image
              draggable={false}
              alt={image.fileName || "this is product"}
              width={200}
              height={200}
              src={image.fileUrl}
              className="m-2 aspect-square w-full max-w-20 rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
