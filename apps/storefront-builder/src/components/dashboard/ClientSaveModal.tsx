"use client";

import { Modal } from "antd";
import saveError from "components/src/icons/iconFiles/saveError.svg";
import { ButtonType } from "components/src/interfaces/Buttons";
import { Button2 } from "components/src/minor";
import Image from "next/image";

type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleButtonClick: () => void;
  setStoreOrProductChange: (value: boolean) => void;
};

export const ClientModalHandler: React.FC<ModalProps> = ({ isModalOpen, setIsModalOpen, handleButtonClick, setStoreOrProductChange }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
    setStoreOrProductChange(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal centered closable open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <div className="item-center flex flex-col items-center justify-center p-3">
            <div className="relative aspect-square h-20">
              <Image src={saveError} alt="save" fill draggable={false} />
            </div>
            <div className="w-4/5">
              <h1 className="text-center text-black-dark1 heading-4">Wait!</h1>
              <p className="text-center text-black-dark4 body-normal-semibold">
                Looks like you’ve made some changes in the last tab, but they’re not saved yet. go back and hit save to keep them.
              </p>
            </div>

            <div className="mt-3 flex w-full justify-between gap-4">
              <Button2 label="Continue Without Editing" type={ButtonType.DEFAULT} buttonSize="md" handleClick={handleCancel} />
              <Button2 label="Save" type={ButtonType.PRIMARY} buttonSize="md" handleClick={handleButtonClick} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
