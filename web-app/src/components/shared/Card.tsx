import React from "react";
import './styles/Card.css';

interface CardProps{
    className?: string,
    children?:  JSX.Element | JSX.Element[],
}

function Card(props: CardProps) {
    const { children, className } = props;

    return <div className={"card-container " + className}>
        {children}
    </div>;
}

export default Card;