import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Main from '../components/Main/Main';
import Daily from '../components/Daily/Daily';
import Hourly from '../components/Hourly/Hourly';
import Spinner from '../UI/Spinner/Spinner';

import classes from './App.css';
import Detail from '../components/Sidebar/Detail/Detail';
import About from '../components/Sidebar/About/About';

import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

// import image from '../assets/image';

class App extends Component {
  state = {
    time: {
      hh: new Date().getHours(),
      mm: new Date().getMinutes()
    }
  };

  componentDidMount() {
    function updateTime(t) {
      if (t < 10) return "0" + t;
      else return t;
    };
    setInterval(() => {
      this.setState({
        time: { hh: updateTime(new Date().getHours()), mm: updateTime(new Date().getMinutes()) }
      });
    }, 1000);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.time.mm === this.state.time.mm &&
      nextProps.isAvail === this.props.isAvail &&
      nextProps.loading === this.props.loading) return false;
    else return true;
  }

  render() {
    return (
      <div className={classes.App} style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url(${this.props.image})`
      }} >
        <div className={classes.Weather}>
          <Main time={this.state.time} />
          {this.props.loading ? <Spinner /> : null}
          {this.props.isAvail ? <>
            <Daily />
            <Hourly />
          </> : null}
        </div>
        <div className={classes.Sidebar}>
          <Detail />
          <About />
        </div>
      </div >);
  };
};

const mapStateToProps = (state) => {
  return {
    image: state.image,
    loading: state.loading,
    isAvail: state.dataAvailable
  };
};

export default connect(mapStateToProps)(withErrorHandler(App, axios));