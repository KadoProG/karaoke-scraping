import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
);
