const handlePostgresErrors = (error, request, response, next) => {
  if (error.code === "22P02") {
    response.status(400).send({ msg: "Bad Request" });
  } else {
    next(error);
  }
};

const handleCustomErrors = (error, request, response, next) => {
  if (error.status) {
    response.status(error.status).send({ msg: error.msg });
  } else {
    next(error);
  }
};

const handleServerError = (error, request, response, next) => {
  response.status(500).send("Internal Server Error");
};

module.exports = {
  handlePostgresErrors,
  handleCustomErrors,
  handleServerError,
};
