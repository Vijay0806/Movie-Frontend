// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { ColorBox } from './ColorBox';
import { IconButton } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Badge from '@mui/material/Badge';
import { Routes, Route, Link, Router, useNavigate, useParams } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Signin from './Signin';
import'./Signin.css'
import { API } from './global';
import axios from 'axios';
import { API_URL } from './global';
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import { blue } from '@mui/material/colors';
const MOVIE = [
  {
    "id": "99",
    "name": "Vikram",
    "poster": "https://w0.peakpx.com/wallpaper/113/573/HD-wallpaper-vikram-movie-kamal-haasan.jpg",
    "rating": 8.5,
    "summary": "A covert investigation changes its course when special officer Amar encounters an unrelenting Vikram and his pursuit to take down a notorious drug cartel.",
    "trailer": "https://www.youtube.com/embed/OKBMCL-frPU"
  },
  {
    "id": "100",
    "name": "Jailer",
    "poster":
      "https://moviegalleri.net/wp-content/uploads/2022/08/Rajinikanth-Jailer-Movie-First-Look-Poster-HD.jpg",
    "rating": 7.2,
    "summary": "Tiger Muthuvel Pandian, a retired jailer, is now a family man who leads an ordinary life. Trouble knocks on his door when his son, a diligent cop, investigates an idol smuggling mafia. And forces Muthuvel Pandian to step back into the dark world of his past.",
    "trailer": "https://www.youtube.com/embed/Y5BeWdODPqo"
  },
  {
    "id": "101",
    "name": "LEO",
    "poster": "https://static.moviecrow.com/gallery/20230917/221018-Leo%20Vijay%20Telugu%20Poster.jpg",
    "rating": 8.5,
    "summary": "Violently pursued by criminals who insist he's a former gangster, a humble cafe owner fights to shield his family — and the truth about his identity.Starring:Thalapathy Vijay,Sanjay Dutt,Arjun",
    "trailer": "https://www.youtube.com/embed/v=Po3jStA673E"
  },
  {
    "id": "102",
    "name": "JAWAN",
    "poster": "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
    "rating": 7.1,
    "summary": "Jawan:2023 | Maturity Rating:A | 2h 50m | Action A prison warden recruits inmates to commit outrageous crimes that shed light on corruption and injustice — and that lead him to an unexpected reunion.Starring:Shah Rukh Khan,Nayanthara,Vijay Sethupathi",
    "trailer": "https://www.youtube.com/embed/COv52Qyctws"
  },
  {
    "id": "103",
    "name": "Jai Bhim",
    "poster": "https://wallpapercave.com/dwp1x/wp10188200.jpg",
    "summary": "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
    "rating": 8.8,
    "trailer": "https://www.youtube.com/embed/nnXpbTFrqXA"
  },
  {
    "id": "104",
    "name": "The Avengers",
    "rating": 8,
    "summary": "S.H.I.E.L.D. leader Nick Fury is compelled to launch the Avengers programme when Loki poses a threat to planet Earth. But the superheroes must learn to work together if they are to stop him in time.",
    "poster": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
    "trailer": "https://www.youtube.com/embed/eOrNdBpGMv8"
  },
  {
    "id": "105",
    "name": "Kgf-2",
    "poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnG6KUJRQoEOZMDOjDLv733EkQ4tVk_iaO8w&usqp=CAU",
    "rating": 8.6,
    "summary": "Hombale Films Presents the Official Teaser of KGF Chapter 2.  Written and Directed by Prashanth Neel. Starring: Rocking Star Yash, Sanjay Dutt, Srinidhi Shetty",
    "trailer": "https://www.youtube.com/embed/Qah9sSIXJqk"
  },
  {
    "id": "106",
    "name": "K.G.F.Chapter-2",
    "poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnG6KUJRQoEOZMDOjDLv733EkQ4tVk_iaO8w&usqp=CAU",
    "rating": 8.3,
    "summary": "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
    "trailer": "https://www.youtube.com/embed/sOEg_YZQsTI"
  },
  {
    "id": "107",
    "name": "Bahubali-2",
    "poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGbbxRnm933VgUfi6lSsTWlp0f6n9LtHiRiA&usqp=CAU",
    "rating": 8,
    "summary": "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
    "trailer": "https://www.youtube.com/embed/NgsQ8mVkN8w"
  }
]
function App() {
  const [movieList, setMovieList] = useState(MOVIE)
  const roleId=localStorage.getItem("roleId");
  const navigate = useNavigate();
  const [mode, setMode] = useState("light")
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const dk = {
    marginLeft: "auto"
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={8} style={{ minHeight: "100vh" }}>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Button className='font_mode' color="inherit" onClick={() => navigate("/")}>🅷🅾🅼🅴</Button>
              <Button className='font__mode' color="inherit" onClick={() => navigate("/movies")}>𝕸𝖔𝖛𝖎𝖊 𝕯𝖊𝖙𝖆𝖎𝖑𝖘</Button>
              {roleId==0?<Button color="inherit" onClick={() => navigate("/add-movie")}>Add Movie</Button>:null}
              {roleId==0?<Button color="inherit" onClick={() => navigate("/update/:id")}>Edit Movie</Button>:null}
              <Button  className='font__mode'color="inherit" onClick={() => navigate("/color")}>𝕮𝖔𝖑𝖔𝖗 𝕼𝖚𝖊𝖘𝖙</Button>
              <Button className='dark_mode' style={dk} color="inherit" startIcon={mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                onClick={() => setMode(mode === "light" ? "dark" : "light")}>𝕯𝖆𝖗𝖐 𝕸𝖔𝖉𝖊</Button>
         {roleId? null:<Button className='sign_up register_new' color="inherit" onClick={() => navigate("/signup")}>𝕾𝖎𝖌𝖓𝖚𝖕</Button>}
            {roleId ?<Button className='log_out' color="inherit" style={dk} onClick={()=>logout()}>𝕷𝖔𝖌𝖔𝖚𝖙</Button >: <Button className='sign_up log_in' color="inherit" onClick={() => navigate("/login")}>𝕷𝖔𝖌𝖎𝖓</Button>}
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/flims" element={<Navigate replace to="/movies" />} /> */}
            <Route path="/add-movie" element={
              <ProdectedRoute>
              <AddMovie />
              </ProdectedRoute>} />
            <Route path="/movies" element={
            <ProdectedRoute>
            <MovieList />
            </ProdectedRoute>
            } />
            <Route path="/color" element={
            <AddColor />
            } />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path=" /edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup'element={<Signin/>}></Route>
            <Route path='update/:id' element={
            <ProdectedRoute>
            <Edit/>
            </ProdectedRoute>
          }></Route>
          </Routes>
        </div>
      </Paper>
    </ThemeProvider >
  );
}
function Edit(){
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  useEffect(() => {
    fetch(`${API_URL}/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mv) => setDetails(mv));
  }, []);

   console.log(details)
  return(
    <div>
      {details ? <Update details={details} /> : "Loading..."}
    </div>
  )
}
function Update({ details }) {
  const navigate = useNavigate();

  const updateUser = (update) => {
    fetch(`${API_URL}/${details.id}`, {
      method: "PUT",
      body: JSON.stringify(update),
      headers: { "Content-type": "application/json" },
    })
      .then(() => navigate("/movies"))
      .catch((error) => console.error("Update failed:", error));
  };

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      name: details.name,
      poster: details.poster,
      rating: details.rating,
      summary: details.summary,
      trailer: details.trailer,
    },
    validationSchema: movieValidationShema,
    onSubmit: (update) => {
      console.log("Form values:", update);
      updateUser(update);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
      <TextField
        label="name"
        variant="outlined"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && Boolean(errors.name)}
      />
      {touched.name && errors.name ?<div className="error_message">{errors.name }</div> : null}

      <TextField
        label="poster"
        variant="outlined"
        name="poster"
        value={values.poster}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.poster && Boolean(errors.poster)}
      />
      {touched.poster && errors.poster ?<div className="error_message">{errors.poster }</div> : null}

      <TextField
        label="rating"
        variant="outlined"
        name="rating"
        value={values.rating}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.rating && Boolean(errors.rating)}
      />
      {touched.rating && errors.rating ?<div className="error_message">{ errors.rating }</div>: null}

      <TextField
        label="summary"
        variant="outlined"
        name="summary"
        value={values.summary}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.summary && Boolean(errors.summary)}
      />
      {touched.summary && errors.summary ? <div className="error_message">{errors.summary}</div> : null}

      <TextField
        label="trailer"
        variant="outlined"
        value={values.trailer}
        name="trailer"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.trailer && Boolean(errors.trailer)}
      />
      {touched.trailer && errors.trailer ?<div className="error_message">{errors.trailer }</div> : null}

      <Button type="submit" variant="contained">
        Update Movie
      </Button>
    </form>
  );
}

function Home() {
  return (
    <div className='home'>
      <div>
      {/* <img src='https://tse1.mm.bing.net/th?id=OIP.F5Rm3iDuJpIvmyMJ_Np8bgHaDB&pid=Api&P=0'style={{marginTop:"40px",width:"600px"}}></img> */}
    </div>
    </div>
  )
}
function NotFound() {
  return (
    <div>404 not found</div>
  )
}
// function declaration
function MovieList() {
  // const roleId=localStorage.getItem("roleId")
  const [movieList, setMovieList] = useState([]);
  const getMovies = () => {
    fetch(`${API_URL}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((msv) => setMovieList(msv));

  };
  useEffect(() => getMovies(), [])
  const st = {
    marginLeft: "auto"
  }

  const deleteMovie = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then((data) => getMovies());
    console.log(id);
  };
  // const deleteMovie = async (id) => {
  //   await axios.delete(`${API}/movies/${id}`)
  //   console.log(id);
  //   getMovies();
  // }
  const navigate = useNavigate();
  return (
    <div>
      <div className='movie__list'>
        {movieList.map((mv) => (
          <div key={mv._id}>
            <Movie movie={mv}
              id={mv._id}
              editButton={
                <IconButton style={st} color='secondary' onClick={() => navigate(`/update/${mv.id}`)}><DriveFileRenameOutlineIcon /></IconButton>}
              deleteButton={
                <IconButton style={st} color='error' onClick={() => deleteMovie(mv.id)}><DeleteSweepIcon /></IconButton>}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
function MovieDetail() {
  const [movie, SetMovie] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const rating = {
    color: movie.rating > 8 ? "green" : "red"
  }
  useEffect(() => {
    fetch(`${API_URL}/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mv) => SetMovie(mv))
  }, []);
  console.log(movie);
  return (
    <div>
      <iframe width="100%"
        height="600"
        src={movie.trailer}
        title={movie.title}
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
      <div className='movie-detail-container'>
        <div className='movie__specs'>
          <h2 className='movie__name'>{movie.name}
          </h2>
          <p style={rating} className="movie__rating">🌟{movie.rating}</p>
        </div>
        <p className='movie__summary'>{movie.summary}</p>
        <Stack spacing={2} direction="row">
          <Button variant="contained"
            onClick={() => navigate(-1)}
          > <KeyboardBackspaceIcon />Go Back</Button>
        </Stack>
      </div>
    </div>
  )
}

function Count() {
  const [like, setLike] = useState(0);
  const [disLike, setDisLike] = useState(0);

  const handleLike = () => setLike(like + 1);
  const handleDisLike = () => setDisLike(disLike + 1);

  const likeColor = {
    color: like >= 10 ? 'green' : 'black'
  };

  const disLikeColor = {
    color: disLike >= 10 ? 'red' : 'black'
  };

  return (
    <div className='like'>
      <IconButton color="primary" aria-label="like" onClick={handleLike}>
        {/* You can use your own like icon here */}
        <i className="fa fa-thumbs-up like_color"  aria-hidden="true" style={{color:"green"}}></i>
      </IconButton>

      <IconButton color="secondary" aria-label="dislike" onClick={handleDisLike}>
        {/* You can use your own dislike icon here */}
        <i className="fa fa-thumbs-down dislike_color" aria-hidden="true" style={{color:"blue"}}></i>
      </IconButton>

      <p  className='color__style' style={likeColor}>Likes: {like}</p>
      <p className='color__style' style={disLikeColor}>Dislikes: {disLike}</p>
    </div>
  );
}

function Movie({ movie, id, deleteButton, editButton }) {
  const [show, setShow] = useState(true);
  // const roleId=localStorage.getItem("roleId")
  const rating = {
    color: movie.rating > 8 ? "green" : "red"
  }
  const navigate = useNavigate();
  return (
    <Card className='movie__container'>
      <CardContent>
        <img src={movie.poster} className="movie__poster" />
        <div className='movie__specs'>
          <h2 className='movie__name'>{movie.name}
            <IconButton color="primary" aria-label="add to shopping cart" onClick={() => setShow(!show)}>
              {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <IconButton color="primary" aria-label="add to shopping cart" onClick={() => navigate(`/movies/${movie.id}`)}>
              <InfoIcon />
            </IconButton>
          </h2>
          <p style={rating} className="movie__rating star_button"><StarBorderPurple500Icon style={{ fontSize: '1.5em' }} />{movie.rating}</p>
        </div>
        {show ? <p className='movie__summary'>{movie.summary}</p> : null}
      </CardContent>
      <CardActions>
        <Count />{editButton}{deleteButton}

      </CardActions>


    </Card>
  )
}
function ColorPox({ color }) {
  let sty = {
    width: "250px", height: "25px", marginTop: "10px", background: color,
  }
  return (<div style={sty}>

  </div>)
}
function AddColor() {
  const roleId=localStorage.getItem("roleId")
  let [color, setColor] = useState("");
  let styles = {
    background: color,
  };
  let [colorList, setColorList] = useState([
    "red", "green", "blue"
  ]
  );
  // let colorList = ["crimson", "orangered", "orange", "red"]
  return (
    <div className='color'>
      { roleId==0?(<h1 className='style_font'>Good day,Admin!</h1>):(<h1 className='style_font'>Hi there! Good day! </h1>)}
      <input type="text" style={styles}
        placeholder="Enter the color"
        onChange={(event) => setColor(event.target.value)}
        value={color} />
      <button className='style__font' onClick={() => setColorList([...colorList, color])}>Add Color</button>
      {colorList.map((ele, key) => (<ColorPox color={ele} index={key} />))}
    </div>
  );
}
const movieValidationShema = yup.object({
  name: yup.string().required(),
  poster: yup.string().required().min(4),
  rating: yup.number().required().min(0).max(10),
  summary: yup.string().required().max(200),
  trailer: yup.string().required().min(4).url(),
})

function AddMovie() {
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        poster: "",
        rating: "",
        summary: "",
        trailer: "",
      },
      validationSchema: movieValidationShema,
      onSubmit: (newMovie) => {
        console.log("Form values:", newMovie);
        addMovie(newMovie);
      },
    });
  const navigate = useNavigate();
  const addMovie = (newMovie) => {
    //   const newMovie = {
    //     name: name,
    //     poster: poster,
    //     rating: rating,
    //     summary: summary,
    //     trailer: trailer,
    //   };
    fetch(`${API_URL}`, {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: { "Content-type": "application/json" }
    }).then(() => navigate("/movies"))

    //   // setMovieList([...movieList, newMovie])
    //   // console.log(newMovie);
  };
  return (
    <form onSubmit={handleSubmit} className='add-movie-form'>
      <TextField
        label="name"
        variant='outlined'
        name="name"
        value={values.name}
        onChange={handleChange}onBlur={handleBlur}
      />
      {touched.name && errors.name ? errors.name : null}
      <TextField
        label="poster"
        variant='outlined'
        name="poster"
        value={values.poster}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.poster && errors.poster ? errors.poster : null}

      <TextField
        label="rating"
        variant='outlined'
        name="rating"
        value={values.rating}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.rating && errors.rating ? errors.rating : null}

      <TextField
        label="summary"
        variant='outlined'
        name="summary"
        value={values.summary}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.summary && errors.summary ? errors.summary : null}
      <TextField
        label="trailer"
        variant='outlined'
        value={values.trailer}
        name="trailer"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.trailer && errors.trailer ? errors.trailer : null}

      <Button type="submit" variant='contained' onClick={addMovie}>Add Movie</Button>
    </form>
  )
}


function Login() {
  const roleId=localStorage.getItem("roleId")
  const handleToggle=()=>{
    if(passwordType==="password"){
      setPasswordType("text");
      setPasswordIcon(<FaEye/>)
    }
    else{
      setPasswordType("password");
      setPasswordIcon(<FaEyeSlash/>)
    }
  }
      const [passwordType,setPasswordType]=useState("password");
      const [passwordIcon,setPasswordIcon]=useState(<FaEyeSlash/>);
  const [formState,setFormState]=useState("success");
  const navigate=useNavigate();
  const {handleChange,values,handleBlur,handleSubmit,touched, errors }=useFormik({
      initialValues:{username:"",email:"",password:""},
      onSubmit:async(values)=>{
          console.log(values);
       const data = await fetch(API+"/"+"login",{
              method:"POST",
              headers:{
                  "Content-type":"application/json"
              },
              body:JSON.stringify(values),
          });
          if(data.status==401){
              console.log("error");
              setFormState("error")
          }
          else{
              const result= await data.json()
              console.log("success",result);
              localStorage.setItem("token",result.token)
              localStorage.setItem("roleId",result.roleId)
              navigate("/movies")
          }
        
      },
});
return (
  <div>
     <form onSubmit={handleSubmit} className="login-form" >
     <div className='login'>   
        <label for="chk" className='login__label'>Login</label>
        <input type='text' 
         placeholder='Username'
          required=""
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          name='username'
          ></input>
          {touched.username && errors.username && <div className="error-message">{errors.username}</div>}
          <input type='email' 
         placeholder='Email'
          required=""
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          name='email'
          ></input>
          {touched.email && errors.email && ( <div className="error-message">{errors.email}</div>)}
        <input type={passwordType} 
        name='password'
         placeholder='Password'
          required=""
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          ></input>
          {touched.password && errors.password && <div className="error-message">{errors.password}</div>}
          <span className="eye" onClick={handleToggle}>{passwordIcon}</span> 
        <button id='button' className='button_active' type='submit'>Login</button>
       {roleId?<Button  className="button_skill" style={{marginLeft:"170px"}} onClick={()=>logout()}>Logout</Button>:null}
      </div>
          </form>
          <div className='logout'>
          </div>
      </div>
)
}
function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("roleId")
  window.location.href = "/";

}
function checkAuth(data) {
  if (data.status === 401) {
    console.log("Unauthorized")
    throw Error("Unauthorized")
  }
  else {
    return data.json();
  }
}
 function ProdectedRoute({ children }) {
  const isAuth = localStorage.getItem("token");
  console.log(isAuth)
  return isAuth ? children : <Navigate replace to={"/"} />
}

 

export default App;