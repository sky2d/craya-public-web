import Image from "next/image";
import TwoArrow from "../../assets/second.png";
import AddProductImage from "../../assets/slides/ProductDetails.png";
const AddProduct = () => (
  <div className="flex h-full w-full flex-col items-center justify-center p-3">
    <div className="relative flex h-[20vh] w-full items-start justify-start">
      <Image src={TwoArrow} alt="Future Scope" className="object-contain" fill />
    </div>
    <div className="flex h-full w-full flex-col items-center justify-center sm:flex-row">
      <div className="flex h-full w-full flex-col items-start justify-start sm:w-3/4 sm:justify-center">
        <p className="text-start text-6xl font-bold text-white-light4 sm:my-8 sm:text-[5vw]">Add Products</p>
        <p className="text-start text-xl font-normal text-white-light4 sm:my-8 sm:text-[2vw]">
          Add product details and we will create the product page
        </p>
      </div>
      <div className="relative flex h-full w-full items-start justify-center">
        <Image src={AddProductImage} alt="Future Scope" className="object-contain" fill />
      </div>
    </div>
  </div>
);

export default AddProduct;
