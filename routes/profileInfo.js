import { Router } from 'express';
import config from 'config';
import storage from '../storage';
import db from '../models';


const { url } = config.get('variables');
const { User, Book } = db;
const router = Router();

const setUrl = async (req, res, next) => {
  // path for local server
  const mypath = `${url}/${req.file.filename}`;
  req.avatarPath = mypath;
  try {
    await User.update({
      avatar: mypath,
    }, {
      where: {
        id: req.params.id,
      },
    });
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(403);
  }
};


router.post('/avatar/:id', storage.single('avatar'), setUrl, (req, res) => {
  res.status(200).json({ url: req.avatarPath });
});

router.get('/user/:id/booklist', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Book.findAll({
      where: {
        UserId: id,
      },
      raw: true,
    });
    res.json(data);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
