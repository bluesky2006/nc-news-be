function handlePostgresErrors(error, request, response, next) {
  if (error.code === "22P02" || error.code === "23503") {
    response.status(400).send({ msg: "Bad Request" });
  } else {
    next(error);
  }
}

function handleCustomErrors(error, request, response, next) {
  if (error.status) {
    response.status(error.status).send({ msg: error.msg });
  } else {
    next(error);
  }
}

function handleServerError(error, request, response, next) {
  console.error("Console readout", error);
  response.status(500).send({ msg: "Internal Server Error" });
}

module.exports = {
  handlePostgresErrors,
  handleCustomErrors,
  handleServerError,
};
