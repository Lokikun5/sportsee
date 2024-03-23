import '../styles/header.scss'
import logo from '../assets/logo.svg'
import { Link } from "react-router-dom";

function Header () {
 return(<header>
     <img className="sport-logo" src={logo} alt='logo sport' />
     <nav>
         <ul className="nav-link">
             <li><Link to="/">Accueil</Link></li>
             <li><Link to="/profil">Profil</Link></li>
             <li><Link to="/reglages">Réglages</Link></li>
             <li><Link to="/communaute">Communauté</Link></li>
         </ul>
     </nav>

 </header>)
}

export default Header