"use client";

import { WhiteBackgroundWrapper } from "@/components/wrapper/WhiteBackgroundWrapper";
import { useUserContext } from "@/provider/UserProvider";
import { validateUserFields } from "@/services/validators/user.validator";
import { Loader } from "@/utils/loader";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import { Gender, SocialContacts, UploadedFile, User } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { InputFieldSize, InputFieldType } from "components/src/interfaces/InputField";
import { Button2, InputField2, showPopup } from "components/src/minor";
import { updateUser } from "components/src/services/api/user";
import { formatToISODate } from "components/src/utils/date";
import dayjs, { Dayjs } from "dayjs";
import dynamic from "next/dynamic";
import { ChangeEvent, useCallback } from "react";
import { MdErrorOutline } from "react-icons/md";

const PageHeader = dynamic(() => import("components/src/major/PageHeader").then(mod => mod.PageHeader));
const AddressSection = dynamic(() => import("@/components/user/AddressSection "), { ssr: false });
const ImageUpload = dynamic(() => import("components/src/minor/ImageUpload").then(mod => mod.ImageUpload));

const useProfileForm = () => {
  const { user, setUser, userErrors, setUserErrors, loading, setLoading } = useUserContext();

  const handleInputChange = useCallback(
    (key: keyof User) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (user) {
        setUser({ ...user, [key]: e.target.value });
      }
    },
    [user, setUser],
  );

  const handleSocialChange = useCallback(
    (platform: keyof SocialContacts) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (user) {
        setUser({
          ...user,
          socials: {
            ...user.socials,
            [platform]: e.target.value,
          },
        });
      }
    },
    [user, setUser],
  );

  const handleSelectChange = useCallback(
    (key: keyof User) => (e: ChangeEvent<HTMLSelectElement>) => {
      if (user) {
        setUser({ ...user, [key]: e.target.value });
      }
    },
    [user, setUser],
  );

  const updateUserImage = useCallback(
    (image: UploadedFile) => {
      if (user) {
        setUser({ ...user, image });
      }
    },
    [user, setUser],
  );

  const handleSaveProfile = useCallback(async () => {
    const validationErrors = validateUserFields(user!);

    if (validationErrors) {
      setUserErrors(validationErrors);
      return;
    }

    if (user) {
      const updatedUser = { ...user };

      if (updatedUser.dob) {
        updatedUser.dob = formatToISODate(updatedUser.dob);
      }

      setLoading(true);
      const { error } = await updateUser(updatedUser);
      setLoading(false);

      if (error) {
        showPopup("error", `Unable to update user data: ${error}`);
        return;
      }

      setUser(user);
      setUserErrors(undefined);
    }
  }, [user, setUser, setUserErrors, setLoading]);

  return {
    user,
    userErrors,
    handleInputChange,
    handleSocialChange,
    handleSelectChange,
    updateUserImage,
    handleSaveProfile,
    setUser,
    loading,
  };
};

const EditUserProfile = () => {
  const { user, userErrors, setUser, handleInputChange, handleSocialChange, handleSelectChange, updateUserImage, handleSaveProfile, loading } =
    useProfileForm();

  const onChange: DatePickerProps<Dayjs[]>["onChange"] = (date, dateString) => {
    if (user && dateString) {
      setUser({ ...user, dob: Array.isArray(dateString) ? dateString[0] : dateString });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <PageHeader title="Edit Profile" />
      <div className="mt-8 flex w-full items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center md:w-3/4">
          <div className="flex w-full flex-col items-center justify-start sm:flex-row sm:items-start">
            <div className="flex aspect-square flex-col items-center justify-center p-2 sm:h-[400px]">
              <ImageUpload
                className="aspect-square h-full min-h-40 w-full"
                borderRadius="rounded-xl"
                changeImage={updateUserImage}
                image={user?.image}
              />
              <span className="my-2 flex cursor-pointer items-center justify-center text-[#C4C4C4] body-sm">Edit Picture</span>
              {userErrors?.image && <p className="mt-2 text-red-500">{userErrors?.image}</p>}
            </div>
            <div className="flex h-full w-full flex-col items-center justify-center">
              <InputFieldGroup
                label="Name"
                type={InputFieldType.TEXT}
                value={user?.name || ""}
                onChange={handleInputChange("name")}
                errorMessage={userErrors?.name}
              />
              <InputFieldGroup
                label="Mail ID"
                type={InputFieldType.EMAIL}
                value={user?.email || ""}
                onChange={handleInputChange("email")}
                disabled={user?.loginMethod === "GOOGLE"}
                errorMessage={userErrors?.email}
              />
              <InputFieldGroup
                label="Phone Number"
                value={user?.phone || ""}
                type={InputFieldType.TEXT}
                onChange={handleInputChange("phone")}
                disabled={user?.loginMethod !== "GOOGLE"}
                errorMessage={userErrors?.phone}
              />
              <InputFieldGroup
                label="Instagram UserId"
                value={user?.socials?.instagram || ""}
                type={InputFieldType.TEXT}
                onChange={handleSocialChange("instagram")}
              />
              <div className="flex w-full p-2">
                <div className="w-1/2 pr-2">
                  <label className="block px-2 text-sm text-textColor body-sm">Gender</label>
                  <select value={user?.gender} onChange={handleSelectChange("gender")} className="w-full rounded-md border border-brand-color3 p-1">
                    <option value="">Select</option>
                    <option value={Gender.MALE}>Male</option>
                    <option value={Gender.FEMALE}>Female</option>
                    <option value={Gender.OTHERS}>Others</option>
                  </select>
                  {userErrors?.gender && (
                    <div className="mt-2 flex items-center text-red-500">
                      <div className="text-white mr-1 flex h-6 w-6 items-center justify-center rounded-full text-red-500">
                        <MdErrorOutline />
                      </div>
                      <span>{userErrors.gender}</span>
                    </div>
                  )}
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block px-2 text-sm text-textColor body-sm">DOB</label>
                  <DatePicker
                    defaultValue={user?.dob ? [dayjs(user.dob, "YYYY-MM-DD")] : undefined}
                    placeholder="YYYY-MM-DD"
                    onChange={onChange}
                    needConfirm
                    maxDate={dayjs(new Date().toISOString().split("T")[0])}
                    status={userErrors?.dob ? "error" : ""}
                    className="w-full rounded-lg p-1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 flex w-full justify-center p-2 sm:w-auto sm:min-w-[50%] md:min-w-[25%]">
            <Button2 type={ButtonType.PRIMARY} buttonSize="md" label="Save Profile" handleClick={handleSaveProfile} />
          </div>
          <WhiteBackgroundWrapper>
            <p className="text-[5vw] font-semibold sm:text-[2.5vw]">Addresses</p>
          </WhiteBackgroundWrapper>
          <AddressSection />
        </div>
      </div>
    </div>
  );
};

interface InputFieldGroupProps {
  label: string;
  value: string;
  type: InputFieldType;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errorMessage?: string;
  disabled?: boolean;
  size?: InputFieldSize;
}

const InputFieldGroup: React.FC<InputFieldGroupProps> = ({ label, type, value, onChange, errorMessage, disabled, size }) => {
  return (
    <div className="w-full p-2">
      <label className="block px-2 text-sm text-textColor body-sm">{label}</label>
      <InputField2 type={type} placeholder={label} value={value} onChange={onChange} disabled={disabled} size={size} errorMessage={errorMessage} />
    </div>
  );
};

export default EditUserProfile;
