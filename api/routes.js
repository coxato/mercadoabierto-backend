// set routes to app
const authRoutes = require("./components/auth/network");
const userRoutes = require("./components/user/network");

function useRoutes(app) {
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
}

module.exports = useRoutes;