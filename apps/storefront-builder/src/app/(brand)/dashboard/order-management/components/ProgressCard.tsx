import { DownOutlined } from "@ant-design/icons";
import Card from "antd/es/card/Card";

const ProgressCard = () => (
  <Card
    title={
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <DownOutlined className="text-gray-500 cursor-pointer" />
          <span className="text-gray-800 font-semibold">Progress</span>
        </div>
        <DownOutlined className="text-gray-500 cursor-pointer" />
      </div>
    }
    bordered={false}
    className="shadow-sm"
  >
    <div className="w-full">
      <div className="text-gray-500 flex justify-between text-xs">
        {["Progress", "Progress", "Progress", "Progress"].map((step, index) => (
          <div key={index} className="flex-1 text-center">
            {step}
          </div>
        ))}
      </div>
      <div className="mt-1 flex space-x-1">
        <div className="h-2 flex-1 rounded-full bg-green-500"></div>
        <div className="h-2 flex-1 rounded-full bg-green-500"></div>
        <div className="h-2 flex-1 rounded-full bg-green-500"></div>
        <div className="h-2 flex-1 rounded-full bg-yellow-400"></div>
      </div>
    </div>
  </Card>
);

export default ProgressCard;
