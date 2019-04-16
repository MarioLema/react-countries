//IMPORT REACT
import React, { Component } from "react";

//IMPORT COMPONENTS
import HomeSection from "./homepage";
import SearchingSection from "./filter";
import DetailSection from "./detailPage";

class CurrentPage extends Component {
  render() {
    if (this.props.state.currentPage === `home`) {
      return (
        <React.Fragment>
          <SearchingSection
            region={this.props.state.region}
            style={this.props.state.currentTheme}
            filterInput={this.props.filterInput}
            filterRegion={this.props.filterRegion}
          />
          <HomeSection
            state={this.props.state}
            detailMethod={this.props.detailMethod}
          />
        </React.Fragment>
      );
    } else {
      return (
        <DetailSection
          state={this.props.state}
          detailMethod={this.props.detailMethod}
          returnMethod={this.props.returnMethod}
        />
      );
    }
  }
}

export default CurrentPage;
