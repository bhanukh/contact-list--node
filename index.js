const express= require('express');
const path= require('path');
 const port =3000;
 const db= require('./config/mongoose');
 const contact= require('./models/contacts');
 const app =express();
 const bodyParser = require('body-parser');
const Contact = require('./models/contacts');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: false}));

var contactList=[
    {
        name:'bhanu',
        phone:'789545855'
    },
    {
        name:'bhanu kh',
        phone:'7895458ss55'
    }
]

 app.get('/home',function(req, res){
   Contact.find({}, function(err, contacts){
    if(err){
        console.log('error in db');
        return;
    }
    return res.render('home',{
        title:'contact-List',
    contact_list:contacts
   })
   
 })
 })
 app.post('/home', function(req, res){
    //contactList.push(req.body)
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    } ,function(err, newContact){
        if(err){
            console.log(err);
            return;
        }
        console.log('******.',newContact)
        res.redirect('home')
    })
    
 })

 app.get('/delete-contact', function(req, res){
    let id=req.query.id;
//     let contactIndex= contactList.findIndex(contact => contact.phone==phone);
// if(contactIndex != -1){
//     contactList.splice(contactIndex,1);
Contact.findByIdAndDelete(id, function(err){
    if(err){
        console.log('error in finding id');
        return;
    }
    return res.redirect('back');
})

 })

 app.listen(port, function(err){
    if(err)
    console.log('error',err)

    console.log('app is running on the port:',port)
 })