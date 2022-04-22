import React from 'react';
import './Label.css';

const Label = ({text}) => {
    return (
        <div className="label">
            <div className="div">
           <h5 >{text}</h5> 
           </div>
        </div>
    )
};
export default Label;