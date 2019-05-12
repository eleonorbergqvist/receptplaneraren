import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export interface PrimaryMenuDropdownProps {
  className: string,
  buttonClassName: string,
  label: string,
  items: any,
}

class PrimaryMenuDropdown extends PureComponent<PrimaryMenuDropdownProps> {
  state = {
    open: false,
  }

  handleToggleClick = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  render() {
    return (
      <div className={`dropdown ${this.state.open ? "is-active" : ""} ${this.props.className}`}>
        <div className="dropdown-trigger">
          <button
            onClick={this.handleToggleClick}
            className={`${this.props.buttonClassName} button`}
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>{this.props.label}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {this.props.items.map((link: any, index: number) => (
              <Link key={index} to={link.to} className="dropdown-item">{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default PrimaryMenuDropdown;
