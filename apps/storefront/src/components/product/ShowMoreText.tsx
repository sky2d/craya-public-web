import { useState } from "react";

interface ShowMoreTextProps {
  children: string;
  more?: string;
  less?: string;
  className?: string;
  anchorClass?: string;
  truncatedEndingComponent?: string;
  brandColor?: string;
  maxLength?: number;
}

export const ShowMoreText: React.FC<ShowMoreTextProps> = ({
  children,
  more = "Show More",
  less = "Show Less",
  className = "",
  anchorClass = "",
  brandColor,
  truncatedEndingComponent = "...",
  maxLength = 100,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(prev => !prev);

  const shouldTruncate = children.length > maxLength;
  const displayedText = !shouldTruncate ? children : isExpanded ? children : children.slice(0, maxLength) + (truncatedEndingComponent || "");

  return (
    <div className={className}>
      <p>
        {displayedText}
        {shouldTruncate && (
          <span style={{ color: brandColor }} className={`ml-1 cursor-pointer ${anchorClass}`} onClick={toggleExpand}>
            {isExpanded ? less : more}
          </span>
        )}
      </p>
    </div>
  );
};
