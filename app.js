import express from 'express';
import cors from 'cors';

const app = express(); 
app.use(cors());
app.use(express.json());


const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => 
{
  console.log("logou");
  const user = {id : users.length + 1,
                username : req.body.username, 
                avatar : req.body.avatar};
  users.push(user);
  res.send("OK");
});

app.post('/tweets', (req, res) => 
{
  
  const user = users.find(element => element.username === req.body.username);

  console.log(user);

  const tweet = {id : tweets.length + 1,
                username : user.username,
                avatar : user.avatar, 
                tweet : req.body.tweet}; 
  tweets.push(tweet);
  res.send("OK");
});

app.get('/tweets', (req, res) => 
{

  res.send(tweets);
});

app.listen(5000);