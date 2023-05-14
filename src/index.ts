import * as dotenv from 'dotenv';

dotenv.config();
import app from './server';

// Path: src/server.js
app.listen(3000, () => {
  console.log('server is running on 3000');
});
