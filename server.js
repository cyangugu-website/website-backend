const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const imagesDir = path.join(__dirname, 'app/storage/gallery-pics');

require(path.join(__dirname, './app/config/database'))

const app = express();

const userRoutes = require(path.join(__dirname, './app/routes/user.route'))
const titleRoutes = require(path.join(__dirname, './app/routes/title.routes'))
const staffRoutes = require(path.join(__dirname, './app/routes/staff.routes'))

app.use(bodyParser.json());
app.use(cors({
  origin: 'https://website-backend-ofux.onrender.com'
}));
app.use(express.urlencoded({ extended:true }))

app.use('/images', express.static(imagesDir))
app.use('/user', userRoutes);
app.use('/title', titleRoutes);
app.use('/staff', staffRoutes)

app.get("/", (req,res) => {
  res.send("Welcome to the backend APIs")
})

app.get('/images-list', (req,res) => {
  fs.readdir(imagesDir, (err, files) => {
    if(err) { console.error('Error reading images directory:', err);

      return res.status(500).send('Error reading images directory')
    }

    const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
    res.json(images);
  })
})

app.post('/send-message', async (req, res) => {
  const { firstName, email, subject, message } = req.body;
  console.log(req.body);

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'socialmediaearcyangugu@gmail.com',
        pass: 'lkbdugmstfqirwdl', // Your email password
      }, 
    });

    const mailOptions = {
      from: `${email}`, // Your email
      to: 'socialmediaearcyangugu@gmail.com', // Recipient's email
      subject: `${subject}`,
      text: `${firstName} sent a message: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while sending the message' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
