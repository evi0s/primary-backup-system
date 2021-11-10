import Koa from "koa";
import KoaBody from "koa-body";
import { router } from "./router";
import { Config } from "../../config";


const app = new Koa();

app.use(KoaBody());

app.use(router.routes())
    .use(router.allowedMethods);

app.listen(Config.rproxy_listen_port(), Config.rproxy_listen_host, () => {
   console.log(`[rproxy] rproxy server started @ ${Config.rproxy_listen_host}:${Config.rproxy_listen_port()}`);
});

