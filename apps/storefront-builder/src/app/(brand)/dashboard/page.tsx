"use client";
import { useStoreContext } from "@/provider/StoreProvider";
import { Home } from "./screen/Home";
import StoreDetails from "./store/StoreDetails";
const HomePage = () => {
  const { store } = useStoreContext();

  if (store.isOnboarding) {
    return <StoreDetails />;
  } else {
    return <Home />;
  }
};

export default HomePage;
