const express = require('express');
const cors = require('cors');
const crewsRouter = require('./routes/crews');
const userRouter = require('./routes/user');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Mount crew routes under /api
app.use('/api', crewsRouter);
app.use('/api', userRouter);
app.use('/api', cardsRouter);
app.use('/api', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
