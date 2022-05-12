// import { create, router as _router, defaults } from 'json-server';
import pkg from 'json-server';
import path from 'path'; 
import express from 'express';

const { create,  router: _router,  defaults , rewriter } = pkg;

const server = create();
const router = _router('users.json');
const middlewares = defaults({
  static: './build'
});
const PORT = process.env.PORT || 3001;
server.use(middlewares);
server.use(rewriter({
  '/api/*': '/$1',
}))
server.use(router);
// server.use('/db', middlewares, router);
server.use(express.static(path.join(__dirname, 'build')));
server.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
server.listen(PORT, () => {
  console.log('Server is running');
});

// const server = create();
// const router = _router('users.json');
// const middlewares = defaults();
// const port = process.env.PORT || 3001;

// server.use(middlewares);
// server.use(router);

// server.listen(port);