const mongoose = require("mongoose");
const AuthorSchema = require("../models/authorModel");
const Author = mongoose.model("Author", AuthorSchema);

const getAuthors = async (req, res, next) => {
  const author = await Author.find({});
  if (author.length !== 0) {
    res.status(200).send(author);
  } else {
    let error = new Error();
    error.httpStatusCode = 404;
    next(error);
  }
};

const addNewAuthor = async (req, res, next) => {
  let newAuthor = new Author(req.body);
  newAuthor.save((err, author) => {
    if (err) {
      res.send(err);
    }
    res.json(author);
  });
};

const getAuthorById = async (req, res, next) => {
  const author = await Author.findById(req.params.authorId);
  if (author) {
    res.status(200).send(author);
  } else {
    let error = new Error();
    error.httpStatusCode = 404;
    next(error);
  }
};

const updateAuthor = (req, res, next) => {
  Author.findOneAndUpdate(
    { _id: req.params.authorId },
    req.body,
    { new: true, useFindAndModify: false },
    (err, author) => {
      if (err) {
        res.send(err);
      }
      res.json(author);
    }
  );
};

const deleteAuthor = (req, res, next) => {
  Author.findOneAndDelete({ _id: req.params.authorId }, (err, author) => {
    if (err) {
      res.send(err);
    } else {
      res.send(`${req.params.authorId} deleted`);
    }
  });
};

module.exports = {
  getAuthors,
  getAuthorById,
  addNewAuthor,
  deleteAuthor,
  updateAuthor,
};
