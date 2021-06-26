const mongoose = require("mongoose");

mongoose
    .connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.nei2h.mongodb.net/projet-react', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })

    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));

const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/projet-react', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) {
    console.error('MongoDB connection error: ', err);
    // setTimeout( function(){ tryConnect(); }, 1000 );
  } else {
    console.log('MongoDB connexion Success');
    // afterConnection();
    // TODO updater l'objet connection dans les collections ?
  }
});