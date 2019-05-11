import React from "react";
import { FormikErrors } from "formik";
import classNames from 'classnames';

export interface InputProps {
  type: string;
  className: string;
  icon: string,
  name: string;
  placeholder: string;
  value: string;
  onChange: any;
  onBlur: any;
  error: string | FormikErrors<any>;
}

const Input = (props: InputProps) => {
  const hasError = Boolean(props.error)



  return (
    <div className="field">
      <div
        className={
          classNames('control', {
            'has-icons-left': props.icon,
            'has-icons-right': true
          })
        }
      >
        <input
          className={`${props.className} input`}
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        {props.icon &&
          <span className="icon is-small is-left">
            <i className={`fas fa-${props.icon}`} />
          </span>
        }

        {hasError &&
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-circle" />
          </span>
        }
      </div>
      {props.error && <p className="help is-danger">{props.error}</p>}
    </div>
  );
}

export default Input;
