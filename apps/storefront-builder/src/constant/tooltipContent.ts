import editStoreTooltip from "@/assets/images/edit_store_tooltip.png";
import linksTooltip from "@/assets/images/links_tooltip.png";
import productTooltip from "@/assets/images/product_tooltip.png";
import Type1 from "@/assets/toolTipAssets/gridTooltipimages/Type1.png";
import Type2 from "@/assets/toolTipAssets/gridTooltipimages/Type2.png";
import Type3 from "@/assets/toolTipAssets/gridTooltipimages/Type3.png";
import { StorefrontComponentType } from "components/src/interfaces";
import { StaticImageData } from "next/image";

interface TooltipItem {
  text: string;
  image?: StaticImageData;
  heading?: string;
  gridImages?: {
    image: StaticImageData;
    noOfImages: number;
  }[];
}

interface TooltipContent {
  yellow: TooltipItem[];
  primary: TooltipItem[];
}

interface TooltipMap {
  dashboardOnboarding: TooltipContent;
  dashboardOnboarded: TooltipContent;
  storeOnboarded: TooltipContent;
  products: TooltipContent;
  productsOnboarded: TooltipContent;
  productsDetail: TooltipContent;
  continueEditing: TooltipContent;
  builder: TooltipContent;
  componentType?: Partial<Record<StorefrontComponentType, TooltipContent>>;
  link: TooltipContent;
}

export const tooltipContent: TooltipMap = {
  dashboardOnboarding: {
    yellow: [
      {
        text: "Hey! You made it, this first page is arguably the most important to building a good storefront. Take your time to think about the color and description because this is what customers will see first.",
        image: editStoreTooltip,
      },
    ],
    primary: [
      {
        heading: "Store Logo",
        text: "Choose an image for the logo in a 1:1 ratio for a clear and beautiful appearance.",
      },
      {
        heading: "Primary color",
        text: "Choose this wisely, it is the **default color** we will use across your entire storefront.",
      },
      {
        heading: "Tag=Visibility",
        text: "These are what you’ll be ranked for. Adding the right tags boosts your SEO and helps more shoppers discover your store.",
      },
      {
        heading: "Tell a little about your store",
        text: "Talk about your store or yourself, anything that you want your customers to know, put it here.",
      },
    ],
  },
  storeOnboarded: {
    yellow: [],
    primary: [
      {
        heading: "Store Logo",
        text: "Choose an image for the logo in a 1:1 ratio for a clear and beautiful appearance.",
      },
      {
        heading: "Primary color",
        text: "Choose this wisely, it is the **default color** we will use across your entire storefront.",
      },
      {
        heading: "Tag=Visibility",
        text: "These are what you’ll be ranked for. Adding the right tags boosts your SEO and helps more shoppers discover your store.",
      },
      {
        heading: "Store Description",
        text: "Talk about your store or yourself, anything that you want your customers to know, put it here.",
      },
    ],
  },
  dashboardOnboarded: {
    yellow: [],
    primary: [
      {
        heading: "Home",
        text: " Everything you need to run your craya store smoothly you will find here along with all new updates and sneak peaks.",
      },
      {
        heading: "Guidelines",
        text: "**Take your time** to go through the guidelines well, they will help ensure a smooth experience for you and your user",
      },
    ],
  },
  products: {
    yellow: [
      {
        heading: "Do it once",
        text: "We know putting the inventory in for each color and size can be tedious but you only have to **do it once** and we take care of it from there.",
      },
      { heading: "BONUS", text: "Make sure to pay attention to the details, we use these to create the product page on the storefront." },
    ],

    //  remove it from product screen
    primary: [
      {
        text: "Make sure your product images are all in the aspect ratio of **(1:1.6)**.",
        image: productTooltip,
      },
    ],
  },

  productsOnboarded: {
    yellow: [],
    primary: [
      {
        text: "Make sure your product images are all in the aspect ratio of **(1:1.6)**.",
        image: productTooltip,
      },
    ],
  },

  productsDetail: {
    yellow: [],
    primary: [
      {
        text: "Make sure your product images are all in the aspect ratio of (1:1.6).",
        image: productTooltip,
      },
      {
        heading: "Categories",
        text: "On the left you can give category and sub-category tags to the product featured which will also transfer to any loops you tag these products in. The category and sub-category fields are like the **hashtags of Craya**, they help us push your product and loop in search results.",
      },
      {
        heading: "Inventory",
        text: "If you scroll down to the color and stock option, here is where you declare your inventory. Choose the color variant and then you can click on any size to set the number of units in stock. You can click on multiple sizes to set the same number of units for all of them.",
      },
    ],
  },
  continueEditing: {
    yellow: [
      {
        heading: "This is the deal!",
        text: " What you build here is what your customers will see, think about the overall feel of the website and put together a store you'd like to buy from. You have control over every element, explore your options and put together your perfect storefront.",
      },
    ],
    primary: [
      {
        heading: "Storefront Inspirations",
        text: "If you need inspiration, here are 8 example storefronts built using the Craya builder, we have tried to showcase different ways of using the same component and we encourage you to explore what you can do.",
      },
    ],
  },
  builder: {
    yellow: [],
    primary: [
      {
        heading: "Storefront Inspirations",
        text: "If you need inspiration, here are 8 example storefronts built using the Craya builder, we have showcased different ways of using the components and **we encourage you to explore** what you can do.",
      },
      {
        heading: "Add Components",
        text: "Drag and drop elements from the right to make them a part of your storefront, you will prompted to give details required by the component. Fill these and see your component live.",
      },
      {
        heading: "Make It Your's",
        text: "You have all the control over the components. Aside from a few components, you can add any component as many times as you want and by dragging the dots over each component you can reorder them.",
      },
    ],
  },

  componentType: {
    [StorefrontComponentType.BRAND_INFO]: {
      primary: [
        {
          heading: "About us tooltip",
          text: "We will make the component using your brand color, logo and description. The details you upload here is not what will show up in the component but it's what the users will see when they click the image and reach the 'about us' page.",
        },
      ],
      yellow: [],
    },
    [StorefrontComponentType.IMAGE_CAROUSEL]: {
      primary: [
        {
          heading: "Image carousel tooltip",
          text: "Look carefully at the details here, we require you to upload two options for each image in the carousel, for mobile and web. This is needed so that we can make your images look crisp on every device. Do make sure the order of the images is same for both.",
        },
      ],
      yellow: [],
    },
    [StorefrontComponentType.IMAGES_GRID]: {
      primary: [
        {
          heading: "Image grid tooltip",
          text: "The # in the section where you upload your images corresponds to the graphic above, you can see where your images will go and what the recommended size is.",
          gridImages: [
            { image: Type1, noOfImages: 4 },
            { image: Type2, noOfImages: 3 },
            { image: Type3, noOfImages: 2 },
          ],
        },
      ],
      yellow: [],
    },
  },

  link: {
    yellow: [
      {
        text: "We know downloading an APK outside the Play Store might seem odd, but we've tested it extensively to ensure proper behavior. Plus we don't pester you with any ads.",
        image: linksTooltip,
      },
    ],
    primary: [
      {
        heading: "We are live",
        text: "Your very own storefront, here in action. Your website is now accessible by **anyone on the internet**.   ",
      },
      {
        heading: "Do this next",
        text: "The coupons component and shoppable video components will be disabled till you set them up in the **seller app**. Download the seller app to start taking orders, setup coupons and loop people in.",
      },
    ],
  },
};
