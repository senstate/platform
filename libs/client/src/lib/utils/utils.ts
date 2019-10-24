export const mil = () => Date.now();

export function someGuid () {
  // const var needed or else ng-packagr doesn't accept it
  const uuid = 'yxxyxyyyxxxyyx'.replace(/[xy]/g, (c) => {
    // tslint:disable-next-line:no-bitwise
    const r = Math.random() * 16 | 0;
    // tslint:disable-next-line:no-bitwise
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  return uuid;
}
