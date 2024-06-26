import React from "react";

import styles from "@/components/input/TextField.module.scss";

interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  type: "text" | "password" | "number";
  onChange?: (value: string) => void;
  multiline?: boolean;
  readonly?: boolean;
}

export const TextField: React.FC<TextFieldProps> = (props) => {
  return (
    <div className={styles.TextField}>
      <label htmlFor={props.name}>{props.label}</label>
      {props.multiline ? (
        <textarea
          id={props.name}
          value={props.value}
          onChange={(e) => props.onChange?.(e.target.value)}
          readOnly={props.readonly}
        />
      ) : (
        <input
          id={props.name}
          type={props.type}
          value={props.value}
          onChange={(e) => props.onChange?.(e.target.value)}
          readOnly={props.readonly}
        />
      )}
    </div>
  );
};
