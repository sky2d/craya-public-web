import { StorefrontComponentConfigProps } from "../../interfaces";
import { VideoCard } from "../../major";

export const ShoppableCarouselConfig: React.FC<StorefrontComponentConfigProps> = ({ data, setData }) => {
  const handleVideoSelection = (loopId: string) => {
    const updatedData = { ...data };
    updatedData._selectedVideoIds.push(loopId);
    setData(updatedData);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 py-2">
      {data.loops.map((loop, index) => (
        <div key={index} className="rounded-2xl border-2 border-brand-color1 p-2">
          <div className="mb-2 flex items-center">
            <input
              type="checkbox"
              checked={data._selectedVideoIds?.includes(loop.id!)}
              onChange={() => handleVideoSelection(loop.id!)}
              className="bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded-2xl text-brand-color1 focus:ring-2 focus:ring-brand-color1 dark:focus:ring-brand-color3"
            />
            <label className="text-gray-900 dark:text-gray-300 ms-2 font-medium body-xs">Select Video</label>
          </div>
          <div className="shadow-xl">
            <VideoCard loop={loop} size="w-40 h-72" index={index} />
          </div>
        </div>
      ))}
    </div>
  );
};
