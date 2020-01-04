import express from 'express';
import useragent from 'express-useragent';
import path from 'path';
import config from 'config';

const { port } = config.get('variables');

const app = express();
app.use(useragent.express());
app.use(express.json());
app.use('/reg', require('./routes/registration'));
app.use('/auth', require('./routes/auth'));
app.use('/api/prod', require('./routes/products'));
app.use('/api/list', require('./routes/productList'));
app.use('/api/info', require('./routes/prodInfo'));
app.use('/api/profile', require('./routes/profileInfo'));
app.use('/profile/favor', require('./routes/favor'));
app.use('/profile/notifications', require('./routes/notifications'));

app.use('/resources', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}


app.listen(port, (e) => {
  if (e) {
    console.log(e.message);
  } else {
    console.log('Server has started on port:', port);
  }
});
