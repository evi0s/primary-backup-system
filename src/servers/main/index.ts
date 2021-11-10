import Koa from "koa";
import KoaBody from "koa-body";
import { router } from "./router";
import { Config } from "../../config";
import { taskEvent } from "./events";


const app = new Koa();

app.use(KoaBody());

app.use(router.routes())
    .use(router.allowedMethods);

app.listen(Config.main_listen_port(), Config.main_listen_host, () => {
   console.log(`[main] main server started @ ${Config.main_listen_host}:${Config.main_listen_port()}`);
   taskEvent.emit('charge');
});

