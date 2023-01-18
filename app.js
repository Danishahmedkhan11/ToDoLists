const express= require('express')
const bodyParser= require('body-parser')
const app= express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static('public'));
var items=["Ice-cream",'pani-patase'];

app.get('/', function(req,res){
    var date=new Date();
    // var currentDay=date;
    // var day=""
    // var title=""
    var options={
        day:"numeric",
        month:"long",
        year:"numeric",
        weekday:"long",
    };
 
    var excatDate=date.toLocaleDateString('en-US',options);

    // if(currentDay===6 || currentDay === 0)
    // {   title="I know you happy";
    //     day="It is weekend. I guess you sleep well 🥱 "
    // }
    // else
    // {   title="I know you are in great pain";
    //     day="It is weekday. I guess you should go to work.😎 ";
    // }
    res.render('list',{
        newItems:items,
        todayDate:excatDate})

})

 app.post('/', function(req, res){
    var itm=req.body.item;
    var del=req.body.delete;


    console.log(itm);
    items.push(itm);
    console.log(items)
   
    // const arr=[]
    // arr.push(item)
    // res.render('list', {newItem:item});
    res.redirect('/');

 })

app.listen(8080,function(){
    console.log("Listen on the port");
});