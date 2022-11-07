import express, { json } from "express";
import cors from 'cors';

let usersArray = [] 
let tweetsArray = []

const app = express();
app.use(cors());
app.use(json());

app.post('/sign-up',(req,res) => {
    const {username,avatar} = req.body

    if(!username || !avatar){
        res.status(422).send("Todos os campos são obrigatórios");
        return;
    }

    usersArray.push(req.body);
    res.status(201).send('OK')
})


app.get('/tweets',(req,res) => {
    console.log(req.body)
    const array = tweetsArray.map((object)=>{return(
        {username: object.username,
        tweet: object.tweet,
        avatar: usersArray.find((q)=>q.username==object.username).avatar})
    })
    console.log(array)
    res.send(array);
})


app.listen(5000);