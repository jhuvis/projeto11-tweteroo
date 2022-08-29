import express from 'express';
import cors from 'cors';

const app = express(); 
app.use(cors());
app.use(express.json());


const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => 
{
  const user = {id : users.length + 1,
                username : req.body.username, 
                avatar : req.body.avatar};
  users.push(user);
  res.send("OK");
});

app.post('/tweets', (req, res) => 
{
  
  const user = users.find(element => element.username === req.body.username);

  const tweet = {id : tweets.length + 1,
                username : user.username,
                avatar : user.avatar, 
                tweet : req.body.tweet}; 
  tweets.push(tweet);
  res.send("OK");
});

app.get('/tweets', (req, res) => 
{
  let tweet = [];
  let j = 0;
  for (let i = tweets.length - 1; i >= 0 ; i--, j++) 
  {
    tweet.push(tweets[i]);
    if(j >= 9)
    {
      break;
    }
  }
  if(tweets.length === 0)
  {
    tweet = tweets;
  }
  console.log(tweet);
  res.send(tweet);
});

app.listen(5000);