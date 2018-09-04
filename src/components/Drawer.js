import React, { Component } from 'react';
import styled from 'styled-components';

import {
  PrimaryColor,
  SecondaryColor,
} from '../assets/style/Color';

import {
  Medium,
  BaseZIndex
} from '../assets/style/Dimension';

import {
  GithubAddress,
  LinkedinAddress,
  InstagramAddress
} from '../assets/static/TerminalConfig';

const Menu = styled.div`
  ${props => props.open}
  position: fixed;
  display: none;
  top: 0;
  right: 0;
  width: 6rem;
  height: 100%;
  background-color: ${SecondaryColor};
  box-shadow: 1rem 0 3rem rgba(0, 0, 0, 0.3);
  z-index: ${BaseZIndex + 20};
  transition: transform 150ms ease-out;

  @media (max-width: ${Medium}) {
    display: inline-block;
  }
`;

const menuClose = {
  transform: 'translateX(100%)'
};

const menuOpen = {
  transform: 'translateX(0%)'
};

const Tabs = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: column;
  list-style: none;
  align-items: center;
`;

const MenuButton = styled.button`
  height: 100%;
  padding: 1 0rem;
  border: none;
  color: ${PrimaryColor};
  font-size: 2.3rem;
  cursor: pointer;
  background: transparent;

  &:focus, &:hover {
    outline: none;
  }
`;

const Tab = styled.li`
  padding: 1rem 0;
`;

const TabLink = styled.a`
  text-decoration: none;
  color: ${PrimaryColor};
  font-size: 2.3rem;
`;

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
    this.showDrawer = this.showDrawer.bind(this);
    this.hideDrawer = this.hideDrawer.bind(this);
  }

  showDrawer() { this.setState({ drawerOpen: true }); };
  hideDrawer() { this.setState({ drawerOpen: false }); };

  render() {
    let drawerStyle = menuClose;
    if (this.state.drawerOpen) {
      drawerStyle = menuOpen;
    }

    return (
      <Menu style={drawerStyle}>
        <Tabs>
          <Tab>
            <MenuButton onClick={this.hideDrawer}>
              <i className="fas fa-sign-in-alt"></i>
            </MenuButton>
          </Tab>
          <Tab>
            <TabLink href={GithubAddress} target="_blank">
              <i className="fab fa-github" />
            </TabLink>
          </Tab>
          <Tab>
            <TabLink href={LinkedinAddress} target="_blank">
              <i className="fab fa-linkedin" />
            </TabLink>
          </Tab>
          <Tab>
            <TabLink href={InstagramAddress} target="_blank">
            <i className="fab fa-instagram" />
            </TabLink>
          </Tab>
        </Tabs>
      </Menu>
    );
  }
};


export default Drawer;
