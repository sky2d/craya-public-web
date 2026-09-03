"use client";
import NotFound from "@/app/not-found";
import { useSocialContext } from "@/provider/SocialProvider";
import { Button, Result } from "antd";

const SocialPolicy = () => {
  const { policies } = useSocialContext();

  const policy = policies[0];

  if (!policy) return <NotFound />;

  return (
    <div className="flex w-full flex-col items-center justify-center p-6 transition-opacity duration-500">
      {policies.length > 0 ? (
        <div className="bg-white w-full scale-100 transform rounded-lg p-6 shadow-lg transition-transform duration-500 hover:scale-105 sm:w-3/4">
          <h2 className="text-gray-900 mb-4 text-2xl font-bold">{policy?.title}</h2>
          {policy.description.split("\n").map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </div>
      ) : (
        <Result status="404" title="404" subTitle="Sorry, there is not data available." extra={<Button type="primary">Back Home</Button>} />
      )}
    </div>
  );
};

export default SocialPolicy;
