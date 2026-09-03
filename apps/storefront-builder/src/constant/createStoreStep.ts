export interface Step {
  title: string;
  list: string[];
  footer: string;
}

export const steps: Step[] = [
  {
    title: "Feels like setting up your profile",
    list: ["Add a Logo", "Name your store", "Write a quick intro"],
    footer: "Craya’s AI helps polishing it all in seconds, so your storefront feels ready from the start.",
  },
  {
    title: "Like posting your favorite photos.",
    list: ["Upload product pics", "Set your price", "Add quantity"],
    footer: "Craya’s AI takes care of descriptions, tags, and the boring stuff. Every product gets ready to sell in seconds",
  },
  {
    title: "Like curating your Feed.",
    list: ["Start from scratch", "Pick a template", "Drag and drop your vibe into place"],
    footer: "Craya’s AI fine-tunes the graphics and text Also our video feed feature makes the storefront conversion ready....",
  },
];
