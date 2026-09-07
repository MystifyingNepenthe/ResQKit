export default function formatBattery(value) {
  if (value == null) {
    return "--";
  }

  return `${value}%`;
}