const {
  getAuthors,
  addNewAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

const routes = (app) => {
  app.route("/authors").get(getAuthors).post(addNewAuthor);

  app
    .route("/authors/:authorId")
    .get(getAuthorById)
    .put(updateAuthor)
    .delete(deleteAuthor);
};

module.exports = routes;
