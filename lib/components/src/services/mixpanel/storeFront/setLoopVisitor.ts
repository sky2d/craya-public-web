import { getOrCreateDeviceId } from "components/src/utils/getOrCreateDeviceId";
import { MixpanelTracking } from "components/src/utils/MixpanelTracking";

export const setLoopVisitor = (storeId: string, loopId?: string) => {
  const mixpanel = MixpanelTracking.getInstance();
  const deviceId = getOrCreateDeviceId();

  mixpanel.identifyDevice(deviceId);
  mixpanel.trackLoopVisit(storeId, loopId, deviceId);
};
