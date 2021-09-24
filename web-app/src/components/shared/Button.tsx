import React from 'react';
import './styles/Button.css'

interface ButtonProps {
    children: any,
    className?: string,
    color?: "primary" | "secondary" | "submit" | "disabled",
    type?: "button" | "submit" | "reset" | undefined,
    disabled? : boolean,
    onClick?: any
}

function Button (props: ButtonProps){
    let { 
            children, 
            className, 
            type, 
            color = "primary", 
            disabled = false,
            onClick} = props;
    
    if(disabled){
        color = 'disabled';
    }

    return <button 
            disabled={disabled} 
            className={"button-container " + color + " " + className} 
            type={type}
            onClick={onClick}>
        {children}
    </button>
}

export default Button;