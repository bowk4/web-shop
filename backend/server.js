const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const globalConfigs = require('./routes/globalConfigs');
const customers = require('./routes/customers');
const catalog = require('./routes/catalog');
const products = require('./routes/products');
const colors = require('./routes/colors');
const sizes = require('./routes/sizes');
const filters = require('./routes/filters');
const subscribers = require('./routes/subscribers');
const cart = require('./routes/cart');
const orders = require('./routes/orders');
const links = require('./routes/links');
const pages = require('./routes/pages');
const slides = require('./routes/slides');
const wishlist = require('./routes/wishlist');
const comments = require('./routes/comments');
const shippingMethods = require('./routes/shippingMethods');
const paymentMethods = require('./routes/paymentMethods');
const partners = require('./routes/partners');
const mobileFilters = require('./routes/mobileFilters');
const mobileModels = require('./routes/mobileModels');
const mobileProducts = require('./routes/mobileProducts');
const mobileModelsQuantity = require('./routes/mobileModelsQuantity');
const accessoriesProduct = require('./routes/accessoriesProduct');
const accessoriesModel = require('./routes/accessoriesModel');
const accessoriesModelQuantity = require('./routes/accessoriesModelQuantity');
const tabletModels = require('./routes/tabletModels');
const tabletProducts = require('./routes/tabletProducts');
const tabletModelQuantity = require('./routes/tabletModelsQuantity');
const advertisingSlider = require('./routes/advertisingSlider');
const faqchat = require('./routes/faqchat');
const brandnew = require ('./routes/brandNews');
const salePoints = require ('./routes/salePoints');
const notifyMeAuthorized = require('./routes/notifyMeAuthorized');
const notifyMeUnauthorized = require('./routes/notifyMeUnauthorized');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI,)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./services/passport')(passport);

// Use Routes
app.use('/api/configs', globalConfigs);
app.use('/api/customers', customers);
app.use('/api/catalog', catalog);
app.use('/api/products', products);
app.use('/api/colors', colors);
app.use('/api/sizes', sizes);
app.use('/api/filters', filters);
app.use('/api/subscribers', subscribers);
app.use('/api/cart', cart);
app.use('/api/orders', orders);
app.use('/api/links', links);
app.use('/api/pages', pages);
app.use('/api/slides', slides);
app.use('/api/wishlist', wishlist);
app.use('/api/comments', comments);
app.use('/api/shipping-methods', shippingMethods);
app.use('/api/payment-methods', paymentMethods);
app.use('/api/partners', partners);
app.use('/api/phones-filters', mobileFilters);
app.use('/api/phones-models', mobileModels);
app.use('/api/phones', mobileProducts);
app.use('/api/phones-models-quantity', mobileModelsQuantity);
app.use('/api/accessories', accessoriesProduct);
app.use('/api/accessories-models', accessoriesModel);
app.use('/api/accessories-models-quantity', accessoriesModelQuantity);
app.use('/api/tablets-models', tabletModels);
app.use('/api/tablets', tabletProducts);
app.use('/api/tablets-models-quantity', tabletModelQuantity);
app.use('/api/advertising-sliders', advertisingSlider);
app.use('/api/faq', faqchat);
app.use('/api/brand-news', brandnew);
app.use('/api/sale-points', salePoints);
app.use('/api/notify-me-authorized', notifyMeAuthorized);
app.use('/api/notify-me-unauthorized', notifyMeUnauthorized);





// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
