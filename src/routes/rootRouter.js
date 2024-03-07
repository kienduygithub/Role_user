import userRouter from './userRouter';
import groupRouter from './groupRouter';
import roleRouter from './roleRouter';
const configWebRoutes = (app) => {

    app.use('/api', userRouter);
    app.use('/api', groupRouter);
    app.use('/api', roleRouter);
    app.get('/', (req, res) => {
        return res.render('user');
    });
}

export default configWebRoutes;