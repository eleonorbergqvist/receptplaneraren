import React from 'react';

export interface InputProps { 
  type: string, 
  class: string,
  name: string,
  placeholder: string,
  onChange: any,
};

export const Input = (props: InputProps) => (
  <input               
    className={`${props.class} input`} 
    type={props.type} 
    placeholder={props.placeholder}
    name={props.name} 
    onChange={props.onChange}  
  />
);