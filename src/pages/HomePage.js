import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function HomePage() {
    return (
        <div className="App">
            <Header />
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default HomePage;
