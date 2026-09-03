"use client";

import chat from "components/src/icons/iconFiles/chat.svg";
import ComponentAdd from "components/src/icons/popupImages/storeFrontBuilder/ComponentAdd.svg";
import StorefrontController from "components/src/icons/popupImages/storeFrontBuilder/StorefrontController.png";
import { ModalBox } from "components/src/minor/ModalBox";

import { useBuilderContext } from "@/provider/BuilderProvider";
import { useStoreContext } from "@/provider/StoreProvider";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Controls from "components/src/icons/iconFiles/Controls.svg";
import { StorefrontComponentType } from "components/src/interfaces";
import { LoadingBar } from "components/src/minor/LoadingBar";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BuilderDraggableComponent } from "./BuilderDraggableComponent";

type PopUpType = 1 | 2 | 3;

type PopUpInfo = {
  title: string;
  description: string;
  image: StaticImageData;
};

const popUpInfoByType: Record<PopUpType, PopUpInfo> = {
  1: {
    title: "Take Control",
    description: "You can tweak your storefront however you like. edit, reorder, or delete components.",
    image: StorefrontController,
  },
  2: {
    title: "Add Video Components",
    description: "Make your storefront even more engaging by adding loop based components like shoppable carousels and video feeds.",
    image: ComponentAdd,
  },
  3: {
    title: "👀 Don’t Miss the Tips!",
    description:
      "Keep an eye out for tooltips across your storefront — they’re packed with quick tips and tricks to help you set up smarter and sell better.",
    image: chat,
  },
};

const Builder: React.FC = () => {
  const { storefrontComponents, setStorefrontComponents, loading, viewMode } = useBuilderContext();
  const { store } = useStoreContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState<PopUpType>(1);
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });
  const hasDevices = localStorage.getItem("isDevicesExist") === "true";
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
  );

  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastElementRef.current) {
      lastElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [storefrontComponents]);

  useEffect(() => {
    if (storefrontComponents.length === 0) return;
    if (!store) return;

    // Case 1: If there is 2 components and onboarding is active, show modal for 5 seconds
    if (storefrontComponents.length === 2 && store.isOnboarding) {
      setType(1);
      setIsModalOpen(true);

      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 5000);

      return () => clearTimeout(timer);
    }

    // Case 2: If required video components are missing and user has logged in the app
    const isVideoComponentsExist =
      storefrontComponents.some(component => component.type === StorefrontComponentType.SHOPPABLE_CAROUSEL) &&
      storefrontComponents.some(component => component.type === StorefrontComponentType.SHOPPABLE_VIDEO_FEED);
    const len = storefrontComponents.length;
    if (!isVideoComponentsExist && (len === 4 || len >= 8) && hasDevices) {
      setType(2);
      setIsModalOpen(true);
      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 5000);

      return () => clearTimeout(timer);
    }

    // case 3: If storefrontComponent have 1 component and onboarding is true, show modal for 5 seconds
    if (storefrontComponents.length === 1 && store.isOnboarding) {
      setType(3);
      setIsModalOpen(true);

      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [storefrontComponents, store]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (over && active.id !== over.id) {
      const oldIndex = storefrontComponents.findIndex(component => component.position === active.id);
      const newIndex = storefrontComponents.findIndex(component => component.position === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const updatedComponents = arrayMove(storefrontComponents, oldIndex, newIndex);
        setStorefrontComponents(updatedComponents);
      }
    }
  };

  return (
    <>
      <div
        className={`${viewMode === "Mobile" ? "mx-auto w-[35%] max-w-[600px]" : "w-full"} ${
          isOver ? "border-brand-color1 shadow-lg shadow-brand-color1" : "border-white-light7"
        } customScrollbar flex h-full min-w-80 flex-col rounded-[10px] border bg-white-light6 px-2`}
        ref={setNodeRef}
      >
        <div className="flex h-10 w-full flex-shrink-0 items-center">
          <Image src={Controls} alt="Controls" width={40} height={40} />
        </div>

        <div className="flex flex-col overflow-y-auto">
          {loading ? (
            <LoadingBar />
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
              <SortableContext items={storefrontComponents.map(component => component.position)} strategy={verticalListSortingStrategy}>
                {storefrontComponents.map(item => (
                  <BuilderDraggableComponent key={item.position} component={item} />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>

      <ModalBox
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        type1={type === 3}
        type2={type !== 3}
        image={popUpInfoByType[type].image}
        title={popUpInfoByType[type].title}
        description={popUpInfoByType[type].description}
      />
    </>
  );
};

export default Builder;
