/* eslint-disable consistent-return */
import { Router } from 'express';
import bodyParser from 'body-parser';
import db from '../models';

const {
  Book,
  Comment,
  Sequelize,
} = db;
const router = Router();
const { Op } = Sequelize;
const jsonParser = bodyParser.json();

// Calculate and set book rating
const calcBookRating = (arr) => {
  const ratingSum = arr.reduce((sum, cur) => sum + cur.rating, 0);
  return ratingSum / arr.length;
};

const setRating = async (bookId) => {
  try {
    const rating = await Comment.findAll({
      where: {
        BookId: bookId,
        rating: {
          [Op.ne]: 0,
          [Op.ne]: null,
        },
      },
      raw: true,
    });
    const bookRating = Math.floor(calcBookRating(rating) * 10) / 10;

    await Book.update({
      rating: bookRating,
    }, {
      where: {
        id: bookId,
      },
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};


router.get('/book/card/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    setRating(req.params.id);
    res.status(200).json(book.dataValues);
  } catch (e) {
    res.sendStatus(500);
  }
});

// ADD Comment to DB
router.post('/book/comment', jsonParser, async (req, res) => {
  const comment = {
    BookId: req.body.bookId,
    text: req.body.text,
    authorName: req.body.author,
    rating: req.body.rating,
  };
  try {
    await Comment.create(comment);
    setRating(comment.BookId);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
    // eslint-disable-next-line no-console
    console.log(e);
  }
});

router.get('/book/comment/book/:id', async (req, res) => {
  try {
    const data = await Comment.findAll({
      where: {
        BookId: req.params.id,
      },
      raw: true,
    }, {
      order: [['createdAt', 'DESC']],
    });
    if (data) {
      setRating(req.params.id);
      return res.status(200).json(data);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
