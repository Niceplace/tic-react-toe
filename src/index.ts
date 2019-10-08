import server from './app/server';

const port = 3000;

const app = server.listen(port, () =>
  console.log(`Pleo money formatter listening on port ${port}!`),
);

export default app;
