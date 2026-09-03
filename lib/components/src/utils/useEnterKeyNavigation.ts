import { useCallback } from "react";

export const useEnterKeyNavigation = () => {
  const handleEnterKey = useCallback((e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, nextFieldId?: string, buttonId?: string) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents default behavior like form submission

      // If a buttonId is provided, trigger button click
      if (buttonId) {
        const buttonElement = document.getElementById(buttonId) as HTMLButtonElement | null;
        if (buttonElement) {
          buttonElement.click(); // Trigger the button click
        }
      }

      // Move focus to the next field if nextFieldId is provided
      if (nextFieldId) {
        const nextElement = document.getElementById(nextFieldId) as HTMLElement | null;
        if (nextElement) {
          nextElement.focus(); // Move focus to the next field
          if (nextElement instanceof HTMLTextAreaElement) {
            nextElement.setSelectionRange(nextElement.value.length, nextElement.value.length); // Move cursor to the end
          }
        }
      }
    }
  }, []);

  return { handleEnterKey };
};
