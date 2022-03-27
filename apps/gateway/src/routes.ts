import { Options } from "http-proxy-middleware";

interface Route {
  url: string;
  auth: boolean;
  proxy: Options;
}

const routes: Route[] = [
  {
    url: "/auth",
    auth: false,
    proxy: {
      target: "http://localhost:3002",
      pathRewrite: {
        [`^/auth`]: "",
      },
    },
  },
  {
    url: "/message",
    auth: true,
    proxy: {
      target: "http://localhost:3003",
      changeOrigin: true,
      pathRewrite: {
        [`^/message`]: "",
      },
    },
  },
];

export default routes;
