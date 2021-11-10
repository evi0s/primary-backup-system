import Router from "@koa/router";
import { Config } from "../../config";
import { Context } from "koa";
import { upstream } from "./upstream";
import axios from "axios";

const router = new Router();

router.get("/sequence", async (ctx: Context) => {
    console.log(`[rproxy router] got request, dispatch to upstream`);
    try {
        const heartbeatResponse = await axios({
            url: `http://${upstream.upstreamHost}:${upstream.upstreamPort}/sequence`,
            method: "GET",
            responseType: "json",
            headers: {
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            timeout: 5000
        });

        console.log(`[rproxy router] got upstream response: ${heartbeatResponse.data.message}, returning to client`);

        return ctx.body = heartbeatResponse.data;
    } catch (e) {
        ctx.status = 500;
        return ctx.body = {message: "internal server error"};
    }
});

router.patch("/upstream", async (ctx: Context) => {
    console.log(`[rproxy router] got upstream update request`);

    if (ctx.request.body.updateKey !== Config.shared_update_key) {
        console.log(`[rproxy router] unauthorized update request`);
        ctx.status = 401;
        return ctx.body = {"message": "unauthorized"};
    }

    console.log(`[rproxy router] change upstream to ${ctx.request.body.upstreamHost}:${ctx.request.body.upstreamPort}`);
    upstream.upstreamHost = ctx.request.body.upstreamHost;
    upstream.upstreamPort = ctx.request.body.upstreamPort;

    ctx.status = 200;
    return ctx.body = {"message": "ok"};
});


export {
    router
}

