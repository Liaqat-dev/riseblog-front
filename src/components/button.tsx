import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    titleStyle?: string;
    buttonStyles?: string;
}

function Button({ title,buttonStyles,titleStyle, ...rest }: Props) {
    return <button className={`bg-blue flex items-center rounded-full px-3 cursor-pointer py-[6px] mx-0.5 +${buttonStyles}`} {...rest}><span style={{lineHeight:1}} className={` text-white text-center align-middle  font-light + ${titleStyle}`}>{title}</span></button>

}

export default Button;
