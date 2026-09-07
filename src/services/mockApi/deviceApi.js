import device from "../../mock/device";

export async function getDevice() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(device);
    }, 500);
  });
}