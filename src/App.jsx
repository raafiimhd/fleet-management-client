
import { useRoutes } from 'react-router-dom'
import './App.css'
import SignInScreen from './views/auth/sign_in/SignInScreen'

function App() {
  const routes= useRoutes(
    [
   {path:"/",element:<SignInScreen/>}
    ]
  );
  return routes;
}

export default App
