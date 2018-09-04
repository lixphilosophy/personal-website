import React from 'react';
import styled from 'styled-components';
import { say } from 'cowsay-browser';

import {
  Medium
} from '../assets/style/Dimension';

import {
  SecondaryColor
} from '../assets/style/Color';

import {
  CowsayConfig
} from '../assets/static/CowsayConfig';

const AsciiArtContainer = styled.div`
  position: relative;
  width: 50%;
  background-color: ${SecondaryColor};
  overflow-y: hidden;
  @media (max-width: ${Medium}) {
    display: none;
  }
`;

const Artboard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  white-space: pre-wrap;
  transform: translate(-50%, -50%);
  font-size: 1.62vw;

`;

const Cowsay = say({
  text: CowsayConfig.text[Math.floor(Math.random()*CowsayConfig.text.length)],
  f: CowsayConfig.cow[Math.floor(Math.random()*CowsayConfig.cow.length)],
  e: CowsayConfig.eyes[Math.floor(Math.random()*CowsayConfig.eyes.length)],
  n: CowsayConfig.wrap,
  W: CowsayConfig.wrapLength,
  mode: CowsayConfig.mode[Math.floor(Math.random()*CowsayConfig.mode.length)],
})

const AsciiArt = () => (
  <AsciiArtContainer>
    <Artboard>
      {Cowsay}
    </Artboard>
  </AsciiArtContainer>
);

export default AsciiArt;
