import React, { FormEvent } from "react";
import "./RecipeTags.css";

export interface RecipeTagProps {
  tags: iRecipeTag[];
  selectedTags: Number[];
  onToggleTag: any;
}

export interface iRecipeTag {
  name: string;
  id: number;
}

export const RecipeTags = (props: RecipeTagProps) => {
  const handleOnClick = (e: FormEvent, tag: iRecipeTag) => {
    e.preventDefault();

    props.onToggleTag(tag);
  }

  return (
    <div className="RecipeTags">
      {props.tags.map(tag => {
        const isSelected = props.selectedTags.includes(tag.id);

        return (
          <button
            className={isSelected ? "button selected" : "button not-selected"}
            onClick={e => handleOnClick(e, tag)}
            key={tag.id
          }>{tag.name}</button>
        )
      })}
    </div>
  )
}
