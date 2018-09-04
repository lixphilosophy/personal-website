import React from 'react';
import styled from 'styled-components';

import {
  Container,
} from '../assets/style/ComponentStyle';

import AsciiArt from './AsciiArt';
import Terminal from './Terminal';

const ContentContainer = styled(Container)`
  display: flex;
  flex: 1;
`;

const Content = () => (
    <ContentContainer>
      <Terminal />
      <AsciiArt />
    </ContentContainer>
);

export default Content;
