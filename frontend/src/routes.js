
import Dashboard from "./views/Dashboard";
import Main from './views/Main'; // Importa el nuevo componente
import UserAdmin from './components/UserAdmin';  // Importa UserAdmin
import RoleAdmin from './components/RoleAdmin';  // Importa RoleAdmin



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
  {
    path: "/admin/users",
    name: "Usuarios",
    component: <UserAdmin />, // Añade la nueva ruta
  },
  {
    path: "/admin/roles",
    name: "Roles",
    component: <RoleAdmin />, // Añade la nueva ruta
  },

];
export default routes;
