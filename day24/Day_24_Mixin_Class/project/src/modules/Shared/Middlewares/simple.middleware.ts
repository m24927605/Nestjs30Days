export const SimpleMiddleware = (req, res, next) => {
    console.log('我是簡單的Middleware');
    next();
}