import Flicking from "@egjs/react-flicking";
export const handleFlickingNavigation = async (isReady: boolean, ref: React.RefObject<Flicking>, direction: "next" | "prev") => {
  if (!isReady || !ref.current) return;

  try {
    await ref.current?.[direction]();
  } catch (_) {
    // No specific error handling required
  }
};
