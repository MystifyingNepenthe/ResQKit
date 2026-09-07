import DeviceCard from "../../components/home/deviceCard";

import useApp from "../../hooks/useApp";

export default function DeviceSection() {

  const { device } = useApp();

  return (
    <DeviceCard
      connected={device.connected}
      battery={device.battery}
    />
  );
}