import React from "react";

const CancellationRefundPolicy: React.FC = () => {
  return (
    <div className="bg-white mx-auto w-full p-6 sm:max-w-[75%]">
      <h1 className="text-gray-900 mb-6 text-3xl font-bold">Cancellation and Refund Policy</h1>

      <section className="mb-6">
        <h2 className="text-gray-800 text-2xl font-semibold">Overview</h2>
        <p className="text-gray-600 mt-2">
          At Craya, we provide a platform where brands and sellers can create their storefronts and sell unique products. Since each seller operates
          independently, cancellation, refund, and return policies may vary. We encourage customers to review the seller&apos;s individual policies
          before placing an order.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-gray-800 text-2xl font-semibold">Order Cancellations</h2>
        <div className="mt-2 space-y-4">
          <div>
            <h3 className="font-semibold">Seller-Specific Cancellation Policy</h3>
            <p className="text-gray-600">
              Sellers on Craya have the flexibility to set their own cancellation policies. Some may allow order cancellations within a specific
              timeframe, while others may not permit cancellations once an order is processed.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">When Can You Cancel an Order?</h3>
            <p className="text-gray-600">
              If the seller allows cancellations, orders can usually be canceled before they are shipped. Once the order is processed and shipped,
              cancellations may not be possible.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">How to Request a Cancellation?</h3>
            <p className="text-gray-600">
              Customers can request a cancellation by contacting the seller directly through their Craya Storefront. If approved, the refund process
              will be initiated as per the seller’s refund policy.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-gray-800 text-2xl font-semibold">Refund Policy</h2>
        <div className="mt-2 space-y-4">
          <div>
            <h3 className="font-semibold">Eligibility for Refunds</h3>
            <p className="text-gray-600">
              Refund eligibility is determined by the seller’s policy. Refunds may be issued for order cancellations before shipment, defective or
              damaged products, or wrong item deliveries. Refunds are not issued for a change of mind after shipment or for non-refundable items.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Refund Process</h3>
            <p className="text-gray-600">
              Once a refund request is approved by the seller, the refund will be processed using the original payment method. Refunds may take 5-7
              business days to reflect in the customer’s account.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-gray-800 text-2xl font-semibold">Returns and Exchanges</h2>
        <div className="mt-2 space-y-4">
          <div>
            <h3 className="font-semibold">Return Eligibility</h3>
            <p className="text-gray-600">
              Each seller sets their own return policy, including return windows and conditions. Customers should review the seller’s return policy
              before initiating a return request.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">How to Initiate a Return?</h3>
            <p className="text-gray-600">
              To initiate a return, customers should contact the seller through their Craya Storefront and follow their instructions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Return Shipping Costs</h3>
            <p className="text-gray-600">
              Some sellers offer free returns, while others may require customers to cover return shipping costs. If the return is due to a seller’s
              error, the seller may cover the return shipping.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-gray-800 text-2xl font-semibold">Delayed or Missing Refunds</h2>
        <p className="text-gray-600 mt-2">
          If a refund has been approved but not received, customers should check with their bank or payment provider, as processing times may vary. If
          the issue persists, contact Craya Support.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-gray-800 text-2xl font-semibold">Contact & Support</h2>
        <p className="text-gray-600 mt-2">
          For order-specific issues, customers should contact the seller directly. For platform-related issues, reach out to Craya Customer Support at
          <a
            href="mailto:crayacares@gmail.com.
"
            className="text-indigo-600"
          >
            crayacares@gmail.com.
          </a>{" "}
        </p>
      </section>
    </div>
  );
};

export default CancellationRefundPolicy;
