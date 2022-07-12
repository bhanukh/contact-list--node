const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/contact_list_db');

const db= mongoose.connection;
db.on('err', console.error.bind(console,'error to connecting db'));
db.once('open', function(){
    console.log('successfuly connected to db');
})