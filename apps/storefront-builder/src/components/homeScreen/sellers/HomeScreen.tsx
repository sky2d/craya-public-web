"use client";
import { Loading } from "components/src/minor";
import { useEffect } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { AboutCraya } from "./components/AboutCraya";
import CrayaShowCase from "./components/CrayaShowcase";
import { HeroSection } from "./components/HeroSection";
import Testimonial from "./components/Testimonial";
import StoreFronts from "./components/slides/StoreFronts";
import { TrustedByMany } from "./components/slides/TrustedByMany";
const HomeScreen = () => {
  const session = useSessionContext();

  const { loading } = session;

  useEffect(() => {
    if (!loading && session.doesSessionExist) {
      window.location.href = "/dashboard";
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading isCentre={true} size={48} />
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      <StoreFronts />
      <TrustedByMany />
      <AboutCraya />
      {/* <UserTypes />  */}

      <CrayaShowCase />
      <Testimonial />
    </>
  );
};

export default HomeScreen;
