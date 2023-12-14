import { USER_MAIN_DATA } from '../data/data';
import { useParams } from 'react-router-dom';
import '../styles/dashboard.scss';

function Dashboard() {
    let { id } = useParams();

    const userData = USER_MAIN_DATA.find(user => user.id === parseInt(id));

    // Vérifier si l'utilisateur existe
    if (!userData) {
        return (
            <section className="dashboard-cont">
                <h1>Utilisateur non trouvé</h1>

            </section>
        );
    }

    // Récupérer le nom de l'utilisateur
    const { firstName } = userData.userInfos;
    const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = userData.keyData;

    return (
        <section className="dashboard-cont">
            <h1>Bonjour {firstName}</h1>
            <div className="user-stats">
                <p>Calories: {calorieCount}</p>
                <p>Protéines: {proteinCount}</p>
                <p>Glucides: {carbohydrateCount}</p>
                <p>Lipides: {lipidCount}</p>
            </div>
        </section>
    );
}

export default Dashboard;
