import React from "react";
import "./IngredientsInput.css";
import * as uz from 'unitz-ts';

export interface IngredientsInputProps {
  index: number,
  amount?: number,
  measurement?: string,
  ingredient: string,
  onChange: Function,
  onDelete: Function,
}

uz.Classes.addDefaults();

// volume = 0, mass = 1, piece = 2
const MEASUREMENT_LIST: {label: String, type: Number}[] = [
  {label: 'ml', type: 0},
  {label: 'l', type: 0},
  {label: 'tbs', type: 0},
  {label: 'fl-oz', type: 0},
  {label: 'cup', type: 0},
  {label: 'pnt', type: 0},
  {label: 'qt', type: 0},
  {label: 'gal', type: 0},
  {label: 'mg', type: 1},
  {label: 'g', type: 1},
  {label: 'kg', type: 1},
  {label: 'oz', type: 1},
  {label: 'lb', type: 1},
  {label: 'piece', type: 2},
];

//const findMeasureUnit = (amount: number, measurement: number) => {
//}

const IngredientsInput = (props: IngredientsInputProps) => {

  const handleDelete = (_e: React.FormEvent<HTMLButtonElement>) => {
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
          <select name="measurement" value={props.measurement || undefined} className="IngredientsInput__Select" onChange={handleChange}>
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
          Delete
        </button>
      </div>

    </div>
  )
};

export default IngredientsInput;
