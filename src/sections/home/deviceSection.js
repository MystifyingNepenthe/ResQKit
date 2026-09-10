import DeviceCard from "../../components/home/deviceCard";

import useApp from "../../hooks/useApp";

export default function DeviceSection({ navigation }) {
  const {
    device,
    setDevice,
  } = useApp();

  function handleResync() {
    const nextBattery =
      typeof device?.battery === "number"
        ? Math.max(1, Math.min(100, device.battery))
        : 82;

    setDevice({
      ...device,
      connected: true,
      battery: nextBattery,
      lastSync: new Date().toISOString(),
    });
  }

  return (
    <DeviceCard
      connected={device?.connected}
      battery={device?.battery}
      lastSync={device?.lastSync}
      onResync={handleResync}
      onConnect={() => navigation.navigate("ConnectDevice")}
    />
  );
}