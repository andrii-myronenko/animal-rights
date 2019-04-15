import Router from 'koa-router';

const router = new Router();

router.get('/*', async (ctx) => {
    ctx.body = 'Hello World!';
});

export { router as userRouter }