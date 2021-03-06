import React from "react";
import "./IngredientsInput.css";

export interface IngredientsInputProps {
  index: number,
  amount?: number,
  measurement?: string,
  ingredient: string,
  onChange: Function,
  onDelete: Function,
}

// TODO: volume = 0, mass = 1, piece = 2
const MEASUREMENT_LIST: {label: string, type: number}[] = [
  {label: 'ml', type: 0},
  {label: 'l', type: 0},
  {label: 'dl', type: 0},
  {label: 'tbs', type: 0},
  {label: 'tbsp', type: 0},
  {label: 'fl-oz', type: 0},
  {label: 'cup', type: 0},
  {label: 'pnt', type: 0},
  {label: 'qt', type: 0},
  {label: 'gal', type: 0},
  {label: 'pint', type: 0},
  {label: 'mg', type: 1},
  {label: 'g', type: 1},
  {label: 'kg', type: 1},
  {label: 'oz', type: 1},
  {label: 'lb', type: 1},
  {label: 'piece', type: 2},
  {label: 'large', type: 2},
  {label: 'small', type: 2},
  {label: 'medium', type: 2},
];

const IngredientsInput = (props: IngredientsInputProps) => {

  const handleDelete = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onDelete(props.index);
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { onChange, ...ingredient } = props

    props.onChange(props.index, {
      ...ingredient,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  return (
    <div className="field has-addons">
      <div className="control">
        <input
          type="text"
          name="amount"
          className="IngredientsInput__Amount input"
          placeholder="Amount"
          value={props.amount}
          onChange={handleChange}
        />
      </div>
      <div className="control">
        <div className="IngredientsInput__Measure select">
          <select name="measurement" value={props.measurement || ""} className="IngredientsInput__Select" onChange={handleChange}>
            <option value="" disabled hidden>Choose</option>
            {MEASUREMENT_LIST.map((x, index) =>
              <option key={index}>{x.label}</option>
            )}
          </select>
        </div>
      </div>

      <div className="control is-expanded">
        <input
         type="text"
          className="IngredientsInput__Ingredient input"
          name="ingredient"
          placeholder="Ingredient"
          value={props.ingredient}
          onChange={handleChange}
        />
      </div>

      <div className="control">
        <button onClick={handleDelete} className="button is-danger">
          <span className="icon">
            <i className="fas fa-trash-alt"></i>
          </span>
        </button>
      </div>

    </div>
  )
};

export default IngredientsInput;
