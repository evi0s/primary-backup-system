import Router from "@koa/router";
import { Config } from "../../config";
import { Context } from "koa";
import { promises } from "fs";

const router = new Router();

router.get("/sequence", async (ctx: Context) => {
    let data: number;
    try {
        data = parseInt((await promises.readFile(Config.db_path)).toString());
    } catch (e) {
        ctx.status = 500;
        return ctx.body = {message: "internal server error"};
    }

    console.debug(`[app] current sequence: ${data}`);

    if (Number.isNaN(data)) {
        ctx.status = 500;
        return ctx.body = {message: "corrupted database"};
    }

    data = data + 1;

    try {
        await promises.writeFile(Config.db_path, new String(data));
    } catch (e) {
        console.error(`[app] got exception: ${e}`);
        ctx.status = 500;
        return ctx.body = {message: "internal server error"};
    }

    console.debug(`[app] got request, returning ${data}`);

    return ctx.body = {message: data};
});

router.get("/ping", async (ctx: Context) => {
    return ctx.body = {message: "pong"};
});


export {
    router
}

