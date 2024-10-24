const authRouter = require("./auth");
const userRouter = require("./user");
const productRouter = require("./product");

function route(app) {
    app.use("/v1/auth", authRouter);
    app.use("/v1/user", userRouter);
    app.use("/v1/app/products", productRouter);
}
module.exports = route;
