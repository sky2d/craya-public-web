import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import Avatar from "antd/es/avatar/avatar";
import { Address, User } from "components/src/interfaces";

interface CustomerInfoCardProps {
  user: User;
  address: Address;
}

const CustomerInfoCard: React.FC<CustomerInfoCardProps> = ({ user, address }) => (
  <div className="bg-white rounded-xl border border-[#CDCDCD] p-4 shadow-sm">
    <div className="flex items-center space-x-3">
      <Avatar size="large" icon={<UserOutlined />} />
      <p className="text-[clamp(10px,0.6vw,12px)] font-normal text-[#8B8D97]">{user.name}</p>
    </div>

    <div className="grid grid-cols-2 gap-4 border-t border-[#D8D8D8] pt-4 font-normal">
      <div>
        <p className="text-[clamp(10px,0.6vw,12px)] text-black-dark3">Phone</p>
        <p className="text-[clamp(10px,0.75vw,14px)] font-medium">{user.phone}</p>
      </div>
      <div>
        <p className="text-[clamp(10px,0.6vw,12px)] text-black-dark3">Email</p>
        <p className="text-[clamp(10px,0.75vw,14px)] font-medium">{user.email}</p>
      </div>
    </div>
    <div className="mt-4 border-t border-[#D8D8D8] pt-4">
      <p className="flex items-center text-[clamp(10px,0.6vw,12px)] text-black-dark3">
        <HomeOutlined className="mr-2" /> Home Address
      </p>
      <p className="text-gray-700 mt-1 text-[clamp(10px,0.75vw,14px)] font-medium">
        {address.flatNumber}, {address.area}, {address.landMark}, {address.town}, {address.state}, {address.pinCode}
      </p>
    </div>
  </div>
);

export default CustomerInfoCard;
