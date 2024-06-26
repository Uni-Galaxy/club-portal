import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signin from './pages/Signin';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useState } from 'react';
import HomePage from './pages/HomePage';
import Home from './pages/Home';
import Error from './pages/Error';

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  const firebaseConfig = {
    apiKey: "AIzaSyDdb6ULHl6_83bxI5tc1IrL27pw0I2NyXM",
    authDomain: "club-portal-a8713.firebaseapp.com",
    projectId: "club-portal-a8713",
    storageBucket: "club-portal-a8713.appspot.com",
    messagingSenderId: "171986663262",
    appId: "1:171986663262:web:f08375ec8baccffd0b81cf",
    measurementId: "G-DP3SGJ0V4Q",
    databaseURL: "https://club-portal-a8713-default-rtdb.asia-southeast1.firebasedatabase.app/",
  };

  const app = initializeApp(firebaseConfig);
  getAnalytics(app);

  // const view = () =>{
  //   return(
  //     <>
      
  //     </>
  //   )
  // }

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLogin ? <Home user={user} /> : <HomePage />
    },
    {
      path: "/signin",
      element: <Signin setIsLogin={setIsLogin} setUser={setUser}/>
    },
    {
      path: "*",
      element: <Error />
    },
    {
      path: "/testhome",
      element: <Home user={user}/>
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App