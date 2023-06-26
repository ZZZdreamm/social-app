export function reconnectFunction(func: Function) {
  return function () {
    func()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
        setTimeout(() => {
          reconnectFunction(func);
        }, 1000);
      });
  };
}
