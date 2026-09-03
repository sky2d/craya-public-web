import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/react-flicking/dist/flicking.css";
import { useState } from "react";
import { Presence, StorefrontComponentProps } from "../../../interfaces";
import { setLoopVisitor } from "../../../services/mixpanel/storeFront/setLoopVisitor";
import { HorizontalVideoCarousel } from "./HorizontalVideoCarosuel";
import { ModalCarousel } from "./ModalCarousel";

export const ShoppableCarousel = ({ data, handlerFunction, wishlistItems }: StorefrontComponentProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModalId, setActiveModalId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  if (!data) return null;

  const Videos = data?.loops.filter(v => v.presence === Presence.CAROUSEL) || [];

  const length = Videos.length;

  if (!length || length === 0) return null;

  return (
    <>
      <HorizontalVideoCarousel
        videos={Videos}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        openModal={index => {
          setLoopVisitor(data.store!.id!, Videos[index].id);
          setActiveModalId(index);
          setIsModalOpen(true);
        }}
        primaryColor={data?.store?.primaryColor}
      />

      {isModalOpen && (
        <ModalCarousel
          videos={Videos}
          activeModalId={activeModalId}
          setActiveModalId={setActiveModalId}
          closeModal={() => setIsModalOpen(false)}
          isMuted={isMuted}
          toggleMute={() => setIsMuted(prev => !prev)}
          data={data}
          handlerFunction={handlerFunction}
          wishlistItems={wishlistItems}
        />
      )}
    </>
  );
};
