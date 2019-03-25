import React from "react";
import { Link } from "react-router-dom";

export interface PrimaryMenuButtonProps {
  text: string;
  link: string;
  class: string;
}

const PrimaryMenuButton = (props: PrimaryMenuButtonProps) => (
  <Link className={`${props.class} button`} to={props.link}>
    {props.text}
  </Link>
);

export default PrimaryMenuButton;
