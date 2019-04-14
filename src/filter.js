import React, { Component } from "react";
class SearchingSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regionMenuClasses: [`custom-options`]
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu(){
        let classes = [...this.state.regionMenuClasses];
        if(classes.indexOf(`revealed`) === -1){
            classes.push(`revealed`);
        }else{
            classes.pop(`revealed`);
        }
        this.setState({
            regionMenuClasses: classes
        })
    }
    
  render() {
    let style = this.props.style;
    return (
      <section className="search-options">
        <div
          className="search-box"
          style={{ background: style.elements, color: style.color }}
        >
          <i className="fas fa-search" />
          <input
          onChange={this.props.filterInput}
          maxLength="20"
            type="text"
            name=""
            id="search-input"
            placeholder="Search for a country..."
            style={{ color: style.color }}
          />
        </div>

        <div
          className="custom-select"
          style={{ background: style.elements, color: style.color }}
          onClick={this.toggleMenu}
        >
          <p>Filter by Region</p>
          <i className="fas fa-chevron-down" />
          <ul
            className={this.state.regionMenuClasses.join(` `)}
            style={{ background: style.elements, color: style.color }}
          >
            <li onClick={() => this.props.filterRegion(`All`)}>All</li>
            <li onClick={() => this.props.filterRegion(`Africa`)}>Africa</li>
            <li onClick={() => this.props.filterRegion(`Americas`)}>Americas</li>
            <li onClick={() => this.props.filterRegion(`Asia`)}>Asia</li>
            <li onClick={() => this.props.filterRegion(`Europe`)}>Europe</li>
            <li onClick={() => this.props.filterRegion(`Oceania`)}>Oceania</li>
          </ul>
        </div>
      </section>
    );
  }
}
export default SearchingSection;
