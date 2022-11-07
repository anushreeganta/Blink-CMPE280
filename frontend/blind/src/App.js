import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Post from "./components/Post/Post";
import NavBarAuth from "./components/NavBarAuth/NavBarAuth";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";


const theme = createTheme({
  
  palette:{
    primary: {
      main: "#000000",
      contrastText: "#db440d"
    },
    secondary:{
      main: "#a83232"
      
    }
  }
})

let LoginComponent = () => {
  return (<span >
    <NavBarAuth/>
    <Login/>
  </span>)
}

let HomeComponent = () => {
  return (<span >
    <NavBar></NavBar>
    <Home></Home>
  </span>);
}

let ProfileComponent = () => {
  return (<span>
    <NavBar></NavBar>
    <Profile></Profile>
  </span>)
}

let CreatePostComponent = () => {
  return (<span>
    <NavBar></NavBar>
    <Post></Post>
  </span>);
}

let RegisterComponent = () => {
  return (<span>
    <NavBarAuth/>
    <Register/>
  </span>)
}
 
function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginComponent/>}/>
          <Route path="/login" element={<LoginComponent/>}/>
          <Route path="/home" element={<HomeComponent/>}/>
          <Route path="/post" element={<CreatePostComponent/>}></Route>
          <Route path="/register" element={<RegisterComponent/>}></Route>
          <Route path="/profile" element={<ProfileComponent/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
