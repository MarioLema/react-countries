import React, { Component } from 'react';
import './App.css';
const axios = require('axios');
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
      detailCountry: {
      flag: ``,
      name: ``,
      nativeName: ``,
      population: ``,
      region: ``,
      subregion: ``,
      capital: ``,
      topLevelDomain: ``,
      currencies: [],
      languages: [],
      },
      currentPage: `home`,
    }
    this.changeTheme = this.changeTheme.bind(this);
    this.displayDetail = this.displayDetail.bind(this);
    this.returnToHome = this.returnToHome.bind(this);
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

  componentDidMount() {
    axios.get(`https://restcountries.eu/rest/v2/all`)
    .then(function (response) {
      this.setState({
        allCountries: response.data,
        filteredCountries: response.data,
        displayedCountries: response.data,
        detailCountry: response.data[17]
      })
    }.bind(this))
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

  }

  displayDetail(event){
    let alphacode;
    if(event.target.classList.contains(`mini-button`)){
      alphacode = event.target.attributes.alphacode.value;
    }else{
      alphacode = event.target.closest(`.country-card`).attributes.alphacode.value;
    }
    let index = null;
    let i = 0;
    while(index === null && i < this.state.allCountries.length){
      if(this.state.allCountries[i].alpha3Code === alphacode) index = i;
      i++;
    }
    this.setState({
      detailCountry: this.state.allCountries[index],
      currentPage: `detailPage`
    });
  }

  returnToHome(){
    this.setState({currentPage: `home`})
  }


  render() {
    return (
      <div className="App" style={{background: this.state.currentTheme.background }}>
      <NavBar style={this.state} changeTheme={this.changeTheme}/>
      <CurrentPage state={this.state} detailMethod={this.displayDetail} returnMethod={this.returnToHome}/>
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
          <HomeSection countries={this.props.state} detailMethod={this.props.detailMethod}/>
        </React.Fragment>);
    }else{
      return <DetailSection allCountries={this.props.state.allCountries} country={this.props.state.detailCountry} detailMethod={this.props.detailMethod} returnMethod={this.props.returnMethod}/>; 
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
  
  listCountries(){
    let countries = this.props.countries.displayedCountries;
    let countriesArray = [];
    for(let i = 0; i < countries.length; i++){
      countriesArray.push(<CountryCard detailMethod={this.props.detailMethod} country={countries[i]} key={countries[i].numericCode}/>)
    }
    return countriesArray;
  }
  render() {

    return (
      <section className="country-list">
        {this.listCountries()}
      </section>
    );
  }
}

class CountryCard extends Component {

  render(){
    let country = this.props.country;
    return (
      <div className="country-card" onClick={this.props.detailMethod} alphacode={country.alpha3Code}>
      <div style={{backgroundImage: `url(${country.flag})` }}></div>
      <h1>{country.name}</h1>
      <ul>
          <li>Population: {country.population}</li>
          <li>Region: {country.region}</li>
          <li>Capital: {country.capital}</li>
      </ul>

  </div>
    );
  }
}

class DetailSection extends Component {
  
  currencyList(){
    let currencyString= [];
    let currenciesArray = this.props.country.currencies;
    for(let i = 0; i < currenciesArray.length; i++){
      currencyString.push(currenciesArray[i].name);
    }
    return currencyString.join(`, `);
  }
  languagesList(){
    let languageString= [];
    let languagesArray = this.props.country.languages;
    for(let i = 0; i < languagesArray.length; i++){
      languageString.push(languagesArray[i].name);
    }
    return languageString.join(`, `);
  }

  neighboursButtons(){
    let neighbours = this.props.country.borders;
    let countries = this.props.allCountries;
    let neighArray = [];
    for(let i = 0; i < neighbours.length; i++){
      for(let country of countries){
        if(country.alpha3Code === neighbours[i])
        neighArray.push(
          <button className="mini-button" alphacode={country.alpha3Code} onClick={this.props.detailMethod} key={country.alpha3Code}>{country.name}</button>)
      }
    }
    return neighArray;
  }
  render() {
    let country = this.props.country;
    return (
      <section className="country-detail-container">
      <button className="mini-button return-button" onClick={this.props.returnMethod}><i className="fas fa-long-arrow-alt-left"></i> Back</button>
      <div className="country-details">
          <img src={country.flag} alt="" />

          <div>
              <h2>{country.name}</h2>
              <div className="info-container">
              <ul>
                  <li><b>Native Name:</b> {country.nativeName}</li>
                  <li><b>Population:</b> {country.population}</li>
                  <li><b>Region:</b> {country.region}</li>
                  <li><b>Subregion:</b> {country.subregion}</li>
                  <li><b>Capital:</b> {country.capital}</li>
              </ul>

              <ul>
                  <li><b>Top Level Domain:</b> {country.topLevelDomain}</li>
                   <li><b>Currencies:</b> {this.currencyList()}</li>
                   <li><b>Languages:</b> {this.languagesList()}</li>
              </ul>
          </div>
              <div>
                  <h3>Border Countries:</h3>
                  <div className="border-container">
                  {this.neighboursButtons()}
                  </div>
              </div>
          </div>

      </div>
  </section>
    );
  }
}

export default App;
