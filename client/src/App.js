import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./style.scss";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tarefas from "./pages/Tarefas";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TarefasConcluidas from "./pages/TarefasConcluidas";
import NovaTarefa from "./pages/NovaTarefa";

// Layout padrão com Navbar e Footer
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

// Layout específico para a Home sem Navbar e Footer
const HomeLayout = () => {
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/tarefas",
        element: <Tarefas />,
      },
      {
        path: "/tarefasconcluidas",
        element: <TarefasConcluidas />,
      },
      {
        path: "/novatarefa",
        element: <NovaTarefa />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
