
import Dashboard from "./views/Dashboard";
import Task from './components/Task'; // Asegúrate de que la ruta sea correcta
import Main from './views/Main'; // Importa el nuevo componente


var routes = [
  {
    path: "/main",
    name: "Main",
    component: <Main />, // Añade la nueva ruta
  },
  {
    path: "/dashboard",
    name: "Dashboard",
//    icon: "ni ni-tv-2 text-primary",
    component: <Dashboard />,
//    layout: "/admin",
  },

];
export default routes;
