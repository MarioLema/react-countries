//REACT IMPORT
import React, { Component } from "react";

//COMPONENTS IMPORTS
import NavBar from "./navbar";
import CurrentPage from "./pageloader";

//STYLING IMPORTS
import "./App.css";

//AXIOS
const axios = require("axios");

//COLOR THEME VARIABLES
const DARK = {
  background: `hsl(207, 26%, 17%)`,
  color: `hsl(0, 0%, 100%)`,
  elements: `hsl(209, 23%, 22%)`
};
const LIGHT = {
  background: `hsl(0, 0%, 98%)`,
  color: `hsl(200, 15%, 8%)`,
  elements: `hsl(0, 0%, 100%)`
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTheme: DARK,
      theme: `Dark Mode`,
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
        languages: []
      },
      currentPage: `home`,
      region: `Filter by Region`
    };
    this.changeTheme = this.changeTheme.bind(this);
    this.displayDetail = this.displayDetail.bind(this);
    this.returnToHome = this.returnToHome.bind(this);
    this.filterInput = this.filterInput.bind(this);
    this.filterRegion = this.filterRegion.bind(this);
    this.bottomScroll = this.bottomScroll.bind(this);
  }

  //CHANGES THE COLOR THEME OF THE PAGE
  changeTheme() {
    if (this.state.currentTheme === DARK) {
      this.setState({
        currentTheme: LIGHT,
        theme: `Light Mode`
      });
    } else {
      this.setState({
        currentTheme: DARK,
        theme: `Dark Mode`
      });
    }
  }

  //REMOVES THE SCROLL EVENT LISTENER
  componentWillUnmount() {
    window.removeEventListener("scroll", this.bottomScroll);
  }
  //MAKES AN API REQUEST WHEN THE COMPONENT IS LOADED / ADDS A SCROLL LISTENER
  componentDidMount() {
    window.addEventListener("scroll", this.bottomScroll);
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(
        function(response) {
          this.setState({
            allCountries: response.data,
            filteredCountries: response.data,
            displayedCountries: response.data.slice(0, 11)
          });
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  }

  //DISPLAYS THE DETAIL PAGE BASED ON THE ALPHACODE OF THE CLICK EVENT
  displayDetail(event) {
    let alphacode;
    if (event.target.classList.contains(`mini-button`)) {
      alphacode = event.target.attributes.alphacode.value;
    } else {
      alphacode = event.target.closest(`.country-card`).attributes.alphacode
        .value;
    }
    let index = null;
    let i = 0;
    while (index === null && i < this.state.allCountries.length) {
      if (this.state.allCountries[i].alpha3Code === alphacode) index = i;
      i++;
    }
    this.setState({
      detailCountry: this.state.allCountries[index],
      currentPage: `detailPage`
    });
  }

  //SETS THE VIEW BACK TO THE HOMEPAGE
  returnToHome() {
    this.setState({ currentPage: `home` });
  }

  //FILTERS COUNTRIES BY INPUT
  filterInput(event) {
    let input = new RegExp(event.target.value, "i");
    let filteredCountries = this.state.allCountries.filter(function(country) {
      //check values in different properties of the object
      if (input.length === 2 && input.test(country.alpha2Code)) return true;
      if (input.length === 3 && input.test(country.alpha3Code)) return true;
      if (input.length === 3 && input.test(country.numericCode)) return true;
      if (input.test(country.name)) return true;
      if (input.test(country.nativeName)) return true;
      for (let i = 0; i < country.altSpellings.length; i++) {
        if (input.test(country.altSpellings[i])) return true;
      }
      for (let lan in country.translations) {
        if (input.test(country.translations[lan])) return true;
      }
      return false;
    });
    let displayedCountries =
      filteredCountries.length > 11
        ? filteredCountries.slice(0, 11)
        : filteredCountries;
    this.setState({
      filteredCountries: filteredCountries,
      displayedCountries: displayedCountries
    });
  }

  //FILTERS COUNTRIES DEPENDING ON THE REGION PASSED AS ARGUMENT
  filterRegion(region) {
    if (region === `All`) {
      this.setState({
        displayedCountries: this.state.allCountries.slice(0, 11),
        filteredCountries: this.state.allCountries,
        region: region
      });
    } else {
      let filteredCountries = this.state.allCountries.filter(
        country => country.region === region
      );
      let displayedCountries =
        filteredCountries.length > 11
          ? filteredCountries.slice(0, 11)
          : filteredCountries;
      this.setState({
        displayedCountries: displayedCountries,
        filteredCountries: filteredCountries,
        region: region
      });
    }
  }

  //IF THE BOTTOM OF THE PAGE IS REACHED, CONCAT MORE COUNTRIES TO DISPLAY ARRAY
  bottomScroll(event) {
    let domHeight = document.body.clientHeight - window.innerHeight;
    if (
      domHeight === event.pageY &&
      this.state.displayedCountries.length !==
        this.state.filteredCountries.length
    ) {
      let newDisplayed = [...this.state.displayedCountries];
      let nextDisplay = this.state.filteredCountries.slice(
        newDisplayed.length,
        newDisplayed.length + 11
      );
      this.setState({
        displayedCountries: [...newDisplayed, ...nextDisplay]
      });
    }
  }

  render() {
    return (
      <div
        className="App"
        style={{ background: this.state.currentTheme.background }}
      >
        <NavBar style={this.state} changeTheme={this.changeTheme} />
        <CurrentPage
          state={this.state}
          detailMethod={this.displayDetail}
          returnMethod={this.returnToHome}
          filterInput={this.filterInput}
          filterRegion={this.filterRegion}
        />
      </div>
    );
  }
}

export default App;
