require('dotenv').config();

const express = require("express");
const cron = require("cron");
const swaggerUi = require("swagger-ui-express");

const cors = require("cors");

const specs = require("./config/swaggerConfig");

const { BadRequest, Unauthorized, Forbidden, InternalServerError, NotFound } = require('./errors');

class App {
  constructor() {
    this.app = express();
    this.port = 5000;
    this.registerMiddleware();
    this.registerRoutes();
    this.registerErrorHandlers();
    this.startServer();
    this.scheduleJobs();
  }

  registerMiddleware() {
    // Middlewares 등록
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors({ origin: "http://localhost:5000" }));
  }

  registerRoutes() {
    // Routes 등록
    // this.app.use("/api/users", usersRouter);
    // this.app.use("/posts", postsRouter);

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    this.app.use("/api/article",require("./controllers/articleController/article"));
    this.app.use("/api/auth", require("./controllers/auth"));
    this.app.use("/api/device", require("./controllers/device"));
    this.app.use("/api/plant", require("./controllers/plantController/plant"));
    this.app.use("/api/user", require("./controllers/user"));
  }

  registerErrorHandlers() {
    // 에러 핸들러 등록
    this.app.use((err, req, res, next) => {
      if (err instanceof BadRequest) {
        res.status(err.code).send({ message: err.message, errors: err.data });
        return;
      } else if (err instanceof Unauthorized) {
        res.status(err.code).send({ message: err.message, errors: err.data });
        return;
      } else if (err instanceof Forbidden) {
        res.status(err.code).send({ message: err.message, errors: err.data });
        return;
      } else if (err instanceof InternalServerError) {
        res.status(err.code).send({ message: err.message, errors: err.data });
        return;
      } else if (err instanceof NotFound) {
        res.status(err.code).send();
        return;
      } else {
        console.error(err);
        res.status(500).send({ message: 'INTERNAL_SERVER_ERROR' });
        return;
      }
    });
  }

  startServer() {
    // 서버 시작
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }

  scheduleJobs() {
    // cron 스케줄 등록
    const job = new cron.CronJob('*/1 * * * *', () => {
      console.log(`The time is now ${new Date()}`);
    });
    job.start();
  }
}

new App();

