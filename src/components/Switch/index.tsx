import styled from 'styled-components';
import { useState } from 'react';
// import { useBoundStore } from 'store/store';
// import plane from 'assets/canvas/plane.png';
// import stars from 'assets/canvas/stars.png';
// import clouds from 'assets/canvas/clouds.png';

interface SwitchProps {
  status?: boolean;
}

const SwitchWrapper = styled.div<SwitchProps>`
  position: relative;
  width: 80px;
  height: 28px;
  border-radius: 30px;
  background: ${props => (props.status ? '#EB518F' : '#65B79A')};
  display: flex;
  justify-content: 'left';
  align-items: center;
  box-sizing: border-box;
  transition: all 0.5s ease-out;
  color: ${props => (props.status ? 'white' : 'white')};
  cursor: pointer;
  /* overflow: hidden; */
`;

const SwitchScroll = styled.div<SwitchProps>`
  position: relative;
  left: ${props => (props.status ? 'calc(100% - 40px);' : '0%;')};
  width: 40px;
  height: 40px;
  background: ${props => (props.status ? 'lightgrey' : 'lightyellow')};
  border-radius: 50%;
  margin: 2px 0px;
  cursor: pointer;
  transition: all 0.5s ease-out;
  z-index: 2;

  &:hover {
    box-shadow: 0px 0px 10px grey;
  }
`;

const ContentText = styled.h4`
  position: absolute;
  z-index: 1;
  left: 42%;
  font-size: 20px;
`;

interface ImageProps {
  width?: string;
  height?: string;
  left?: string;
  top?: string;
  scale?: string;
}
const TransImage = styled.img<ImageProps>`
  position: absolute;
  width: ${props => props.width};
  height: ${props => props.height};
  left: ${props => props.left};
  top: ${props => props.top};
  transform: ${props => props.scale};
  transition: all 1s ease-in-out;
  z-index: 0;
`;

export default function Switch({ value, changeFunction }) {
  const scrollClicked = () => {
    changeFunction(!value);
  };
  return (
    <SwitchWrapper status={value} onClick={scrollClicked}>
      <SwitchScroll onClick={scrollClicked} status={value} />
      {/* <ContentText>{status ? 'VI' : 'EN'}</ContentText> */}
      {/* <TransImage
        src={stars}
        width={'80px'}
        height={'80px'}
        left={'3px'}
        top={'-20px'}
        scale={status ? 'scale(1.5)' : 'scale(0)'}
      />
      <TransImage
        src={clouds}
        width={'140px'}
        height={'70px'}
        left={status ? '0px' : '0px'}
        top={status ? '140px' : '5px'}
        scale={'scale(1)'}
      />
      <TransImage
        src={plane}
        width={'100px'}
        height={'30px'}
        left={status ? '-100px' : '70px'}
        top={status ? '-10px' : '20px'}
        scale={'scale(1)'}
      /> */}
    </SwitchWrapper>
  );
}
