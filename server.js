const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  let {id, time} = req.query;
  console.log(id);
  console.log(time);
  res.json({message: "done"})
})

app.listen(PORT, () => console.log(`Server start on port: ${PORT}`))
// module.exports = app;