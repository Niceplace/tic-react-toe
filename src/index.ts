import server from './app/server';

const port = 3000;

const server = app.listen(port, () =>
  console.log(`Pleo money formatter listening on port ${port}!`),
);

export default server;
