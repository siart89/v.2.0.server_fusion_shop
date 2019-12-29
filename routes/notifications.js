import { Router } from 'express';
import db from '../models';

const router = Router();
const {
  Comment,
  Book,
  User,
  sequelize,
} = db;


// Set that the new comment was read
router.use('/check/book:bookId', async (req, res) => {
  const { bookId } = req.params;
  try {
    Comment.update({
      isRead: true,
    }, {
      where: {
        BookId: bookId,
      },
    });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

// Geting comments wich have status is_read = false
router.use('/user:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Book.findAll({
      where: {
        UserId: id,
      },
      include: [{
        model: Comment,
        where: {
          isRead: false,
        },
      }],
    });
    // console.log(data);
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
