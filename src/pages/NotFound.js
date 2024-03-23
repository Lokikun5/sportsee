import '../styles/NotFound.scss';
import { Link } from "react-router-dom";
function NotFound() {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-text">Oups ! La page que vous cherchez n'existe pas.</p>
            <Link to="/" className="not-found-home-link">Retourner à la page d'accueil</Link>
        </div>
    );
}
export default NotFound;