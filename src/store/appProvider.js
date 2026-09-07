import { useState } from "react";

import AppContext from "./appContext";

import deviceMock from "../mock/device";

import userMock from "../mock/user";

export default function AppProvider({
  children,
}) {
  const [device, setDevice] = useState(deviceMock);

  const [user, setUser] = useState(userMock);

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <AppContext.Provider
      value={{
        device,
        setDevice,

        user,
        setUser,

        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}