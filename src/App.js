import React, { Component } from 'react';
import './App.css';
const DARK = {
  background: `hsl(207, 26%, 17%)`,
  color: `hsl(0, 0%, 100%)`,
  elements: `hsl(209, 23%, 22%)`,
};
const LIGHT = {
  background: `hsl(0, 0%, 98%)`,
  color: `hsl(200, 15%, 8%)`,
  elements: `hsl(0, 0%, 100%)`,
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTheme: DARK,
      theme: `Dark Mode`,
      previousTheme: LIGHT,
      allCountries: [],
      displayedCountries: [],
      filteredCountries: [],
      detailCountry: null,
      currentPage: `home`,
    }
    this.changeTheme = this.changeTheme.bind(this);
  }

    changeTheme(){
    if(this.state.currentTheme === DARK){
          this.setState({
            currentTheme: LIGHT,
            theme: `Light Mode`
          });
    }else{
          this.setState({
            currentTheme: DARK,
            theme: `Dark Mode`
          });
    }
  }

  render() {
    return (
      <div className="App" style={{background: this.state.currentTheme.background }}>
      <NavBar style={this.state} changeTheme={this.changeTheme}/>
      <CurrentPage state={this.state}/>
      </div>
    );
  }
}

class NavBar extends Component {
  render() {
    let style = this.props.style.currentTheme;
    return (
      <nav style={{background: style.elements, color: style.color}}>
      <div>
          <h1>Where in the World?</h1>
          <button  onClick={this.props.changeTheme}  style={{color: style.color}}><i className="fas fa-moon"></i> {this.props.style.theme}</button>
      </div>
      </nav>
    );
  }
}

class CurrentPage extends Component {
  render() {

    if(this.props.state.currentPage === `home`){
      return (
        <React.Fragment>
          <SearchingSection style={this.props.state.currentTheme}/>
          <HomeSection />
        </React.Fragment>);
    }else{
      return <DetailSection />; 
    }
  }
}

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

class HomeSection extends Component {  
  render() {
    return (
      <section className="country-list">
      <CountryCard />
      <CountryCard />
      <CountryCard />
      <CountryCard />
      <CountryCard />
      <CountryCard />
      <CountryCard />
      <CountryCard />
      <CountryCard />
  </section>
    );
  }
}

class CountryCard extends Component {
  render(){
    return (
      <div className="country-card">
      <h1>Germany</h1>
      <ul>
          <li>Population: 81,000,000</li>
          <li>Region: Europe</li>
          <li>Capital: Berlin</li>
      </ul>

  </div>
    );
  }
}

class DetailSection extends Component {  
  render() {
    return (
      <section className="country-detail-container">
      <button className="mini-button return-button"><i className="fas fa-long-arrow-alt-left"></i> Back</button>
      <div className="country-details">
          <img src="https://restcountries.eu/data/col.svg" alt="" />

          <div>
              <h2>Belgium</h2>
              <div className="info-container">
              <ul>
                  <li><b>Native Name:</b> Belgie</li>
                  <li><b>Population:</b> 111002323</li>
                  <li><b>Region:</b> Europe</li>
                  <li><b>Subregion:</b> Western Europe</li>
                  <li><b>Capital:</b> Brussels</li>
              </ul>

              <ul>
                  <li><b>Top Level Domain:</b> .net</li>
                  <li><b>Currencies:</b> skdjn</li>
                  <li><b>Languages:</b> sssss,sssss,ssss</li>
              </ul>
          </div>
              <div>
                  <h3>Border Countries:</h3>
                  <div className="border-container">
                      <button className="mini-button">France</button>
                      <button className="mini-button">Germany</button>
                      <button className="mini-button">NetherLands</button>
                      <button className="mini-button">NetherLands</button>
                  </div>
              </div>
          </div>

      </div>
  </section>
    );
  }
}

export default App;
