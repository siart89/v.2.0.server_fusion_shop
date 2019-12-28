import express from 'express';
import useragent from 'express-useragent';
import path from 'path';


const PORT = process.env.PORT || 5000;

const app = express();
app.use(useragent.express());
app.use('/reg', require('./routes/registration'));
app.use('/auth', require('./routes/auth'));
app.use('/api/prod', require('./routes/products'));
app.use('/api/list', require('./routes/productList'));
app.use('/api/info', require('./routes/prodInfo'));
app.use('/api/profile', require('./routes/profileInfo'));
app.use('profile/favor', require('./routes/favor'));
app.use('/profile/notifications', require('./routes/notifications'));

app.use('/resources', express.static(path.join(__dirname, 'uploads')));
app.get(express.static(path.join(__dirname, '/client/public')));
app.listen(PORT, (e) => {
  if (e) {
    console.log(e.message);
  } else {
    console.log('Server has been started on port:', PORT);
  }
});
