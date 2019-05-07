import Router from 'koa-router';
import views from 'co-views';
import path from "path";

const distPath = path.join(process.cwd(), "../../dist");

const render = views(distPath, { map: { html: 'swig' }});

const router = new Router();

router.all('*', async (ctx) => {
    try{
        ctx.body = await render("index");
    }
    catch(e){
        ctx.body = e;
    }
});

export { router as userRouter };