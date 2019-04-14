import React, { Component } from 'react';

class HomeSection extends Component {  
  
    listCountries(){
      let countries = this.props.state.displayedCountries;
      let countriesArray = [];
      for(let i = 0; i < countries.length; i++){
        countriesArray.push(<CountryCard detailMethod={this.props.detailMethod} country={countries[i]} key={countries[i].numericCode} style={this.props.state.currentTheme}/>)
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
      let style = this.props.style;
      return (
        <div className="country-card" onClick={this.props.detailMethod} alphacode={country.alpha3Code} style={{background: style.background, color: style.color }}>
        <div style={{backgroundImage: `url(${country.flag})` }}></div>
        <h1>{country.name}</h1>
        <ul>
            <li><b>Population:</b> {country.population}</li>
            <li><b>Region:</b> {country.region}</li>
            <li><b>Capital:</b> {country.capital}</li>
        </ul>
  
    </div>
      );
    }
  }

export default HomeSection;