import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Tabs.css";
import { render } from "react-dom";
import { Interface } from "readline";

export interface TabContentProps {
  mealType: string;
  // ingredients: [],
  // preparation: string,
  // image: string,
  // portions: number,
}

const TabContent = (props: TabContentProps) => (
  <div className="content tabs__mealContainer columns">
    <div className="column">
      <h3>{props.mealType}</h3>
      <h5>Ingredients</h5>
      <ul>
        <li>Ingedient</li>
        <li>Ingedient</li>
        <li>Ingedient</li>
        <li>Ingedient</li>
        <li>Ingedient</li>
        <li>Ingedient</li>
      </ul>
    </div>
    <div className="column">
      <h5>Preparation</h5>
      <p>
        Ut ac enim quis diam fermentum malesuada facilisis eget velit. Etiam at
        urna ut urna suscipit gravida id sit amet nunc. Morbi dapibus, nulla sed
        gravida ultrices, ipsum augue suscipit nibh, sit amet tempor felis nunc
        sed tortor. Donec mattis id nunc ac euismod. Curabitur mauris lacus,
        gravida eu tempor ac, laoreet quis nibh. Nulla mattis, leo ut vehicula
        convallis, ligula sem sagittis justo, eget imperdiet neque augue quis
        est. Curabitur lacinia viverra erat, vehicula interdum velit gravida
        non. Aliquam erat volutpat.
      </p>
    </div>
    <div className="column">
      <div className="card">
        <div className="card-image">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder image"
          />
        </div>
        <div className="card-content">
          <p>Portions: 10</p>
          <p>Tags: Fun, Easy</p>
        </div>
      </div>
      <br />
      <button className="button">Browse new</button>
    </div>
  </div>
);

export const Tabs = () => (
  <React.Fragment>
    <div className="tabs tabs__dayNav">
      <ul>
        <li className="is-active tabs__dayNav--Mo">
          <a>Monday</a>
        </li>
        <li className="tabs__dayNav--Tu">
          <a>Tuesday</a>
        </li>
        <li className="tabs__dayNav--We">
          <a>Wednesday</a>
        </li>
        <li className="tabs__dayNav--Th">
          <a>Thursday</a>
        </li>
        <li className="tabs__dayNav--Fr">
          <a>Friday</a>
        </li>
        <li className="tabs__dayNav--Sa">
          <a>Saturday</a>
        </li>
        <li className="tabs__dayNav--Su">
          <a>Sunday</a>
        </li>
      </ul>
    </div>

    <div className="tabs__dayContainer">
      <TabContent mealType="Breakfast" />
      <hr />
      <TabContent mealType="Lunch" />
      <hr />
      <TabContent mealType="Dinner" />
    </div>
  </React.Fragment>
);
