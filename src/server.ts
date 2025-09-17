import app from './app.js';
import connectDB from './config/db.js';
import { env } from './config/env.js';

const PORT = env.PORT;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error: any) {
    console.error(`Failed to start the server: ${error.message}`);
  }
};

startServer();

/*  toda vez que usa o async usa o await e nesse connectDB faz toda
a conexão do arquivo db.ts, depois vai roda o servidor app.listen */
