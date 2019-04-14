import React, { Component } from 'react';
class SearchingSection extends Component {  
    render() {
      let style = this.props.style;
      return (
        <section className="search-options">
        <div className="search-box" style={{background: style.elements, color: style.color}}>
            <i className="fas fa-search"></i>
            <input type="text" name="" id="search-input" placeholder="Search for a country..." style={{color: style.color}}/>
        </div>
  
        <div className="custom-select" style={{background: style.elements, color: style.color}}>
            <p>Filter by Region</p>
            <i className="fas fa-chevron-down"></i>
            <ul className="custom-options" style={{background: style.elements, color: style.color}}>
                <li>All</li>
                <li>Africa</li>
                <li>America</li>
                <li>Asia</li>
                <li>Europe</li>
                <li>Oceania</li>
            </ul>
        </div>
    </section>
      );
    }
  }
  export default SearchingSection;