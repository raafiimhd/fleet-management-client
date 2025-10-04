
import { useRoutes } from 'react-router-dom'
import './App.css'
import SignInScreen from './views/auth/sign_in/SignInScreen'
import SignUp from './views/auth/sign_up/SignUpScreen';

function App() {
  const routes= useRoutes(
    [
   {path:"/",element:<SignInScreen/>},
   {path:"/signup",element:<SignUp/>}
    ]
  );
  return routes;
}

export default App
