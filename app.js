import express from 'express';
import cors from 'cors';

const app = express(); 
app.use(cors());
app.use(express.json());


const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => 
{
  if (!req.body.username || !req.body.avatar) 
  {
    res.status(400).send("Todos os campos são obrigatórios");
		return;
  }

  const u = users.find(element => element.username === req.body.username);

  if(!u)
  {
    const user = {id : users.length + 1,
                username : req.body.username, 
                avatar : req.body.avatar};
    users.push(user);   
  }
  else
  {
    users[u.id-1].avatar = req.body.avatar;
    tweets.map(function(t)
    {
      if(t.username === req.body.username)
      {
        t.avatar = req.body.avatar;
      }
    })
  }

  res.send("OK");
  res.sendStatus(201);
});

app.post('/tweets', (req, res) => 
{
  
  if (!req.body.username || !req.body.tweet)  
  {
    res.status(400).send("Todos os campos são obrigatórios");
		return;
  }

  const user = users.find(element => element.username === req.body.username);

  const tweet = {id : tweets.length + 1,
                username : user.username,
                avatar : user.avatar, 
                tweet : req.body.tweet}; 
  tweets.push(tweet);
  res.send("OK");
  res.sendStatus(201);
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
  
  res.send(tweet);
});

app.listen(5000);