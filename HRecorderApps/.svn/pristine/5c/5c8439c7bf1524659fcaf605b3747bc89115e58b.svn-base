// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        runtimePublicPath: true,
        antd: false,
        dva: {
          immer: true,
        },
        dynamicImport: true,
        title: 'HRecorderAPP',
        dll: false,
        pwa: false,
        routes: {
          exclude: [],
        },
        hardSource: true,
        hd: true,
        fastClick: true,
      },
    ],
  ],
  exportStatic: {
    htmlSuffix: true,
    dynamicRoot: true,
  },
};
