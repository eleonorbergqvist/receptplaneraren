import React from "react";
import { Link } from "react-router-dom";

export interface PrimaryMenuButtonProps {
  text: string;
  link: string;
  className: string;
}

const PrimaryMenuButton = (props: PrimaryMenuButtonProps) => (
  <Link className={`${props.className} button`} to={props.link}>
    {props.text}
  </Link>
);

export default PrimaryMenuButton;
