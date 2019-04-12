import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    return (
      <div className="App">
      <NavBar />
      <SearchingSection />
      <HomeSection />
      <DetailSection />  
      </div>
    );
  }
}

class NavBar extends App {  
  render() {
    return (
      <nav>
      <div>
          <h1>Where in the World?</h1>
          <button><i className="fas fa-moon"></i> Dark Mode</button>
      </div>
      </nav>
    );
  }
}

class SearchingSection extends App {  
  render() {
    return (
      <section className="search-options">
      <div className="search-box">
          <i className="fas fa-search"></i>
          <input type="text" name="" id="search-input" placeholder="Search for a country..." />
      </div>

      <div className="custom-select">
          <p>Filter by Region</p>
          <i className="fas fa-chevron-down"></i>
          <ul className="custom-options">
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

class HomeSection extends App {  
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

class CountryCard extends HomeSection {
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

class DetailSection extends App {  
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
