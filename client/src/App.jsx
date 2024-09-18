import { useDispatch } from "react-redux";
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import NewJob from "./pages/newJob/NewJob"
import View from "./pages/view/View"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import EditJob from "./pages/editJob/EditJob";
import { getAllClients } from "./features/apiCalls";
import { useEffect } from "react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home />
      ),
    },
    {
      path: "/view/:id",
      element: (
        <View />
      )
    },
    {
      path: "/edit/:id",
      element: (
        <EditJob />
      )
    },
    {
      path: "/new",
      element: (
        <NewJob />
      )
    }
  ]);
  const dispatch = useDispatch()
  useEffect(() => {
    getAllClients(dispatch)
  },[dispatch])
  return (
    <RouterProvider router={router} />
  )
}

export default App
