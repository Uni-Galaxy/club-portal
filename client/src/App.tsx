import './App.css';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Signin from './pages/Signin';
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
import Event from './pages/Event';
import Club from './pages/Club';
import CreateEvent from './pages/createEvent';
import ClubProfile from './pages/clubProfile';
// @ts-ignore
import ClubProfileEdit from './pages/ClubProfileEdit.jsx';


function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState('');

  const [isAdmin, setIsAdmin] = useState(false);
  const [isClub, setIsClub] = useState(false);

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
        },
        {
          path: "/clubProfile",
          element: isClub ? <ClubProfile /> : <Navigate to="/error" />
        },
        {
          path: "/clubProfile/edit",
          element: isClub ? <ClubProfileEdit /> : <Navigate to="/error" />
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