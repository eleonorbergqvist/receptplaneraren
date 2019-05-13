import React from "react";

interface DayMealListProps {
  meals: any,
  renderMealItem: any,
  renderMissingMeal: any,
}

const DayMealList = (props: DayMealListProps) => {
  const meals = props.meals || [];

  const mealsByType = meals.reduce((acc:any, daymeal:any) => {
    let mealsByType = acc[daymeal.meal_type] || [];
    mealsByType = [...mealsByType, daymeal];
    acc[daymeal.meal_type]= mealsByType;
    return acc;
  }, new Array(3).fill(
    []
  ))

  return (
    <div className="DayMealList">
      {mealsByType.map((items:any, mealType:number) => {
        if (!items.length) return props.renderMissingMeal(mealType)
        return items.map((item:any) => props.renderMealItem(item))
      })}
    </div>
  )
}

export default DayMealList;
