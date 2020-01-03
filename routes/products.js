import { Router } from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import db from '../models';
import upload from '../storage';

const { url } = config.get('variables');

const { Book, Sequelize } = db;
const { Op } = Sequelize;
const jsonParser = bodyParser.json();
const router = Router();

router.post('/cover', upload.single('cover'), (req, res) => {
  const mypath = `${url}/resources/${req.file.filename}`;
  res.status(200).json({ path: mypath });
});

router.post('/add/product', jsonParser, async (req, res) => {
  try {
    await Book.create(req.body);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.use('/news', async (req, res) => {
  const maxDate = new Date();
  const minDate = new Date(maxDate - (60 * 60 * 24 * 1000));
  try {
    const data = await Book.findAll({
      where: {
        createdAt: {
          [Op.lt]: maxDate,
          [Op.gte]: minDate,
        },
      },
      raw: true,
    });
    res.status(200).json(data);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
