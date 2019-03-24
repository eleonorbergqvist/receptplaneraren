import React from 'react';

export interface InputProps { 
  type: string, 
  className: string,
  name: string,
  placeholder: string,
  value: string,
  onChange: any,
  onBlur: any,
  error: string,
};

const Input = (props: InputProps) => (
  <React.Fragment>
    <div className="field">
      <div className="control has-icons-left has-icons-right">
        <input               
          className={`${props.className} input`} 
          type={props.type} 
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange} 
          onBlur={props.onBlur}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-envelope"></i>
        </span>
        <span className="icon is-small is-right">
          <i className="fas fa-check"></i>
        </span>
      </div>
      {props.error && (  
        <p className="help is-success">{props.error}</p>
      )}
  </div>
  </React.Fragment>
);

export default Input;