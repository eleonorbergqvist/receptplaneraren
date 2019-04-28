import React from "react";
import { FormikErrors } from "formik"; 

export interface SelectProps {
  itemsArray: any[],
  name: string,
  value: string,
  onChange: any,
  onBlur: any,
  // error: string | FormikErrors<any>,
}

const Select = (props: SelectProps) => (
  <div className="field">
    <div className="select">
      <select className="select" 
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      >
      {props.itemsArray.map((item, index) =>     
                <option key={index}>{item}</option>
              )}
      </select>
    </div>
    {/* {props.error && <p className="help is-danger">{props.error}</p>} */}
  </div>
);

export default Select;