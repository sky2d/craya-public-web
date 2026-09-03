"use client";

import ProductCard from "@/components/product/OrderProductCard";
import { useUserContext } from "@/provider/UserProvider";
import { Loader } from "@/utils/loader";
import { getAdjustedPrice } from "@/utils/orders";
import { checkIfUserReviewedProduct } from "@/utils/review";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import Empty from "antd/lib/empty";
import { ProductReview, UploadedFile } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Order } from "components/src/interfaces/orders";
import { showPopup } from "components/src/minor";
import { postReview } from "components/src/services/api";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const Rate = dynamic(() => import("antd/lib/rate"), { ssr: false });
const Button2 = dynamic(() => import("components/src/minor").then(mod => mod.Button2), { ssr: false });
const TextAreaField = dynamic(() => import("components/src/minor").then(mod => mod.TextAreaField), { ssr: false });
const MultipleImageUpload = dynamic(() => import("components/src/minor/MultipleImageUpload").then(mod => mod.MultipleImageUpload), { ssr: false });
const ErrorPage = dynamic(() => import("components/src/module/ErrorPage").then(mod => mod.ErrorPage), { ssr: false });

interface RateProductScreenProps {
  order: Order | undefined;
  index: number;
}

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined style={{ fontSize: "50px" }} />,
  2: <FrownOutlined style={{ fontSize: "50px" }} />,
  3: <MehOutlined style={{ fontSize: "50px" }} />,
  4: <SmileOutlined style={{ fontSize: "50px" }} />,
  5: <SmileOutlined style={{ fontSize: "50px" }} />,
};

const RateProductScreen: React.FC<RateProductScreenProps> = ({ order, index }) => {
  const { user } = useUserContext();
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedFile[]>([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [review, setReview] = useState<ProductReview | undefined>(undefined);
  const router = useRouter();

  const cartItem = useMemo(() => order?.cart?.cartItems?.[index] ?? null, [order, index]);
  const matchingItems = useMemo(() => {
    return order?.cart?.cartItems?.filter(item => item.storeId === order.store.id) ?? [];
  }, [order]);

  const adjustedPrice = useMemo(() => {
    if (!order || !cartItem) return 0;
    return getAdjustedPrice(order, cartItem, matchingItems, index);
  }, [order, cartItem, matchingItems, index]);

  useEffect(() => {
    if (cartItem) {
      setReview({
        productId: cartItem.product.id || "",
        imageId: [],
        rating: 0,
        comment: "",
      });
    }
  }, [setReview, cartItem]);

  useEffect(() => {
    const checkReviews = async () => {
      if (cartItem?.product?.id && user?.id) {
        setOrderLoading(true);
        const result = await checkIfUserReviewedProduct([cartItem.product.id], user.id);
        setHasUserReviewed(result[cartItem.product.id]);
        setOrderLoading(false);
      }
    };

    checkReviews();
  }, [cartItem, user, setOrderLoading]);

  if (!order) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Empty />
      </div>
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setReview({
      ...review,
      comment: event.target.value,
      productId: review?.productId || "",
      rating: review?.rating ?? 0,
    });
  };

  const handleSubmit = async () => {
    if (!review || !review.rating) {
      showPopup("error", "Please give rating");
      return;
    } else if (!review.productId) {
      showPopup("error", "Please refresh the page and try again");
      return;
    }
    const { data } = await postReview(review);
    if (!data) {
      showPopup("error", "Failed to submit review");
      return;
    }
    router.push("/orders");
  };

  const updateImage = (image: UploadedFile, remove?: boolean) => {
    if (remove) {
      setReview({
        ...review,
        comment: review?.comment || "",
        productId: review?.productId || "",
        rating: review?.rating ?? 0,
        imageId: review?.imageId?.filter(id => id !== image.id) || [],
      });
      setUploadedImages(prev => prev.filter(img => img.id !== image.id));
    } else if (typeof image.id === "string") {
      setReview({
        ...review,
        comment: review?.comment || "",
        productId: review?.productId || "",
        rating: review?.rating ?? 0,
        imageId: [...(review?.imageId || []), image.id as string],
      });
      setUploadedImages(prev => [...prev, image]);
    }
  };

  if (orderLoading) return <Loader />;

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center sm:w-3/4">
      <p className="my-4 text-center text-xs font-normal sm:text-base md:text-xl lg:text-3xl">
        Our sellers depend on feedback from customers like you to improve their business.
      </p>
      <div className="w-full lg:w-1/2">
        {cartItem && <ProductCard adjustedPrice={adjustedPrice} key={order.id} id={order.id} order={order} item={cartItem} />}
      </div>
      {hasUserReviewed ? (
        <ErrorPage description="You have already reviewed this product. Thank you!" />
      ) : (
        <>
          {" "}
          <div>
            <p className="p-2 text-center text-xs font-semibold sm:text-base md:text-xl lg:text-3xl">How was your overall experience?</p>

            <div className="rating rating-lg flex justify-center space-x-2">
              <Rate
                value={review?.rating || 0}
                character={({ index = 0 }) => customIcons[index + 1]}
                onChange={value =>
                  setReview({
                    ...review,
                    rating: value,
                    productId: review?.productId || "",
                    comment: review?.comment || "",
                  })
                }
              />
            </div>
          </div>
          <div className="my-4 flex h-full w-full flex-col items-center justify-center p-2">
            <span className="text-red-600">Optional *</span>
            <MultipleImageUpload changeImage={updateImage} images={uploadedImages} />
          </div>
          <div className="flex w-full flex-col items-center justify-center">
            <p className="p-2 text-center text-xs font-semibold sm:text-base md:text-xl lg:text-3xl">Description (Optional)</p>
            <div className="w-full p-2 sm:w-1/2">
              <TextAreaField placeholder="Type something here..." value={review?.comment || ""} onChange={handleChange} />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <Button2 type={ButtonType.PRIMARY} buttonSize="lg" label="Submit" handleClick={handleSubmit} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RateProductScreen;
