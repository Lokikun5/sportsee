import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import '../src/styles/App.scss';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";


const router = createBrowserRouter([
    {
        path: '/dashboard/:id',
        element: <div><Header />
            <Sidebar />
            <Dashboard/>
        </div>
    }
]);

function App() {
    return <RouterProvider router={router}/>
}

export default App;
