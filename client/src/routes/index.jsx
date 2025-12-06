import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Page';
import Register from '../pages/register/Page';
import Login from '../pages/login/Page'
import AuthLayouts from '../layout';



const router = createBrowserRouter([
    {
        path:'/',
        element : <AuthLayouts> <App/></AuthLayouts> ,
        children : [
            {
                index: true,
                element : <Home />
            },
            {
                path: 'home',
                element : <Home />
            },
            {
                path:'register',
                element: <Register />,
            },
            {
                path : 'login',
                element : <Login />
            }
        ]
    }
])


export default router;