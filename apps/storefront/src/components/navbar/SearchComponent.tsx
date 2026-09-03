"use client";

import { useProductContext } from "@/provider/ProductProvider";
import { RecentSearched } from "components/src/interfaces";
import { ButtonType } from "components/src/interfaces/Buttons";
import { InputFieldSize, InputFieldType } from "components/src/interfaces/InputField";
import DrawerWrapper from "components/src/major/wrapper/DrawerWrapper";
import { Button2, InputField2, showPopup } from "components/src/minor";
import { recentSearchesProducts } from "components/src/services/api";
import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";

type SearchComponentProps = {
  isSearchDropdownOpen: boolean;
  closeDropdown: () => void;
};

const SearchComponent: FC<SearchComponentProps> = ({ isSearchDropdownOpen, closeDropdown }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<RecentSearched[] | null>(null);
  const { tags } = useProductContext();

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const { data } = await recentSearchesProducts();
        if (data) setRecentSearches(data);
      } catch (error) {
        showPopup("error", String(error));
        return;
      }
    };
    if (isSearchDropdownOpen) {
      fetchRecentSearches();
    }
  }, [isSearchDropdownOpen]);

  const resetSearch = useCallback(() => {
    setSearch("");
    closeDropdown();
  }, [closeDropdown]);

  useEffect(() => {
    if (!isSearchDropdownOpen) {
      resetSearch();
    }
  }, [isSearchDropdownOpen, resetSearch]);

  if (!isSearchDropdownOpen) return null;

  // Handlers
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchRedirect = async (value: string, type: "search" | "tag") => {
    if (!value.trim()) {
      showPopup("warning", `Please enter a valid ${type}`);
      return;
    }

    resetSearch();
    closeDropdown();

    if (pathname !== `/products`) {
      return router.push(`/products?${type}=${encodeURIComponent(value)}`);
    }
  };

  return (
    <DrawerWrapper className="rounded-b-[15px] bg-white-light4">
      <div className="flex items-center p-2">
        <InputField2
          type={InputFieldType.TEXT}
          icon={<CiSearch style={{ fontSize: "16px" }} />}
          iconPosition="left"
          placeholder="Search..."
          onChange={handleChange}
          size={InputFieldSize.SMALL}
          value={search}
          onSubmit={() => handleSearchRedirect(search, "search")}
        />

        <div className="my-2 flex w-auto justify-center px-2">
          <Button2 type={ButtonType.PRIMARY} handleClick={() => handleSearchRedirect(search, "search")} label="Search" buttonSize="md" />
        </div>
      </div>
      <div className="">
        {recentSearches && recentSearches?.length > 0 && (
          <h3 className="text-gray-700 mb-2 p-2 pl-3 text-sm font-black sm:text-[1.2vw]">Recent Searches</h3>
        )}
        {recentSearches && recentSearches?.length > 0 && <hr className="my-1 border-t-2" style={{ border: "1px solid #767676" }} />}

        <ul className=" ">
          {recentSearches?.map((recent, index) => (
            <React.Fragment key={index}>
              <li
                className="hover:text-gray-800 my-2 flex cursor-pointer items-center justify-between pl-5 text-base font-normal text-[#767676]"
                onClick={() => handleSearchRedirect(recent.query, "search")}
              >
                {recent.query}
                <IoIosArrowForward className="pr-2 text-2xl" />
              </li>
              <hr className="my-1 border-t-2" style={{ border: "1px solid #767676" }} />
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div className="mt-4 w-full">
        <h3 className="text-gray-700 mb-2 pl-3 text-sm font-black sm:text-[1.2vw]">Tags</h3>
        <div className="flex w-full flex-wrap justify-center gap-2 pb-2">
          {tags &&
            tags.slice(0, 8).map((tag, index) => (
              <div
                key={index}
                onClick={() => handleSearchRedirect(tag, "tag")}
                className="bg-gray-200 cursor-pointer rounded-md px-2 py-2 text-sm font-normal text-[#767676] shadow-md hover:shadow-lg"
              >
                {tag}
              </div>
            ))}
        </div>
      </div>
    </DrawerWrapper>
  );
};

export default SearchComponent;
