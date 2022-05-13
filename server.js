// import { create, router as _router, defaults } from 'json-server';
import pkg from 'json-server';
import path from 'path'; 
import { fileURLToPath } from 'url';
// import { path, dirname as __dirname } from 'path';
import express from 'express';


const { create,  router: _router,  defaults , rewriter } = pkg;
// const { dirname: __dirname  } = path;
const dirname = path.dirname;
const __dirname = dirname(fileURLToPath(import.meta.url));
// const __dirname = path.dirname;
 console.log(__dirname);
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
// server.use(router);
const app = express();
server.use('/*', middlewares, router);
// console.log(path);
server.use(express.static(__dirname));
server.use(express.static(path.join(__dirname, 'build')));

server.get('/*', function (req, res) {
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
    res.sendFile(path.join(__dirname, 'build' , 'index.html'));
});
server.get('/catalog/womancollection', function (req, res) {
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
    res.sendFile(path.join(__dirname, 'build' , 'index.html'));
});
server.get('/wishlist', function (req, res) {
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
    res.sendFile(path.join(__dirname, 'build' , 'index.html'));
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