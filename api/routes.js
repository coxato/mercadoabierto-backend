// set routes to app
const authRoutes = require("./components/auth/network");
const userRoutes = require("./components/user/network");
const productRoutes = require("./components/product/network");
const cartRoutes = require("./components/cart/network");

function useRoutes(app) {
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/cart', cartRoutes);
}

module.exports = useRoutes;