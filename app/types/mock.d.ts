declare module "mockjs" {
  interface Mock {
    mock(url: string | RegExp, type: string | string[], handler: (options: any) => any): void
    mock(url: string | RegExp, handler: (options: any) => any): void
  }
  const Mock: Mock
  export default Mock
}
