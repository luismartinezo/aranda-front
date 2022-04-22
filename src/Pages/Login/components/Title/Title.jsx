import React from "react";
import './Title.css';

const Title = (props) => {
    return (
        <div className="title-container">
           <h2> {props.text}</h2>
        </div>
    )
}
export default Title;