export class Config {

    public static main_listen_host = process.env.MAIN_LISTEN_HOST || '127.0.0.1';
    public static backup_listen_host = process.env.BACKUP_LISTEN_HOST || '127.0.0.1';
    public static rproxy_listen_host = process.env.BACKUP_LISTEN_HOST || '0.0.0.0';

    public static main_listen_port = (): number => {
        if (process.env.MIAN_LISTEN_PORT) {
            return parseInt(process.env.MAIN_LISTEN_PORT || "")
        }
        return 61081;
    }

    public static backup_listen_port = (): number => {
        if (process.env.BACKUP_LISTEN_PORT) {
            return parseInt(process.env.BACKUP_LISTEN_PORT || "")
        }
        return 61082;
    }

    public static rproxy_listen_port = (): number => {
        if (process.env.RPROXY_LISTEN_PORT) {
            return parseInt(process.env.RPROXY_LISTEN_PORT || "")
        }
        return 61080;
    }

    public static heartbeat_interval = (): number => {
        if (process.env.HEARTBEAT_INTERVAL) {
            return parseInt(process.env.HEARTBEAT_INTERVAL || "")
        }
        return 1000;
    }

    public static db_path = process.env.DB_PATH || `${process.cwd()}/db.txt`;

    public static shared_update_key = process.env.SHARED_KEY || 'thesearerandomlychosedwordsbyme';

}

