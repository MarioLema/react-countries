import React, { Component } from "react";
class NavBar extends Component {
  render() {
    let style = this.props.style.currentTheme;
    return (
      <nav style={{ background: style.elements, color: style.color }}>
        <div>
          <h1>Where in the World?</h1>
          <button
            onClick={this.props.changeTheme}
            style={{ color: style.color }}
          >
            <i className="fas fa-moon" /> {this.props.style.theme}
          </button>
        </div>
      </nav>
    );
  }
}

export default NavBar;
