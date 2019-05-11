import React, { FormEvent } from "react";
import IngredientsInput from '../IngredientsInput/IngredientsInput';
import { iIngredient } from '../RecipeEditForm/RecipeEditForm';
// TODO: Add render prop

interface InputListProps {
  items: iIngredient[],
  onChange: any,
}

export const emptyIngredient: iIngredient = {
  amount: 0,
  measurement: "",
  ingredient: "",
}

/* eslint jsx-a11y/anchor-is-valid: 0 */
const InputList = (props: InputListProps) => {
  const handleChange = (index: number, item: any) => {
    const items = [
      ...props.items.slice(0, index),
      item,
      ...props.items.slice(index+1),
    ];

    props.onChange(items);
  }

  const handleAddItem = (e: FormEvent) => {
    e.preventDefault();

    props.onChange([
      ...props.items,
      emptyIngredient,
    ]);
  }

  const handleDelete = (index: number) => {
    console.log('delete');
    const items = [
      ...props.items.slice(0, index),
      ...props.items.slice(index+1),
    ];

    props.onChange(items);
  }

  return (
    <div>
      <div>
        {props.items.map((x, index) =>
          <IngredientsInput
            {...x}
            key={index}
            index={index}
            onChange={handleChange}
            onDelete={handleDelete}
          />)}
      </div>

      <div className="field">
        <p className="control">
          <a className="button" href="#" onClick={handleAddItem}>
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
            <span>Add row</span>
          </a>
        </p>
      </div>
    </div>
  )
}

export default InputList;
