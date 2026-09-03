import CustomerReviews from "@/app/store/[name]/products/component/CustomerReviews";
import { Modal } from "antd";
import { Review } from "components/src/interfaces";
import { FC } from "react";
import { WhiteBackgroundWrapper } from "../wrapper/WhiteBackgroundWrapper";

interface CouponModelProps {
  isModalOpen: boolean;
  reviews?: Review[];
  handleCancel: () => void;
}

const ReviewModel: FC<CouponModelProps> = ({ isModalOpen, handleCancel, reviews }) => {
  return (
    <Modal
      title="Reviews"
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "80%",
        xxl: "80%",
      }}
      styles={{
        body: {
          maxHeight: "500px",
          overflowY: "auto",
        },
      }}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      {reviews?.map((review, index) => (
        <WhiteBackgroundWrapper key={index} className="rounded-2xl shadow-lg">
          <CustomerReviews review={review} />
        </WhiteBackgroundWrapper>
      ))}
    </Modal>
  );
};

export default ReviewModel;
