import { EventEmitter } from "events";
import { Config } from "../../config";
import axios from "axios";

class TaskEvent extends EventEmitter {};

const taskEvent = new TaskEvent();

taskEvent.on('charge', async () => {
    try {
        await axios({
            url: `http://${Config.rproxy_listen_host}:${Config.rproxy_listen_port()}/upstream`,
            method: "PATCH",
            data: {
                upstreamHost: Config.main_listen_host,
                upstreamPort: Config.main_listen_port()
            },
            headers: {
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            timeout: 5000
        });
    } catch (e) {
        console.error(`[main charge] error in updating rproxy upstream: ${e}`);
        return;
    }

    console.log(`[main charge] rproxy upstream updated`);
});


export {
    taskEvent
}

