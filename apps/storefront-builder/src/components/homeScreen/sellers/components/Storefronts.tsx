export const Storefronts = () => {
  return (
    <div className="relative aspect-[3/2] w-full sm:w-[50%]">
      {/* Laptop SVG - visible on sm and up */}
      <svg className="hidden h-full w-full sm:block" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="10" width="110" height="80" rx="6" ry="6" fill="#cfd8dc" stroke="#333" strokeWidth="2" />
        <rect x="28" y="18" width="94" height="64" rx="2" ry="2" fill="#ffffff" />
      </svg>

      {/* Laptop iframe */}
      <div
        className="absolute hidden overflow-hidden rounded-md sm:block"
        style={{
          left: "18.67%", // 28 / 150
          top: "18%", // 18 / 100
          width: "62.67%", // 94 / 150
          height: "64%", // 64 / 100
        }}
      >
        <iframe
          src={process.env.NEXT_PUBLIC_WEB_DOMAIN || "https://craya.shop/anant"}
          className="h-full w-full border-none"
          title="Storefront Desktop"
        ></iframe>
      </div>
    </div>
  );
};
