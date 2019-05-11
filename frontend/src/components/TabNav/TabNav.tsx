/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { Component } from "react";

interface TabNavProps {
  items: any,
  onChange: any,
  selected: any,
}

interface TabNavState {
  activeTab: number,
}

class TabNav extends Component<TabNavProps, TabNavState> {
  render() {
    const { items, onChange, selected } = this.props;

    return (
      <div className="tabs is-boxed is-centered">
        <ul>
          {items.map((item: any, index: number) => {
            return (
              <li
                key={index}
                className={item.value === selected ? "is-active" : ""}
              >
                <a
                  key={item.value}
                  onClick={e => onChange(item)}
                >{item.label}</a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default TabNav;
