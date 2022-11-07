import express, { json } from "express";
import cors from 'cors';

let usersArray = [] 
let tweetsArray = []

const app = express();
app.use(cors());
app.use(json());

app.post('/sign-up',(req,res) => {
    const {username,avatar} = req.body
    const keysObject = Object.keys(req.body)
    const invalidKey = keysObject.find(e=>e!=='username'&&e!=='avatar')
    const usernameIsString = req.body.username.constructor === String
    const avatarIsString = req.body.avatar.constructor === String

    if(!username || !avatar){
        res.status(422).send("Todos os campos são obrigatórios");
        return;
    }


    if (!keysObject.length){
        res.status(400).send('O body esta vazio')
        return;
    }
    if(req.body.constructor !== Object){
        res.status(400).send('Formato inválido!')
        return;
    }
    if (invalidKey){
        res.status(400).send('Campo "'+invalidKey+'" inválido!')
        return;
    }
    if(!usernameIsString||!avatarIsString){
        res.status(400).send('Formato inválido!')
        return;
    }

    usersArray.push(req.body);
    res.status(201).send('OK')
})


app.post('/tweets',(req,res) => {
    const {username,tweet} = req.body
    const keysObject = Object.keys(req.body)
    const invalidKey = keysObject.find(e=>e!=='username'&&e!=='tweet')
    const usernameIsString = req.body.username.constructor === String
    const tweetIsString = req.body.tweet.constructor === String


    if(!username || !tweet){
        res.status(422).send("Todos os campos são obrigatórios");
        return;
    }

    if (!keysObject.length){
        res.status(400).send('O body esta vazio')
        return;
    }
    if(req.body.constructor !== Object){
        res.status(400).send('Formato inválido!')
        return;
    }
    if(!usernameIsString||!tweetIsString){
        res.status(400).send('Formato inválido!')
        return;
    }

    if (invalidKey){
        res.status(400).send('Campo "'+invalidKey+'" inválido!')
        return;
    }


    tweetsArray.push(req.body);
    if (tweetsArray.length>10){
        tweetsArray = tweetsArray.slice(1)
    }
    res.status(201).send('OK')
})


app.get('/tweets',(req,res) => {
    console.log(usersArray)
    const array = tweetsArray.map((object)=>{return(
        {username: object.username,
        tweet: object.tweet,
        avatar: usersArray.find((q)=>q.username==object.username).avatar})
    })
    
    res.send(array);
})

app.listen(5000);