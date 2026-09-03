//Import Mixpanel SDK
import mixpanel from "mixpanel-browser";

export const mixPanelInstance = () => {
  mixpanel.init("37947962d8b0b5510700742002b4b2f5", {
    debug: true,
    track_pageview: true,
    ignore_dnt: true,
  });
};
