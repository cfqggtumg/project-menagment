
import Dashboard from "./views/Dashboard";
import Main from './views/Main'; // Importa el nuevo componente


var routes = [
  {
    path: "/",
    name: "Main",
    component: <Main />, // Añade la nueva ruta
  },
  {
    path: "/dashboard",
    name: "Proyectos",
//    icon: "ni ni-tv-2 text-primary",
    component: <Dashboard />,
//    layout: "/admin",
  },

];
export default routes;
