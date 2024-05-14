import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Signin from './pages/Signin';
import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
import Signup from './pages/Signup';
import ForgetPass from './pages/ForgetPass';

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDdb6ULHl6_83bxI5tc1IrL27pw0I2NyXM",
    authDomain: "club-portal-a8713.firebaseapp.com",
    projectId: "club-portal-a8713",
    storageBucket: "club-portal-a8713.appspot.com",
    messagingSenderId: "171986663262",
    appId: "1:171986663262:web:f08375ec8baccffd0b81cf",
    measurementId: "G-DP3SGJ0V4Q"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate replace to="/signin" />
    },
    {
      path: "/signin",
      element: <Signin />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/forgetpass",
      element: <ForgetPass />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
