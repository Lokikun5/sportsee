import React from 'react';
import '../../styles/cardKeyData.scss';
function CardKeyData({ image, altText, backgroundColor }) {
    return (
        <div className="card" style={{ backgroundColor: backgroundColor }}>
            <img src={image} alt={altText} />
        </div>
    );
}

export default CardKeyData;
