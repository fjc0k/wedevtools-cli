export interface InvokeOptions {
  method: 'cli' | 'http',
  type: 'open' | 'login' | 'preview' | 'upload' | 'build-npm' | 'test',
  data: {},
}

export default function invoke(options: InvokeOptions = {}): any {

}
