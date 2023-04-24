/**
 * @type {import('@remix-run/dev').AppConfig}
 */

module.exports = {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  serverBuildPath: "build/index.js",
  publicPath: "/build/",
};


// module.exports = {
//   ignoredRouteFiles: ["**/.*"],
//   future: {
//     v2_errorBoundary: true,
//     v2_normalizeFormMethod: true,
//     // v2_meta: true,
//     // v2_routeConvention: true,
//   },
// };


// module.exports = {
//   // ignoredRouteFiles: ["**/.*"],
//   // cacheDirectory: "./node_modules/.cache/remix",
//   ignoredRouteFiles: [".*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
//   appDirectory: "app",
//   browserBuildDirectory: "public/build",
//   assetsBuildDirectory: "public/build",
//   serverBuildPath: "build/index.js",
//   future: {
//     unstable_dev: true,
//     v2_routeConvention: true,
//   },
//   // just showing that you can customize this and it will work with the plugin
//   publicPath: "/build/",
// };
