import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking/dist/flicking.css";
import { StorefrontComponentProps } from "../../interfaces";
import { TEXT_CAROUSEL_PREVIEW_DATA } from "../data";

export const BuilderTextCarousel: React.FC<StorefrontComponentProps> = ({ data }) => {
  data = data ? data : TEXT_CAROUSEL_PREVIEW_DATA;

  if (!data) return null;

  const primaryColor = data.store?.primaryColor;

  return (
    <div className="flex w-full items-center justify-center overflow-x-auto py-2">
      <div
        className="flex flex-nowrap items-center justify-start overflow-x-auto"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {data.texts.map((text, index) => (
          <div
            key={index}
            className="m-1 inline-block rounded-md border px-4 py-1 text-xl shadow-md transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100 hover:cursor-pointer"
            style={{
              borderColor: primaryColor || "transparent",
              color: primaryColor || "inherit",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = primaryColor || "";
              e.currentTarget.style.color = "#FAFAFC";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.color = primaryColor || "inherit";
            }}
          >
            <span className="truncate">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
