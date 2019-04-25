import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Hello World!';
});

// router.post('/graphql', async (ctx, next) => {
//     console.log(ctx.state);
//     return next();
// });

export { router as userRouter };