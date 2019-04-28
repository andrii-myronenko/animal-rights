import Router from 'koa-router';
import views from 'co-views';

const render = views("public", { map: { html: 'swig' }});

const router = new Router();

router.all('/', async (ctx) => {
    ctx.body = render("index");
});

export { router as userRouter };