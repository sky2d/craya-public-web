import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Image, MenuProps, Skeleton } from "antd";
import { UploadedFile } from "components/src/interfaces";
import { showPopup } from "components/src/minor";
import { updateStore, uploadFile } from "components/src/services/api";
import { useRef, useState } from "react";
import { MdErrorOutline } from "react-icons/md";

interface UploadSizeChartProps {
  sizeChartImageIds: string[];
  sizeChartImages: UploadedFile[];
  storeId: string;
  setSizeChartId: (sizeChartId: string) => void;
  sizeChartId: string | null;
  error?: string;
  setSizeChartImageIds: (sizeChartImageIds: string[]) => void;
  setSizeChartImages: (sizeChartImageIds: UploadedFile[]) => void;
}

export const UploadSizeChart: React.FC<UploadSizeChartProps> = ({
  error,
  sizeChartImageIds,
  sizeChartImages,
  sizeChartId,
  storeId,
  setSizeChartId,
  setSizeChartImageIds,
  setSizeChartImages,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<UploadedFile | undefined>(
    sizeChartId ? sizeChartImages.find(chartImage => chartImage.id === sizeChartId) : undefined,
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const fileName = file.name.split(".")[0];
        const isChartNameExits = sizeChartImages.find(image => image.originalName === fileName);
        if (isChartNameExits) {
          return showPopup("error", "Chart name already exists");
        } else {
          setIsUploading(true);
          const fileUploadResponse = await uploadFile(file, fileName);

          if (fileUploadResponse.data) {
            const newImage: UploadedFile = fileUploadResponse.data;

            setSelectedImage(newImage);
            setSizeChartId(newImage.id!);

            const response = await updateStore({
              id: storeId,
              sizeChartImageIds: [...sizeChartImageIds, newImage.id!],
            });
            if (response.data) {
              setSizeChartImages(response.data.sizeChartImages!);
              setSizeChartImageIds(response.data.sizeChartImageIds!);
            }
          } else {
            alert(fileUploadResponse.error || "Upload failed");
          }
        }
      } catch (error) {
        alert(error || "Something went wrong");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const items: MenuProps["items"] = [
    ...sizeChartImages.map(img => ({
      key: img.key!,
      label: img.originalName,
    })),
    { type: "divider" },
    {
      key: "add_new",
      label: <span className="font-semibold text-brand-color1">Add new size chart</span>,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "add_new") {
      handleClick(); // trigger file upload
    } else {
      const selectedProfile = sizeChartImages.find(images => images.key === key);
      if (selectedProfile) {
        setSizeChartId(selectedProfile.id!);
        setSelectedImage(selectedProfile);
      }
    }
  };

  return (
    <>
      <p className="w-full text-start text-base font-medium">Size Chart</p>
      <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

      {sizeChartImages.length === 0 ? (
        <div className="w-full p-5">
          {isUploading ? (
            <Skeleton.Button active block />
          ) : (
            <button
              type="button"
              onClick={handleClick}
              className="w-full rounded-lg border border-[#C7C7C8] px-[10px] py-1 shadow-sm body-sm hover:border-brand-color3 focus:outline-none"
            >
              Upload
            </button>
          )}
        </div>
      ) : (
        <div className="flex gap-3 p-5">
          {isUploading ? (
            <>
              <Skeleton.Button active className="w-4/5" />
              <Skeleton.Button active className="w-1/5" />
            </>
          ) : (
            <>
              <Dropdown menu={{ items, onClick: handleMenuClick }}>
                <Button className="flex w-4/5 items-center justify-between rounded-lg border border-[#C7C7C8] px-[10px] py-1 shadow-sm body-sm hover:border-brand-color3 focus:outline-none">
                  <span className="line-clamp-1"> {selectedImage?.originalName || "Select Image"}</span> <DownOutlined />
                </Button>
              </Dropdown>

              <Button
                onClick={() => setPreviewOpen(true)}
                disabled={!selectedImage}
                className="w-1/5 rounded-lg border border-brand-color1 bg-brand-color1 text-white-light4"
              >
                View
              </Button>
            </>
          )}

          {previewOpen && (
            <Image
              alt="Size chart preview"
              src={selectedImage!.fileUrl}
              style={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: visible => setPreviewOpen(visible),
              }}
            />
          )}
        </div>
      )}

      {error && (
        <p className="flex items-center gap-1 text-sm text-red-500">
          <MdErrorOutline /> Please select size chart
        </p>
      )}
    </>
  );
};
