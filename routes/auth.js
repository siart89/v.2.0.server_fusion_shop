/* eslint-disable consistent-return */
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import db from '../models';

const jsonParser = bodyParser.json();
const secretKey = process.env.SECRET_KEY;

const { Session, User } = db;

const router = Router();

const makeNewSession = async (req, next, name, id) => {
  try {
    const refreshToken = jwt.sign({
      id,
      name,
      ip: req.ip,
      os: req.useragent.os,
    },
    secretKey,
    { algorithm: 'HS256', expiresIn: '72h' });

    await Session.beforeCreate(() => {
      Session.destroy({
        where: {
          UserId: id,
        },
      });
    });

    await Session.create({
      name,
      ip: req.ip,
      os: req.useragent.os,
      UserId: id,
      userAgent: req.useragent.source,
      refreshToken,
    });

    const token = jwt.sign({
      id,
      ip: req.ip,
      os: req.useragent.os,
    },
    secretKey,
    { algorithm: 'HS256', expiresIn: '3s' });

    // eslint-disable-next-line require-atomic-updates
    req.userInfo = {
      token,
      name,
      refreshToken,
      id,
    };
    next();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

const authenticationUser = async (req, res, next) => {
  try {
    const data = await User.findOne({
      where: {
        mail: req.body.mail,
      },
    });
    if (data.dataValues) {
      const passWord = await bcrypt.compare(req.body.password, data.dataValues.password);
      if (passWord) {
        makeNewSession(req, next, data.dataValues.name, data.dataValues.id);
      } else {
        return res.sendStatus(400);
      }
    } else {
      throw new Error('User had not created');
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.sendStatus(403);
  }
};

const checkToken = async (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    const token = req.headers.authorization.split(' ')[1];
    const refreshToken = req.headers.authorization.split(' ')[2];
    try {
      const encoded = await jwt.verify(token, secretKey, { algorithm: 'HS256' });
      // eslint-disable-next-line require-atomic-updates
      req.id = encoded.id;
      next();
    } catch (e) {
      try {
        const encod = await jwt.verify(refreshToken, secretKey, { algorithm: 'HS256' });
        const {
          ip,
          id,
          name,
          os,
        } = encod;
        const session = await Session.findOne({
          where: {
            UserId: id,
            refreshToken,
          },
        });
        if (session.dataValues) {
          if (ip === req.ip && os === req.useragent.os) {
            makeNewSession(req, next, name, id);
            // eslint-disable-next-line require-atomic-updates
            req.id = encod.id;
          }
        } else {
          throw new Error('User has no exist');
        }
      } catch (er) {
        // eslint-disable-next-line no-console
        console.log(er);
        res.sendStatus(403);
      }
    }
  }
};

router.post('/login', jsonParser, authenticationUser, (req, res) => {
  res.json(req.userInfo);
});

router.use('/verify', checkToken, async (req, res) => {
  try {
    const avatar = await User.findOne({
      where: {
        id: req.id,
      },
      attributes: ['avatar'],
    });
    if (req.userInfo) {
      return res.status(200).json({
        token: req.userInfo.token,
        refreshToken: req.userInfo.refreshToken,
        avatar: avatar.dataValues.avatar,
      });
    }
    return res.status(200).json(avatar.dataValues);
  } catch (e) {
    // eslint-disable-next-line no-console
    res.sendStatus(500);
    console.log(e);
  }
});

module.exports = router;
