const mongoose = require('mongoose');

const uri = 'mongodb+srv://mamun65:0pwAa8ijzmr6vr3G@sfc-records.le2j0.mongodb.net/myDatabaseName?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));
