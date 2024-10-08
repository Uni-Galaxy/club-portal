import './App.css';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Signin from './pages/Signin';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useState, useEffect } from 'react';
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
import CreateDisplayEvent from './pages/CreateDisplayEvent';
import { getDatabase, ref, get, child } from "firebase/database";
import CreateCalenderEvent from './pages/CreateCalenderEvent';
import Event from './pages/Event';
import Club from './pages/Club';
import CreateEvent from './pages/createEvent';


function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState('');

  const [isAdmin, setIsAdmin] = useState(false);
  const [isClub, setIsClub] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db);
    // Checking that is it a Admin id or Not
    get(child(dbRef, `/checkIsAdmin`)).then((snapshot) => {
      if (snapshot.exists()) {
        setIsAdmin(true);
      }
    })
    // Checking that is it a Club id or Not
    get(child(dbRef, `/checkIsClub`)).then((snapshot) => {
      if (snapshot.exists()) {
        setIsClub(true);
      }
    })
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers: HeadersInit = {};
        if (token) {
          headers['Authorization'] = token;
        }
        const url = `${import.meta.env.VITE_API_URL}/check/access`
        const response = await fetch(url, {
          method: 'GET',
          headers
        });
        const data = await response.json();
        if (data.role == "CLUB") {
          setIsClub(true)
        }
        if (data.role == "ADMIN") {
          setIsAdmin(true)
        }
      } catch (err) {
        console.error(err);
      }
    }

    getData();
  }, [isLogin])

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
      element: isLogin ? <LayoutComponent /> : <HomePage setIsLogin={setIsLogin} setUser={setUser} />,
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
          path: "/profile",
          element: <Profile user={user} />
        },
        {
          path: "/create-display-event",
          element: isClub ? <CreateDisplayEvent /> : <Navigate to="/error" />
        },
        {
          path: "/create-Calender-event",
          element: isClub ? <CreateCalenderEvent /> : <Navigate to="/error" />
        },
        {
          path: "/event/:id",
          element: <Event />
        },
        {
          path: "/club/:name",
          element: <Club />
        },
        {
          path: "/creatingEvent",
          element: isClub ? <CreateEvent /> : <Navigate to="/error" />
        }
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
              <Sidebar setIsLogin={setIsLogin} isAdmin={isAdmin} isClub={isClub} />
            </div>
            <div className='pl-52'>
              <Outlet />
            </div>
          </div>
        </div>
        <div className='md:hidden'>
          <Header user={user} />
          <Sidebar setIsLogin={setIsLogin} isAdmin={isAdmin} isClub={isClub} />
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