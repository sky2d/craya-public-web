"use client";

import ProductCard from "@/components/product/OrderProductCard";
import { calculateProgress, getAdjustedPrice } from "@/utils/orders";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import Box from "components/src/icons/iconFiles/Box.svg";
import Bus from "components/src/icons/iconFiles/Bus.svg";
import ShipRocket from "components/src/icons/iconFiles/ShipRocket.svg";
import Stopwatch from "components/src/icons/iconFiles/Stopwatch.svg";
import { Order, ShipmentTrackActivity, TrackingData } from "components/src/interfaces/orders";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";

interface TrackProductScreenProps {
  order: Order | undefined;
  index: number;
  trackingData: TrackingData | undefined;
}

const Progress = dynamic(() => import("antd").then(mod => mod.Progress));
const Timeline = dynamic(() => import("antd").then(mod => mod.Timeline));
const Spin = dynamic(() => import("antd").then(mod => mod.Spin));
const Input = dynamic(() => import("antd").then(mod => mod.Input));
const Tooltip = dynamic(() => import("antd").then(mod => mod.Tooltip));
const ErrorPage = dynamic(() => import("components/src/module/ErrorPage").then(mod => mod.ErrorPage), { ssr: false });

const TrackYourProductScreen: React.FC<TrackProductScreenProps> = ({ order, index, trackingData }) => {
  const [copied, setCopied] = useState(false);

  const cartItem = useMemo(() => {
    const matchingItems = order?.cart?.cartItems?.filter(item => item.storeId === order.store.id) ?? [];
    return matchingItems[index] ?? null;
  }, [order, index]);

  const adjustedPrice = useMemo(() => {
    if (!cartItem || !order) return 0;
    const matchingItems = order.cart.cartItems?.filter(item => item.storeId === order.store.id) ?? [];
    return getAdjustedPrice(order, cartItem, matchingItems, index);
  }, [order, cartItem, index]);

  const timelineItems = useMemo(() => {
    return (
      trackingData?.shipment_track_activities?.map((item: ShipmentTrackActivity, idx: number) => ({
        // Use a more stable key than the array index, e.g., a unique ID from the data.
        key: `${item.date}-${idx}`,
        dot: <div className="h-3 w-3 rounded-full border border-[#7C54E9] bg-[#7C54E9]" />,
        children: (
          <div>
            <div>{item.date}</div>
            <div>{item.status}</div>
            <div>{item.activity}</div>
            <div>{item.location}</div>
          </div>
        ),
      })) ?? []
    );
  }, [trackingData]);

  const handleCopy = async () => {
    if (!order?.awbCode) return;
    try {
      await navigator.clipboard.writeText(order.awbCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  const timelineData =
    trackingData?.shipment_track_activities?.map(item => ({
      date: item.date,
      status: item.status,
      activity: item.activity,
      location: item.location,
    })) ?? [];

  const awbCode = order?.awbCode;

  if (!order || !cartItem) {
    return <ErrorPage description={!order ? `Order  not found.` : `Item was not found in order.`} />;
  }

  const getDaysUntilDelivery = (estimatedDateStr: string) => {
    if (!estimatedDateStr) return null;

    const estimatedDate = new Date(estimatedDateStr);
    const today = new Date();

    estimatedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = estimatedDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const daysUntilDelivery = getDaysUntilDelivery(order.estimatedDeliveryDate);
  const progress = calculateProgress(trackingData?.shipment_track_activities || []);

  return (
    <div className="mx-auto flex w-3/4 flex-col items-center justify-center">
      <div className="my-4 flex h-full w-full flex-col items-start justify-center lg:flex-row">
        <div className="w-full p-2 sm:p-0 lg:w-1/2">
          {cartItem && <ProductCard id={order.id} adjustedPrice={adjustedPrice} order={order} item={cartItem} />}
        </div>
        <div className="flex w-full flex-grow items-stretch justify-center p-2 lg:w-1/2">
          {[
            { src: Bus, text: "Estimated Delivery Date", value: order.estimatedDeliveryDate || "Please be patience, we are working on it" },
            {
              src: Stopwatch,
              text: "Estimated Delivery Time",
              value: daysUntilDelivery !== null ? `${daysUntilDelivery} DAY${daysUntilDelivery !== 1 ? "S" : ""}` : "Delivering Soon",
            },
          ].map((item, index) => (
            <div key={index} className="m-2 flex flex-1 flex-col rounded-[20px] border-2 border-brand-color3 p-4">
              <div className="flex aspect-square w-full items-center justify-center rounded-[12px] bg-brand-color3">
                <div className="relative h-full w-full">
                  <Image src={item.src} alt={item.text} fill draggable={false} className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
                </div>
              </div>

              <span className="my-2 block text-center text-base text-gray">{item.text}</span>
              <span className="my-4 block text-center text-xl text-black-dark1">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-center p-2 sm:flex-row sm:justify-between">
        {timelineData.length > 0 ? (
          <div className="my-2 w-full rounded-[15px] border-2 border-brand-color3 p-2 sm:mr-1 sm:max-w-[50%]">
            <Progress percent={progress} className="my-2" status="active" showInfo={false} size={"small"} strokeColor={"#7C54E9"} />
            <Timeline className="my-4 flex flex-col justify-center" items={timelineItems} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 p-4">
            <div className="text-gray-800 text-2xl font-semibold">Your order is on the way!</div>
            <div className="text-gray-600 text-center text-lg">
              Please be patient, we&#39;re working hard to get your order to you as soon as possible.
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Spin size="large" />
              <span className="text-gray-500 text-base">Hang tight while we process your order...</span>
            </div>
          </div>
        )}

        <div className="my-2 w-full rounded-[15px] border-2 border-brand-color3 p-2 sm:max-w-[50%]">
          <div className="my-2 mb-4 flex items-center">
            <Image src={Box} width={40} height={40} draggable={false} alt="Shipment package icon" className="aspect-square h-full rounded-full" />
            <span className="mx-2 font-normal text-[#5E5E5E]">Shipment</span>
          </div>
          <div className="flex flex-col items-center justify-center md:justify-between lg:flex-row">
            <div className="my-2 mb-4 flex w-full items-center">
              <Image src={ShipRocket} width={40} height={40} draggable={false} alt="Ship Rocket logo" className="aspect-square h-full" />
              <span className="mx-2 text-2xl font-bold">Ship Rocket</span>
            </div>
            <div className="flex w-full items-center gap-2">
              <Input
                value={awbCode || "Not available yet"}
                readOnly
                className="w-full rounded-[15px] p-2 text-gray"
                suffix={
                  <Tooltip title={!awbCode ? "AWB Code not available" : copied ? "Copied!" : "Copy AWB Code"}>
                    {copied ? (
                      <CheckOutlined className="text-green-500" />
                    ) : (
                      <CopyOutlined
                        className={awbCode ? "cursor-pointer text-[#7C54E9] transition hover:text-[#5A3EBF]" : "text-gray-400 cursor-not-allowed"}
                        onClick={awbCode ? handleCopy : undefined}
                      />
                    )}
                  </Tooltip>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackYourProductScreen;
