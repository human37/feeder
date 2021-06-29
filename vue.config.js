module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "simple feeder";
      args[0].meta = {
        viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui",
      };

      return args;
    });
  },
};
