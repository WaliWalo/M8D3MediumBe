const mongoose = require("mongoose");
const AuthorSchema = require("../models/authorModel");
const Author = mongoose.model("Author", AuthorSchema);
const { authenticate } = require("./authTools");

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
  try {
    let newAuthor = new Author(req.body);
    await newAuthor.save();
    console.log("test", newAuthor.json());
    res.status(201).send(newAuthor.json());
  } catch (error) {
    console.log(error);
  }
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Author.findByCredentials(email, password);
    console.log(user);
    if (user === null) {
      res.status(404).send({ error: "user not found" });
    } else if (user.error) {
      res.status(403).send(user);
    } else {
      const token = await authenticate(user);
      res.status(201).send(token);
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.send();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAuthors,
  getAuthorById,
  addNewAuthor,
  deleteAuthor,
  updateAuthor,
  login,
  logout,
};
