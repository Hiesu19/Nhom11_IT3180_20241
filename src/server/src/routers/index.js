const authRouter = require("./auth");
const userRouter = require("./user");
const productRouter = require("./product");
const dashboardRouter = require("./dashboard");
const notificationRouter = require("./notification");
const paymentRouter = require("./payment");

function route(app) {
    app.use("/v1/auth", authRouter);
    app.use("/v1/user", userRouter);
    app.use("/v1/app/products", productRouter);
    app.use("/v1/app/dashboard", dashboardRouter);
    app.use("/v1/app/notification", notificationRouter);
    app.use("/v1/app/payment", paymentRouter);
}
module.exports = route;