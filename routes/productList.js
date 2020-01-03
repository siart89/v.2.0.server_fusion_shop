import { Router } from 'express';
import bodyParser from 'body-parser';
import db from '../models';

const jsonParser = bodyParser.json();
const router = Router();

const { Book, Sequelize, sequelize } = db;
const { Op } = Sequelize;


const calcOffset = (off, max) => {
  if (+off > 1) return (off - 1) * max;
  return 0;
};

const getsResult = async (req, res, next) => {
  const offset = calcOffset(req.body.pageNum, req.body.limit);
  let result;

  try {
    const customWhere = {
      sale: req.body.sale,
    };
    if (req.body.category) {
      customWhere.category = {
        [Op.iLike]: req.body.category,
      };
    }
    if (req.query.q) {
      customWhere[Op.or] = [
        {
          author: {
            [Op.iLike]: `%${req.query.q}%`,
          },
        },
        {
          title: {
            [Op.iLike]: `%${req.query.q}%`,
          },
        },
      ];
    }
    if (req.body.cost.min) {
      customWhere.price = {
        [Op.between]: [req.body.cost.min, req.body.cost.max],
      };
    }

    result = await Book.findAll({
      where: customWhere,
      raw: true,
      offset,
      limit: req.body.limit,
      order: [[req.body.sort, req.body.incDec]],
    });
    const count = await Book.findAll({
      where: customWhere,
    });

    const data = {
      product: result,
      count: count.length,
    };
    // eslint-disable-next-line require-atomic-updates
    req.data = data;
    next();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
  }
};

router.get('/product/headers', async (req, res) => {
  try {
    // this two for experimet with quick search
    const titles = await Book.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('title')), 'title'],
      ],
      raw: true,
    });
    const authors = await Book.findAll({
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('author')), 'author'],
      ],
      raw: true,
    });
    const headers = [...titles.map((item) => item.title), ...authors.map((item) => item.author)];
    res.status(200).json(headers);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/product/max/price', async (req, res) => {
  try {
    const book = await Book.findAll();
    if (book) {
      const data = await Book.findOne({
        attributes: [
          [sequelize.fn('max', sequelize.col('price')), 'max'],
        ],
        raw: true,
      });
      res.status(200).json(data);
    } else {
      res.sendStatus(403);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/products/all', jsonParser, getsResult, (req, res) => {
  if (!req.data) {
    res.status(200).json([]);
  } else {
    res.status(200).json(req.data);
  }
});

module.exports = router;
