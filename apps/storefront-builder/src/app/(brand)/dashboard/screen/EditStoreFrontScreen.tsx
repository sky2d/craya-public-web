"use client";

import editStoreFront from "@/assets/backDrops/editStoreFront.png";
import { Button } from "components/src/minor";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EditStoreFrontScreen = () => {
  const router = useRouter();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      {/* Background Image */}
      <Image src={editStoreFront} alt="Edit Storefront Background" fill priority />

      {/* Button Container */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <Button label="Start Building" primary={true} className="animate-bounce heading-3" handelClick={() => router.push("/builder")} />
      </div>
    </div>
  );
};

export default EditStoreFrontScreen;
