import React, { Component } from 'react';
import HomeSection from './homepage';
import SearchingSection from './filter';
import DetailSection from './detailPage';


class CurrentPage extends Component {
    render() {
  
      if(this.props.state.currentPage === `home`){
        return (
          <React.Fragment>
            <SearchingSection style={this.props.state.currentTheme}/>
            <HomeSection state={this.props.state} detailMethod={this.props.detailMethod}/>
          </React.Fragment>);
      }else{
        return <DetailSection state={this.props.state} detailMethod={this.props.detailMethod} returnMethod={this.props.returnMethod}/>; 
      }
    }
  }

  export default CurrentPage;