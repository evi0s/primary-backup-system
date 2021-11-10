import { EventEmitter } from "events";
import { Config } from "../../config";
import axios from "axios";

class TaskEvent extends EventEmitter {};

const taskEvent = new TaskEvent();

let globalInterval: NodeJS.Timer;

taskEvent.on('charge', async () => {
    clearInterval(globalInterval);
    try {
        await axios({
            url: `http://${Config.rproxy_listen_host}:${Config.rproxy_listen_port()}/upstream`,
            method: "PATCH",
            data: {
                upstreamHost: Config.backup_listen_host,
                upstreamPort: Config.backup_listen_port(),
                updateKey: Config.shared_update_key
            },
            headers: {
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            timeout: 5000
        });
    } catch (e) {
        console.error(`[backup charge] error in updating rproxy upstream: ${e}`);
        return;
    }

    console.log(`[backup charge] rproxy upstream updated`);
});

taskEvent.on('heartbeat', async () => {
    globalInterval = setInterval(async () => {
        try {
            const heartbeatResponse = await axios({
                url: `http://${Config.main_listen_host}:${Config.main_listen_port()}/ping`,
                method: "GET",
                responseType: "json",
                headers: {
                    "Pragma": "no-cache",
                    "Cache-Control": "no-cache"
                },
                timeout: 5000
            });

            console.debug(`[backup debug] got response from main server: ${heartbeatResponse.data.message}`);

            if (heartbeatResponse.data.message !== "pong") {
                throw new Error("invalid response from main server");
            }

            console.log(`[backup heartbeat] got pong from main server, standby`);
        } catch (e) {
            console.error(`[backup heartbeat] main server is down, take in charge...`);
            taskEvent.emit('charge');
        }
    }, Config.heartbeat_interval());
});

export {
    taskEvent
}

