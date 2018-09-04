import React from 'react';
import styled from 'styled-components';

import {
  Container,
} from '../assets/style/ComponentStyle';

import {
  SecondaryColor,
  GrayColor,
  WhiteColor,
  PinkColor,
} from '../assets/style/Color';

import {
  Medium
} from '../assets/style/Dimension';

import {
  GithubAddress,
  LinkedinAddress,
  InstagramAddress
} from '../assets/static/TerminalConfig';

const HeadContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${GrayColor};
`;

const Title = styled.div`
  padding-top: 0.8vh;
  font-size: 4rem;
  @media (max-width: ${Medium}) {
    padding-top: 0.5vh;
    font-size: 3.5rem;
  }
`;

const DrawerButtonContainer = styled.div`
  display: none;
  @media (max-width: ${Medium}) {
    display: inline-block;
  }
`;

const DrawerButton = styled.button`
  height: 100%;
  padding: 0 1rem;
  border: none;
  color: ${WhiteColor};
  font-size: 2.3rem;
  cursor: pointer;
  background-color: ${SecondaryColor};

  &:focus, &:hover {
    outline: none;
    color: ${PinkColor};
  }
`;

const Menu = styled.div`
  display: flex;
  width: 50%;
  background-color: ${SecondaryColor};
  @media (max-width: ${Medium}) {
    display: none;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const Tabs = styled.ul`
  display: flex;
  height: 100%;
  margin: 0;
  padding: 0 4%;
  align-items: center;
`;

const Tab = styled.li`
  display: inline-block;
  padding: 0 1vw;
`;

const TabLink = styled.a`
  text-decoration: none;
  color: ${WhiteColor};
  font-size: 2.5rem;
  outline: none;

  &:focus, &:hover {
    color: ${PinkColor};
  }
`;

const Header = (prop) => (
  <HeadContainer>
    <Title>MLi.</Title>
    <DrawerButtonContainer>
      <DrawerButton onClick={prop.onClick}>
        <i className="fas fa-bars"></i>
      </DrawerButton>
    </DrawerButtonContainer>
    <Menu>
      <Spacer />
      <Tabs>
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
  </HeadContainer>
);

export default Header;

