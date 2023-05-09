import { createBrowserRouter } from 'react-router-dom';
import AllUsers from '../components/AllUsers/AllUsers';
import AddUser from '../components/AddUser/AddUser';
import Home from '../components/Home/Home';
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            { path: "/", element: <AllUsers/>},
            { path: "/addUser", element: <AddUser/>},
            { path: "/deleteUser/:id", element: <AllUsers />},
            { 
                path: "/updateUser/:id", 
                element: <AddUser />,
            },
        ]
    },
]);

export default router;