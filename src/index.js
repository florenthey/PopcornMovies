import express from 'express'
import volleyball from 'volleyball'
import 'dotenv/config'
import multer from 'multer'

const upload = multer()
const app = express()
const { SERVER_PORT } = process.env
const jws = 'jsonwebtoken';


let bestMovies = [];

//récuperer le contenu du formulaire grace à body-parser(inclut dans express)
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//config pour utiliser le template engine
app.use('/public', express.static('public'));
app.set('views', './views');    // 1er views = clef, 2eme = valeurs, "les views dans le dossier views"
app.set('view engine', 'ejs');  // 1er = engine, 2eme = le type d'engine/'ejs, jade, pug, etc'
                                // grace à la 2eme ligne, pas besoin d'extention '.ejs' lors d'appel de views dans le code

//ma route movies
app.get('/movies', (req, res) =>{

  const title = 'Les meilleurs films de tous les temps';

  bestMovies = [
    { title: 'Retour vers le futur 2', year: 1989 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Tampopo', year: 1985 },
    { title: 'Drunken Master 2', year: 1994 }
  ]
  res.render('movies', { movies: bestMovies, title: title });
})

app.post('/movies', upload.fields([]), (req, res) => {
    if(!req.body) {
      return res.sendStatus(500);
    } else {
    const formData = req.body;
    console.log('formData:', formData);
    const newMovie = { title : req.body.movietitle, year: req.body.movieyear };
    bestMovies = [... bestMovies, newMovie];
    res.sendStatus(201);
  }
})

//app.post('/movies', (req, res) =>{
  //console.log('le titre :',req.body.movietitle);
  //console.log('année :',req.body.movieyear);
  //const newMovie = { title : req.body.movietitle, year : req.body.movieyear};
  //bestMovies = [...bestMovies, newMovie]  //'...'' crées un nouveau tableau alors que push ajoute
  //console.log(bestMovies);
  //res.sendStatus(201);
//})

//formulaire pour ajouter un films                 // à mettre avant la route :id
app.get('/movies/add', (req, res) =>{              // sinon conflit entre les deux
  res.send('prochainement un formulaire ici');
})

//générateur de multiples routes
app.get('/movies/:id/', (req, res) =>{    //les ':' + le nom de mon paramètre servent
  const id = req.params.id;              //à créer de multiples routes automatiquement
  const title = req.params.title
  //res.send(`film numéro ${id}`);
  res.render('movie-details', { movieid: id, movietitle: title });
})

//ma racine
app.get('/', (req, res) =>{
  res.render('index');                   // pour lier node à un template, toujours utiliser render()
})

app.get('/movie-search',(req, res) => {
  res.render('movie-search');
})

app.get('/login',(req, res) =>{
  res.render('login',{title : 'connexion'})
})

const fakeUser = { email: 'testuser@gmail.fr', password: 'qsd' };
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq'

app.post('/login', (req, res) =>{
  console.log('login post', req.body);
  if(!req.body){
    const myToken = jwt.sign({iss: 'http://PopcornMovies.fr', user:'Bob', role:'Moderateur'})
    res.sendStatus(500);
  } else {
      if(fakeUser.email === req.body.email && fakeUser.password === req.body.password) {
        res.json({
          email: 'testuser@gmail.fr',
          favoriteMovie: 'Il était une fois en Chine',
          favoriteMovieTheatre: 'MK2 bibliothèque',
          lastLoginDate: new Date()
        });
        res.json(myToken);
      } else {
        res.sendStatus(401);
      }

  }
  }
)

app.listen( SERVER_PORT, (req,res)=>{
  console.log(`Ca roule au port ${ SERVER_PORT }`)
})
