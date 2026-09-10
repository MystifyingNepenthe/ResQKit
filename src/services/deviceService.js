export async function connectDevice() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        connected: true,
      });
    }, 1500);
  });
}

export async function disconnectDevice() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        connected: false,
      });
    }, 1000);
  });
}