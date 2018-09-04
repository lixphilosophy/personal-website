import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';

import Header from './Header';
import Drawer from './Drawer';
import Content from './Content'
import Footer from './Footer'

import {
  PrimaryColor,
  WhiteColor,
} from '../assets/style/Color';

injectGlobal`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .root {
    height: 100%;
  }

  .app {
    height: 100% !important;
    display: flex;
    display: -webkit-flex;
    -webkit-flex-direction: column;
    flex-direction: column;
  }

  html, body {
    -webkit-overflow-scrolling: touch;
    overflow: hidden;
    position: fixed;
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: ${PrimaryColor};
    font-family: Lekton, sans-serif;
    font-size: 10px;
    color: ${WhiteColor};
  }
`;

class App extends Component {
  render() {
    return (
      <div className="app">
        <Drawer ref={(ref) => this.drawer = ref}/>
        <Header onClick={() => this.drawer.showDrawer()} />
        <Content />
        <Footer />
      </div>
    )
  }
}

export default App;
