declare module 'regedit' {
  const regedit: {
    list<T extends string>(
      path: T,
      cb: (
        err: any,
        result: {
          [key in T]: {
            keys: string[],
            values: { [key: string]: any }
          }
        }
      ) => any
    ): void
  }
  export = regedit
}