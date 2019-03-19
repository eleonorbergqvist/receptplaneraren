import React from "react";
import "./Card.css";

export interface CardProps {content: string, image: string, alt: string};

export const Card = (props: CardProps) => (
  <div className="card">
      <div className="card-image">
          <figure className="image is-4by3">
          <img src={props.image} alt={props.alt} />
          </figure>
      </div>
      <div className="card-content">
          <div className="content">
            {props.content}
          </div>
      </div> 
  </div>
)

