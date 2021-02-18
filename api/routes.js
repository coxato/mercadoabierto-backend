// set routes to app
const authRoutes = require("./components/auth/network");
const userRoutes = require("./components/user/network");
const productRoutes = require("./components/product/network");
const cartRoutes = require("./components/cart/network");
const purchasesRoutes = require("./components/purchases/network");
const reawrdRoutes = require("./components/reward/network");

function useRoutes(app) {
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/cart', cartRoutes);
    app.use('/api/purchases', purchasesRoutes);
    app.use('/api/rewards', reawrdRoutes);
}

module.exports = useRoutes;