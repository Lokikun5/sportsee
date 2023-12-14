import '../styles/sidebar.scss';
import SideIcones from "./SideIcones";
import bike from "../assets/bike.svg";
import yoga from "../assets/yoga.svg";
import swim from "../assets/swimming.svg";
import dumbbells from "../assets/dumbbells.svg";
function Sidebar () {
    return(
        <div className="sidebar">
            <div className='container'>
                <SideIcones src={yoga} alt='yoga'/>
                <SideIcones src={swim} alt='natation'/>
                <SideIcones src={bike} alt='velo'/>
                <SideIcones src={dumbbells} alt='atl'/>
            </div>
            <div className="copiryght">
                <p>©Copiryght, SportSee 2020</p>
            </div>
        </div>
    )
}
export default Sidebar