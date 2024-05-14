import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Signin from './pages/Signin';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate replace to="/signup"/>
    },
    {
      path: "/signup",
      element: <Signin/>
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
