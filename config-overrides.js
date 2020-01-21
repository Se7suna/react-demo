const path = require('path')
const { override, fixBabelImports, addLessLoader, addWebpackPlugin, addWebpackAlias } = require('customize-cra')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#13c2c2' },
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "./src"),
  }),
  addWebpackPlugin(new AntdDayjsWebpackPlugin())
)
