import { Collapse } from "antd";
import { IoIosArrowForward } from "react-icons/io";

interface ProductDescriptionProps {
  description: string;
  backgroundColor?: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description, backgroundColor = "#f3f4f6" }) => {
  return (
    <Collapse
      style={{ backgroundColor }}
      size="large"
      bordered={false}
      expandIconPosition="end"
      expandIcon={({ isActive }) => (
        <IoIosArrowForward
          style={{
            fontSize: "20px",
            color: "white",
            transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease-in-out",
          }}
        />
      )}
      items={[
        {
          key: "1",
          label: <p className="text-white-light4">Product Description</p>,
          children: <p className="text-white-light4">{description}</p>,
        },
      ]}
    />
  );
};

export default ProductDescription;
