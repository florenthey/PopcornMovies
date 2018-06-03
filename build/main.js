require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_volleyball__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_volleyball___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_volleyball__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dotenv_config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dotenv_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_dotenv_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_multer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_multer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_multer__);





const upload = __WEBPACK_IMPORTED_MODULE_3_multer___default()();
const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
const { SERVER_PORT } = process.env;

let asianMovies = [];

//récuperer le contenu du formulaire grace à body-parser(inclut dans express)
app.use(__WEBPACK_IMPORTED_MODULE_0_express___default.a.json());
app.use(__WEBPACK_IMPORTED_MODULE_0_express___default.a.urlencoded({ extended: true }));

//config pour utiliser le template engine
app.use('/public', __WEBPACK_IMPORTED_MODULE_0_express___default.a.static('public'));
app.set('views', './views'); // 1er views = clef, 2eme = valeurs, "les views dans le dossier views"
app.set('view engine', 'ejs'); // 1er = engine, 2eme = le type d'engine/'ejs, jade, pug, etc'
// grace à la 2eme ligne, pas besoin d'extention '.ejs' lors d'appel de views dans le code

//ma route movies
app.get('/movies', (req, res) => {

  const title = 'Les meilleurs films asiat';

  asianMovies = [{ title: 'Memory of Murder', year: 2003 }, { title: 'Dreams', year: 1990 }, { title: 'The Host', year: 2006 }];
  res.render('movies', { movies: asianMovies, title: title });
});

app.post('/movies', upload.fields([]), (req, res) => {
  if (!req.body) {
    return res.sendStatus(500);
  } else {
    const formData = req.body;
    console.log('formData:', formData);
    const newMovie = { title: req.body.movietitle, year: req.body.movieyear };
    asianMovies = [...asianMovies, newMovie];
    res.sendStatus(201);
  }
});

//app.post('/movies', (req, res) =>{
//console.log('le titre :',req.body.movietitle);
//console.log('année :',req.body.movieyear);
//const newMovie = { title : req.body.movietitle, year : req.body.movieyear};
//asianMovies = [...asianMovies, newMovie]  //'...'' crées un nouveau tableau alors que push ajoute
//console.log(asianMovies);
//res.sendStatus(201);
//})

//formulaire pour ajouter un films                 // à mettre avant la route :id
app.get('/movies/add', (req, res) => {
  // sinon conflit entre les deux
  res.send('prochainement un formulaire ici');
});

//générateur de multiples routes
app.get('/movies/:id/', (req, res) => {
  //les ':' + le nom de mon paramètre servent
  const id = req.params.id; //à créer de multiples routes automatiquement
  const title = req.params.title;
  //res.send(`film numéro ${id}`);
  res.render('movie-details', { movieid: id, movietitle: title });
});

//ma racine
app.get('/', (req, res) => {
  res.render('index'); // pour lier node à un template, toujours utiliser render()
});

app.get('/movie-search', (req, res) => {
  res.render('movie-search');
});

app.listen(SERVER_PORT, (req, res) => {
  console.log(`Ca roule au port ${SERVER_PORT}`);
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("volleyball");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("dotenv/config");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map