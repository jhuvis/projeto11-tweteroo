import express from 'express';

const app = express(); // cria um servidor
app.use(express.json());

const users = [];

app.post('/sign-up', (req, res) => 
{

  const user = {id : users.length + 1,
                username : req.body.email, 
                avatar : req.body.password};
  users.push(user);
  res.send("ok");
});

app.get('/tweets', (req, res) => 
{
  res.send(users);
});

app.listen(5000);