const express = require('express');
const cors = require('cors');
const crewsRouter = require('./routes/crews');
const userRouter = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

// Mount crew routes under /api
app.use('/api', crewsRouter);
app.use('/api', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
