// src/App.tsx (ou src/lib/initialStates.ts)

import { InterfaceStatus, LightBarrierStatus, LED, Motor } from "@/lib/types";

export const initialInterfaceStatus: InterfaceStatus = {
  leds: [
    { id: 1, status: "OFF", intensity: 0, lastChanged: "No Info" },
    { id: 2, status: "OFF", intensity: 0, lastChanged: "No Info"  },
    { id: 3, status: "OFF", intensity: 0, lastChanged: "No Info" },
    { id: 4, status: "OFF", intensity: 0, lastChanged: "No Info" },
  ],
  motors: [
    { id: 2, status: "OFF", speed: 0, direction: "CW", lastChanged: "No Info" },
    { id: 3, status: "OFF", speed: 0, direction: "CW", lastChanged: "No Info" },
    { id: 4, status: "OFF", speed: 0, direction: "CW", lastChanged: "No Info" },
  ],
  lightBarriers: [
    { id: 1, status: LightBarrierStatus.INACTIVE, lastChanged: "No Info" },
    { id: 2, status: LightBarrierStatus.INACTIVE, lastChanged: "No Info" },
    { id: 3, status: LightBarrierStatus.INACTIVE, lastChanged: "No Info" },
    { id: 4, status: LightBarrierStatus.INACTIVE, lastChanged: "No Info" },
  ],
};