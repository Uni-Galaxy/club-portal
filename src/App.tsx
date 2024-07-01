import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Signin from './pages/Signin';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useState } from 'react';
import HomePage from './pages/HomePage';
import Home from './pages/Home';
import Error from './pages/Error';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Clubs from './pages/Clubs';
import Calendar from './pages/Calendar';
import Events from './pages/Events';
import Profile from './pages/Profile';
import Chat from './pages/Chat';

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


  const router = createBrowserRouter([
    {
      path: "/",
      element: isLogin ? <LayoutComponent /> : <HomePage />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/clubs",
          element: <Clubs />
        },
        {
          path: "/calendar",
          element: <Calendar />
        },
        {
          path: "/chat",
          element: <Chat />
        },
        {
          path: "/events",
          element: <Events />
        },
        {
          path: "/people",
          element: <Profile />
        },
      ]
    },
    {
      path: "/signin",
      element: <Signin setIsLogin={setIsLogin} setUser={setUser} />
    },
    {
      path: "*",
      element: <Error />
    },
  ]);

  function LayoutComponent() {
    return (
      <div className="h-[100vh] w-[100vw]">
        <div className='md:block hidden'>
          <div className="sticky top-0 overflow-hidden bg-white" >
            <Header user={user} />
          </div>
          <div className="flex">
            <div className='fixed'>
              <Sidebar />
            </div>
            <div className='pl-52'>
              <Outlet />
            </div>
          </div>
        </div>
        <div className='md:hidden'>
          <Header user={user} />
          <Sidebar />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    );
  }

  return (
    <RouterProvider router={router} />
  )
}

export default App