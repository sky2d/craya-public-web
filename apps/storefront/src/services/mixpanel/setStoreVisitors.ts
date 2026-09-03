import { MixpanelTracking } from "components/src/utils/MixpanelTracking"; // Adjust path if needed

export function trackUniqueStoreVisit(storeId: string, storeUrl: string) {
  const mixpanel = MixpanelTracking.getInstance();
  const key = `visited_store_${storeId}`;
  const isNewVisitor = !localStorage.getItem(key);

  // Always track visit with flag
  mixpanel.trackStoreVisit(storeId, storeUrl, "Store Visit");

  // Identify device/user
  mixpanel.identifyDevice(mixpanel.getDistinctId());

  // Update People profile (storeId list, etc.)
  mixpanel.setDevicePeopleProps(storeId);

  // If it's a unique store visit, set cookie and track it separately
  if (isNewVisitor) {
    localStorage.setItem(key, "true");
    mixpanel.trackStoreVisit(storeId, storeUrl, "Unique Store Visit");
  }
}
