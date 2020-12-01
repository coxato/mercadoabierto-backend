// set routes to app
const userRoutes = require("./components/user/network");

function useRoutes(app) {
    app.use('/api/users', userRoutes);
}

module.exports = useRoutes;