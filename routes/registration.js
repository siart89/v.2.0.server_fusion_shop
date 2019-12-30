/* eslint-disable no-console */
import { Router } from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import { validationResult, check } from 'express-validator';
import db from '../models';

const router = Router();
const { User } = db;
const jsonParser = bodyParser.json();

// New User Registration
router.post(
  '/users/registration',
  [
    check('mail', 'Неверный email').isEmail(),
    check('password', 'Пароль должен быть больше 6 символов').isLength({
      min: 6,
    }),
  ],
  jsonParser,
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    try {
      const err = validationResult(req);

      if (!err.isEmpty()) {
        return res.status(422).json({
          erros: err.array(),
        });
      }
      const hashPass = await bcrypt.hash(req.body.password, 8);

      const match = await User.findOne({
        where: {
          mail: req.body.mail,
        },
      });

      if (match) {
        return res.status(400).send({ message: 'Пользователь с такой почтой уже зарегистрирован' });
      }

      await User.create({ ...req.body, password: hashPass });
      res.json({ message: 'Успешно зарегистрирован' });
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  },
);

module.exports = router;
