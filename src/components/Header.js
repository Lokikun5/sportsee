import '../styles/header.scss'
import logo from '../assets/logo.svg'
function Header () {
 return(<header>
     <img className="sport-logo" src={logo} alt='logo sport' />
     <nav>
         <ul className="nav-link">
             <li><a href="/accueil">Accueil</a></li>
             <li><a href="/profil">Profil</a></li>
             <li><a href="/reglages">Réglages</a></li>
             <li><a href="/communaute">Communauté</a></li>
         </ul>
     </nav>

 </header>)
}

export default Header