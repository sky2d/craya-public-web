import { LoadingWithGif } from "components/src/minor/Loading";

export const Loader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <LoadingWithGif isCentre={true} />
  </div>
);
