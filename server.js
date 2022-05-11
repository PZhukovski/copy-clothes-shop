// import { create, router as _router, defaults } from 'json-server';
  import pkg from 'json-server';
const { create, router: _router, defaults } = pkg;
const server = create();
const router = _router('users.json');
const middlewares = defaults();
const port = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);

server.listen(port);
