import logo from "./logo.svg";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import Signup from "./Signup";
import Loginpage from "./Loginpage";
import Formlogin from "./Formlogin";
import Todoapp from "./Todoapp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Formlogin/>,
  },
  {
    path: "/sign-up",
    element: <Signup/>,
  },
  {
    path: "/login-page",
    element: <Loginpage/>,
  },
  {
    path: "/todo-app",
    element: <Todoapp/>,
  },
]);

function App() {
  return (
    
      
  
    <RouterProvider router={router} />
  

    
    
  );
}

export default App;
