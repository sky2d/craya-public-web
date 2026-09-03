"use client";

import EmptyOrder from "@/assets/icons/EmptyOrder.svg";
import OrderProductCard from "@/components/product/OrderProductCard";
import { Loader } from "@/utils/loader";
import { getAdjustedPrice } from "@/utils/orders";
import { Pagination } from "antd";
import { Order, OrdersResponse } from "components/src/interfaces/orders";
import EmptyState from "components/src/major/EmptyState";
import { getOrders } from "components/src/services/api/orders";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const OrdersScreen = ({ orders }: { orders: OrdersResponse }) => {
  const [ordersData, setOrdersData] = useState<OrdersResponse>(orders);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const pageSize = 10;

  const fetchCartProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getOrders({ page: currentPage, limit: 1 });
      if (data) setOrdersData(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage === 1) {
      setOrdersData(orders);
    } else {
      fetchCartProducts();
    }
  }, [currentPage]);

  const handleTrack = (order: Order, index: number) => {
    if (!order.id) return;
    router.push(`/orders/trackYourProduct/${order.id}-${index}`);
  };

  const handleReview = (order: Order, index: number) => {
    if (!order.id) return;
    router.push(`/orders/rateYourProduct/${order.id}-${index}`);
  };

  const handleReturnRefund = (order: Order, index: number) => {
    if (!order.id) return;
    router.push(`/orders/returnRefund/${order.id}-${index}`);
  };

  const hasItems =
    ordersData && ordersData.orders.length > 0 && ordersData.orders.filter(order => (order.cart?.cartItems?.length ?? 0) > 0).length > 0;

  if (!hasItems) {
    return (
      <div className="flex h-full min-h-[80vh] w-full items-center justify-center">
        <EmptyState
          image={<Image src={EmptyOrder} alt="No orders" fill draggable={false} className="h-full w-full object-contain" />}
          title="No Orders Found!"
          subtitle="Looks like you haven't ordered anything yet."
          onButtonClick={() => {
            router.back();
          }}
        />
      </div>
    );
  }

  if (loading) return <Loader />;

  return (
    <div className={twMerge("mx-auto w-full sm:w-3/4", pageSize > 10 ? "flex h-full min-h-lvh flex-col justify-between" : "")}>
      <div className="grid grid-cols-1 gap-2 p-2 lg:grid-cols-2">
        {ordersData.orders.map(order => {
          const matchingItems = order.cart?.cartItems?.filter(item => item.storeId === order.store.id) ?? [];
          return matchingItems.map((item, index) => {
            const adjustedPrice = getAdjustedPrice(order, item, matchingItems, index);
            return (
              <OrderProductCard
                key={`${order.id}-${index}`}
                id={`${order.id}-${index}`}
                item={item}
                adjustedPrice={adjustedPrice}
                order={order}
                handleReview={() => handleReview(order, index)}
                handleTrack={() => handleTrack(order, index)}
                handleReturnRefund={() => handleReturnRefund(order, index)}
              />
            );
          });
        })}
      </div>

      {pageSize > 10 && (
        <div className="flex justify-center py-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={orders.total}
            onChange={page => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default OrdersScreen;
