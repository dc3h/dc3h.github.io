import styled from 'styled-components';
import { HtmlTooltip } from 'components/Tooltip';

interface SwitchStyledProps {
  status?: boolean;
}

type SwitchProps = {
  value: boolean,
  changeFunction: Function,
  tooltip?: string | React.ReactNode
};

const SwitchWrapper = styled.div<SwitchStyledProps>`
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

const SwitchScroll = styled.div<SwitchStyledProps>`
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

export default function Switch({ value, changeFunction, tooltip } : SwitchProps) {
  const scrollClicked = () => {
    changeFunction(!value);
  };
  return (
    <HtmlTooltip title={tooltip} disableInteractive>
      <SwitchWrapper status={value} onClick={scrollClicked}>
        <SwitchScroll onClick={scrollClicked} status={value} />
      </SwitchWrapper>
    </HtmlTooltip>
  );
}
