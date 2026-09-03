import mixpanel from "mixpanel-browser";

export class MixpanelTracking {
  private static instance: MixpanelTracking;

  public static getInstance(): MixpanelTracking {
    if (MixpanelTracking.instance == null) {
      MixpanelTracking.instance = new MixpanelTracking();
    }
    return MixpanelTracking.instance;
  }

  private constructor() {
    if (MixpanelTracking.instance) {
      throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
    }
    mixpanel.init("f5bd804bd1b013afa92586d8a016b590", {
      debug: true,
      ignore_dnt: true,
    });
  }

  public getDistinctId(): string {
    return mixpanel.get_distinct_id(); // Returns the current device/user ID
  }

  // Identify device or user
  public identifyDevice(id: string) {
    mixpanel.identify(id);
  }

  // Track when a store is visited
  public trackStoreVisit(storeId: string, storeUrl: string, eventName: string) {
    mixpanel.track(eventName, {
      storeId,
      storeUrlName: storeUrl,
      timestamp: new Date().toISOString(),
    });
  }

  // Set/update device-level people profile
  public setDevicePeopleProps(storeId: string) {
    mixpanel.people.set({
      $last_seen: new Date().toISOString(),
    });
    mixpanel.people.union("$storeIdsVisited", [storeId]);
    mixpanel.people.increment("Total Users");
  }

  // Track when a loop is visited
  public trackLoopVisit(storeId: string, loopId?: string, deviceId?: string) {
    mixpanel.track("Loop Visit", {
      storeId,
      loopId,
      timestamp: new Date().toISOString(),
      deviceId,
    });
  }
}
