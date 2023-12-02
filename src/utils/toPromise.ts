export const toPromise = (func: () => any): Promise<void> =>
  new Promise(async (resolve, reject) => {
    try {
      await func();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
