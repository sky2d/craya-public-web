import { DashboardNextButton } from "@/components/dashboard/DashboardNextButton";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2 } from "components/src/minor";
import { useRouter } from "next/navigation";

export const HeaderSection = () => {
  const router = useRouter();
  return (
    <div className="flex w-full items-center justify-between">
      <h4 className="text-4xl font-semibold">Add Your Product</h4>

      <div className="flex h-full items-center justify-between gap-2">
        <DashboardNextButton />
        <Button2 label="Add Product" buttonSize="lg" type={ButtonType.PRIMARY} handleClick={() => router.push("/dashboard/products/addProduct")} />
      </div>
    </div>
  );
};
