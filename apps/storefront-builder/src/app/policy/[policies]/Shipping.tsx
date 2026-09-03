export default function ShippingPolicy() {
  return (
    <div className="h-full p-6">
      <h1 className="text-gray-900 mb-6 text-3xl font-bold">Shipping Policy</h1>
      <div className="mx-auto my-4 max-w-3xl">
        <h2 className="mb-4 text-xl font-bold">Overview</h2>
        <p className="mt-4 text-lg leading-relaxed">
          At Craya, we enable brands to sell unique products through our storefront builder. Each seller on Craya manages their own shipping policies,
          and we use Shiprocket as our primary third-party logistics partner to ensure smooth and reliable deliveries.
        </p>
      </div>
      <div className="mx-auto my-4 max-w-3xl">
        <h3 className="mb-4 text-xl font-semibold">Shipping Partner</h3>
        <p className="mt-4 text-lg leading-relaxed">
          We have partnered with Shiprocket to handle all deliveries across India. Sellers using our platform may also choose to modify their
          individual shipping policies through their Craya Seller Application.
        </p>
      </div>
      <div className="mx-auto my-4 max-w-3xl">
        <h2 className="mb-4 text-xl font-semibold">Delivery Timeframes</h2>

        <p className="mb-6 text-lg leading-relaxed">
          Orders within India are typically delivered within 3-6 business days, depending on your location and the seller’s processing time. Delivery
          times may vary due to factors such as product availability, shipping distance, and unforeseen logistics delays.
        </p>
      </div>
      <div className="mx-auto my-4 max-w-3xl">
        <h2 className="text-gray-800 mb-6 text-xl font-semibold">Order Tracking</h2>
        <p className="text-gray-700 mb-4">
          Once your order is shipped, you will receive a tracking link via email and SMS, allowing you to monitor your delivery in real-time. Tracking
          information can also be accessed directly on the seller’s storefront.
        </p>
      </div>
      <div className="mx-auto my-4 max-w-3xl">
        <h2 className="text-gray-800 mb-6 text-xl font-semibold"> Shipping Costs</h2>
        <p className="text-gray-700 mb-4">
          Shipping costs are calculated based on the weight, size, and destination of your order. The final shipping fee will be displayed at
          checkout. Some sellers may offer free shipping on orders above a certain amount, as per their individual policies.
        </p>
      </div>
      <div className="mx-auto my-4 max-w-3xl">
        <h2 className="text-gray-800 mb-6 text-xl font-semibold"> Delivery Locations</h2>

        <p className="text-gray-700">
          We deliver to most pin codes across India, excluding certain remote areas that may be outside our logistics network. Availability of
          delivery may vary depending on the seller’s location and their chosen shipping preferences.
        </p>
      </div>
      <div className="mx-auto my-4 max-w-3xl">
        <h2 className="text-gray-800 mb-6 text-xl font-semibold">Custom Seller Shipping Policies</h2>

        <p className="text-gray-700 mb-4">
          Each seller on Craya has the flexibility to modify their own shipping policies via the Craya Seller Application. This means that: Estimated
          delivery timelines may vary from seller to seller. Sellers may offer additional shipping options like express shipping, same-day delivery,
          or pickup based on their preferences. Any shipping-related queries should be directed to the respective seller.
        </p>
      </div>
      <div className="mx-auto my-4 max-w-3xl">
        <h2 className="text-gray-800 mb-6 text-xl font-semibold">Delivery Delays & Exceptions</h2>

        <p className="text-gray-700 mb-4">
          While we and our sellers strive for timely deliveries, certain situations may cause delays, including but not limited to: Unforeseen weather
          conditions or natural disasters. Courier service delays from Shiprocket or other logistics providers. High-demand periods like festivals or
          public holidays. Incomplete or incorrect shipping addresses provided by the customer. If your order is delayed beyond the expected
          timeframe, please contact the seller directly or reach out to Craya support.
        </p>
      </div>
      <div className="mx-auto my-4 max-w-3xl">
        <h2 className="text-gray-800 mb-6 text-xl font-semibold">Returns & Order Issues</h2>
        <p className="text-gray-700 mb-4">
          Each seller on Craya sets their own return and exchange policies. Please review the seller’s return policy before placing an order. If your
          order arrives damaged, defective, or incorrect, you can initiate a return or refund request as per the seller’s policy. For detailed return
          guidelines, refer to our Return & Refund Policy.
        </p>
      </div>
      <div className="mx-auto my-4 max-w-3xl">
        <h2 className="text-gray-800 mb-6 text-xl font-semibold">Customer Support</h2>

        <p className="text-gray-700 mb-4">
          Contact the seller directly through their Craya Storefront. For general platform-related inquiries, reach out to Craya Customer Support at
          <a
            href="mailto:crayacares@gmail.com.
"
            className="text-indigo-600"
          >
            crayacares@gmail.com.
          </a>{" "}
          This shipping policy is subject to updates and modifications. Please check back periodically for any changes.
        </p>
      </div>
    </div>
  );
}
