import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import adminRoutes from './routes/admin.js';
import productRoutes from './routes/product.js'
import saleRoutes from './routes/sale.js'
import cookieParser from 'cookie-parser';

// import dotenv from 'dotenv';
// import morgan from 'morgan';
// dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
  origin: "https://groove-client.vercel.app"
}));
const MONGODB_URI="mongodb+srv://pugalkmc:pugalsaran143@cluster0.dnr2yma.mongodb.net"
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// app.use(morgan())

app.use((req, res ,next) => {
  console.log(`${req.method} ${req.path} ${req.params}`)
  next();
})

function checkAuthentication(req, res, next) {
  const token = req.cookies.email;
  if (!token) {
      return res.status(401).json({message:"User not authenticated"})
  }

  jwt.verify({'email':'email'}, 'jwt-secret-key', (err, decoded) => {
      if (err) {
          return res.status(401).json({ message:"User not authenticated"})
      }
      req.name = decoded.name;
      return
  });
}

// Use cookie-parser middleware to parse cookies
app.use(cookieParser());

// Protected route that requires authentication
app.get('/protected', checkAuthentication, (req, res) => {
  res.json({ message: 'You are authenticated!', user: req.user });
});

// Use admin routes
app.use('/admin', adminRoutes);
app.use('/product', productRoutes);
app.use('/sale', saleRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
