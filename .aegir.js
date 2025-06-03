/** @type {import('aegir').PartialOptions} */
export default {
  build: {
    bundlesizeMax: '100KB'
  },
  test: {
    config: {
      tsconfig: 'tsconfig.test.json'
    }
  },
  lint: {
    files: ['src/**/*.ts', 'test/**/*.ts']
  }
}
