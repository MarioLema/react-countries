import React, { Component } from 'react';
import NavBar from './navbar';
import CurrentPage from './pageloader';
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

  //CHANGES THE COLOR THEME OF THE PAGE
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

  //MAKES A REQUEST WHEN THE COMPONENT IS LOADED
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

  //DISPLAYS THE DETAIL PAGE BASED ON THE ALPHACODE OF THE CLICK EVENT
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

  //SETS THE VIEW BACK TO THE HOMEPAGE
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










export default App;
