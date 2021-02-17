const {
  getAuthors,
  addNewAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  login,
  logout,
} = require("../controllers/authorController");
const { authorize } = require("../controllers/authMiddleware");

const routes = (app) => {
  app.route("/authors").get(authorize, getAuthors);

  app
    .route("/authors/:authorId")
    .get(authorize, getAuthorById)
    .put(authorize, updateAuthor)
    .delete(authorize, deleteAuthor);

  app.route("/register").post(addNewAuthor);
  app.route("/login").post(login);
  app.route("/logout").post(logout);
};

module.exports = routes;
