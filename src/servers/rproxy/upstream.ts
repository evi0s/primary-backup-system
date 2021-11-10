import { Config } from "../../config";

export let upstream = {
    upstreamHost: Config.main_listen_host,
    upstreamPort: Config.main_listen_port()
};

