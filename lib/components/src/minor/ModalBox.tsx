import { Modal } from "antd";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { ButtonType } from "../interfaces/Buttons";
import { Button2 } from "./Button2";

interface ModalBoxProps {
  type1?: boolean;
  type2?: boolean;
  image: StaticImageData;
  title: string;
  description: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleSingleButtonClick?: () => void;
  handleDoubleButtonClick?: () => void;
  singleButtonLabel?: string;
  doubleButtonLabel?: string;
  singleButton?: boolean;
  doubleButton?: boolean;
}

export const ModalBox: React.FC<ModalBoxProps> = ({
  type1,
  type2,
  image,
  title,
  description,
  isModalOpen,
  setIsModalOpen,
  handleSingleButtonClick,
  handleDoubleButtonClick,
  singleButton,
  doubleButton,
  singleButtonLabel = "",
  doubleButtonLabel = "",
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal centered closable open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
        {type1 && (
          <div>
            <div className="item-center flex items-center justify-center gap-3">
              <Image src={type1 && image} draggable={false} alt="image" width={120} height={120} className="h-24 rounded-lg" />
              <div>
                <h1 className="text-black-dark1 heading-4">{type1 && title}</h1>
                <p className="text-black-dark4 body-normal-semibold">{type1 && description}</p>
              </div>
            </div>
            {singleButton && (
              <div className="mt-3">
                <Button2 label={singleButtonLabel} type={ButtonType.PRIMARY} buttonSize="md" handleClick={handleSingleButtonClick} />
              </div>
            )}
          </div>
        )}

        {type2 && (
          <div>
            <div className="item-center flex flex-col items-center justify-center p-3">
              <Image src={type2 && image} alt="Craya App" draggable={false} width={600} height={600} />
              <div className="w-4/5">
                <h1 className="text-center text-black-dark1 heading-4">{type2 && title} </h1>
                <p className="text-center text-black-dark4 body-normal-semibold">{type2 && description}</p>
              </div>
              {singleButton && (
                <div className="mt-3">
                  <Button2 label={singleButtonLabel} type={ButtonType.PRIMARY} buttonSize="md" handleClick={handleSingleButtonClick} />
                </div>
              )}
              {doubleButton && (
                <div className="mt-3 flex w-full justify-between gap-4">
                  <Button2 label="Cancel" type={ButtonType.DEFAULT} buttonSize="md" handleClick={handleCancel} />
                  <Button2 label={doubleButtonLabel} type={ButtonType.PRIMARY} buttonSize="md" handleClick={handleDoubleButtonClick} />
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
