import React, { Component } from "react";

class DetailSection extends Component {
  //RETURNS A STRING WITH THE CURRENCIES OF THE COUNTRY
  currencyList() {
    let currencyString = [];

    let currenciesArray = this.props.state.detailCountry.currencies;
    for (let i = 0; i < currenciesArray.length; i++) {
      currencyString.push(currenciesArray[i].name);
    }
    return currencyString.join(`, `);
  }

  //RETURNS A STRING WITH THE LANGUAGES OF THE COUNTRY
  languagesList() {
    let languageString = [];
    let languagesArray = this.props.state.detailCountry.languages;
    for (let i = 0; i < languagesArray.length; i++) {
      languageString.push(languagesArray[i].name);
    }
    return languageString.join(`, `);
  }

  //RETURNS AN ARRAY OF BUTTONS THAT CAN BE CLICKED TO ACCESS THE NEIGHBOUR COUNTRIES
  neighboursButtons() {
    let neighbours = this.props.state.detailCountry.borders;
    let countries = this.props.state.allCountries;
    let style = this.props.state.currentTheme;
    let neighArray = [];
    for (let i = 0; i < neighbours.length; i++) {
      for (let country of countries) {
        if (country.alpha3Code === neighbours[i])
          neighArray.push(
            <button
              className="mini-button"
              alphacode={country.alpha3Code}
              onClick={this.props.detailMethod}
              key={country.alpha3Code}
              style={{ background: style.background, color: style.color }}
            >
              {country.name}
            </button>
          );
      }
    }
    return neighArray;
  }

  render() {
    let country = this.props.state.detailCountry;
    let style = this.props.state.currentTheme;
    return (
      <section className="country-detail-container">
        <button
          className="mini-button return-button"
          onClick={this.props.returnMethod}
          style={{ background: style.background, color: style.color }}
        >
          <i className="fas fa-long-arrow-alt-left" /> Back
        </button>
        <div className="country-details">
          <img src={country.flag} alt="" />

          <div style={{ color: style.color }}>
            <h2>{country.name}</h2>
            <div className="info-container">
              <ul>
                <li>
                  <b>Native Name:</b> {country.nativeName}
                </li>
                <li>
                  <b>Population:</b> {country.population}
                </li>
                <li>
                  <b>Region:</b> {country.region}
                </li>
                <li>
                  <b>Subregion:</b> {country.subregion}
                </li>
                <li>
                  <b>Capital:</b> {country.capital}
                </li>
              </ul>

              <ul>
                <li>
                  <b>Top Level Domain:</b> {country.topLevelDomain}
                </li>
                <li>
                  <b>Currencies:</b> {this.currencyList()}
                </li>
                <li>
                  <b>Languages:</b> {this.languagesList()}
                </li>
              </ul>
            </div>
            <div>
              <h3>Border Countries:</h3>
              <div className="border-container">{this.neighboursButtons()}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default DetailSection;
