const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const host = `http://${process.env.IP}:${process.env.PORT}`;

const options = {
	swaggerDefinition: {
		title: "Food shop api",
		version: "1.0.0",
	},
	basePath: "/",
	apis: ["./routes/*.js", "./routes/admin/*.js"],
};

const spec = swaggerJsDoc(options);

module.exports = (app) => {
	app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));
};
