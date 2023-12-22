import React from 'react';
import '../../styles/keyData.scss';
import CardKeyData from "./CardKeyData";
import apple from '../../assets/apple.svg';
import cheeseburger from '../../assets/cheeseburger.svg';
import chicken from '../../assets/chicken.svg';
import fire from '../../assets/Path.svg';
function KeyData({ calorieCount, proteinCount, carbohydrateCount, lipidCount }) {
    return (
        <div className="user-stats">
            <div className="container-key-data">
                <CardKeyData image={fire} altText="Calories" backgroundColor="#FF00004D" />
                <div className="key-data-info">
                    <p className="stat">{calorieCount}Cal</p>
                    <p className="stat-name">Calories</p>
                </div>
            </div>
           <div className="container-key-data">
               <CardKeyData image={chicken} altText="Protéines" backgroundColor="#4AB8FF1A" />
               <div className="key-data-info">
                   <p className="stat">{proteinCount}g</p>
                   <p className="stat-name">Protéines</p>
               </div>
           </div>
            <div className="container-key-data">
                <CardKeyData image={apple} altText="Glucides" backgroundColor="#F9CE2361" />
                <div className="key-data-info">
                    <p className="stat">{carbohydrateCount}g</p>
                    <p className="stat-name">Glucides</p>
                </div>
            </div>
            <div className="container-key-data">
                <CardKeyData image={cheeseburger} altText="Lipides" backgroundColor="#FD51814A" />
                <div className="key-data-info">
                    <p className="stat">{lipidCount}g</p>
                    <p className="stat-name">Lipides</p>
                </div>
            </div>
        </div>
    );
}

export default KeyData;
