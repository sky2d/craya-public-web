import { capitalize } from "lodash";

export const convertToPascalCase = (text: string) => {
  const words = text.toLowerCase().split("_");
  const capitalizedWords = words.map(capitalize);
  return capitalizedWords.join(" ");
};
