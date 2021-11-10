import Koa from "koa";
import KoaBody from "koa-body";
import { router } from "../main/router";
import { Config } from "../../config";
import { taskEvent } from "./events";


const app = new Koa();

app.use(KoaBody());

app.use(router.routes())
    .use(router.allowedMethods);

app.listen(Config.backup_listen_port(), Config.backup_listen_host, () => {
   console.log(`[backup] Backup Server started @ ${Config.backup_listen_host}:${Config.backup_listen_port()}, standby...`);
   taskEvent.emit('heartbeat');
});

