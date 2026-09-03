"use client";

import { DraggedItem } from "@/app/(brand)/builder/components/DraggedItem";
import { useBuilderContext } from "@/provider/BuilderProvider";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { StorefrontComponentType } from "components/src/interfaces";
import { useState } from "react";

type DndContextProp = {
  children: React.ReactNode;
};

export const DndContextProvider: React.FC<DndContextProp> = ({ children }) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(KeyboardSensor), useSensor(TouchSensor));
  const { newStorefrontComponent, setNewStorefrontComponent, setIsOpenComponentList } = useBuilderContext();

  const [activeType, setActiveType] = useState<StorefrontComponentType | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveType(event.active.data.current?.type);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setActiveType(null);
    if (over && over.id === "droppable") {
      setNewStorefrontComponent({
        ...newStorefrontComponent,
        type: active.data.current?.type,
        data: JSON.parse(JSON.stringify(active.data.current?.initialData)),
      });
      setIsOpenComponentList(true);
    }
  };
  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}>
      {children}
      <DragOverlay
        dropAnimation={{
          duration: 500,
          easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
        }}
      >
        {activeType ? (
          <div className="mt-3 rounded-lg border-2 border-brand-color1 bg-white-light4 py-2 shadow-xl">
            <DraggedItem type={activeType} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
