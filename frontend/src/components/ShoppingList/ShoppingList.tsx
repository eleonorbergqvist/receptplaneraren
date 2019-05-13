import React from "react";

interface ShoppingListProps {
  items: any,
}

const ShoppingList = (props: ShoppingListProps) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th><abbr title="Amount">Amount</abbr></th>
          <th>Measurement</th>
          <th><abbr title="Ingredient">Ingredient</abbr></th>
        </tr>
      </thead>
      <tfoot>
        {props.items.map((ingredient: any, index: number) => {
          return (
            <tr key={index}>
              <td>{ingredient.amount}</td>
              <td>{ingredient.measurement}</td>
              <td>{ingredient.ingredient.name}</td>
            </tr>
          )
        })}
      </tfoot>
    </table>
  )
}

export default ShoppingList;
