type SomeFunctionReturnString = () => string;

function delay(f: SomeFunctionReturnString, seconds: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const cb = (): void => {
      try {
        const result = f();
        console.log(`after ${seconds} seconds`);
        resolve(result);
      } catch (error) {
        if (error instanceof Error) console.log(error.message ? error.message : null);
        reject(error);
      }
    };
    setTimeout(cb, seconds * 1000);
  });
}

const success = () => "successfully done";
const failed = () => {
  throw new Error("failed");
};

delay(success, 2)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
delay(failed, 2)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
