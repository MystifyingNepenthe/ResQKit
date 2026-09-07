import { useState } from "react";

import AppContext from "./appContext";

import deviceMock from "../mock/device";
import userMock from "../mock/user";
import vehicleMock from "../mock/vehicle";

export default function AppProvider({ children }) {
  const [device, setDevice] = useState(deviceMock);

  const [user, setUser] = useState(userMock);

  const [vehicle, setVehicle] = useState(vehicleMock);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider
      value={{
        device,
        setDevice,

        user,
        setUser,

        vehicle,
        setVehicle,

        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}