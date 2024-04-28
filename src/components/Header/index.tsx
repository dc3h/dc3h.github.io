import { styled } from 'styled-components';
import { StyleConstants } from 'styles/style-constant';
import Switch from 'components/Switch';
import { LoginButton } from 'components/Login';


const HeaderWrapper = styled.div`
  position: relative;
  height: ${StyleConstants.HEADER_HEIGHT};
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LogoContent = styled.h1`
  color: white;
  font-family: 'Poppins', sans-serif;
`;

const Content = styled.h3`
  color: white;
  font-family: 'Courier New', Courier, monospace;
  cursor: pointer;
  text-decoration: unset;
  transition: all 1s;

  &:hover {
    text-decoration: underline;
  }
`;


export function Header({ isSwitch, switchValue, switchChange }) {
  return (
    <HeaderWrapper>
      <LogoContent>J-Talkative.</LogoContent>
      <Content>IELTS Talk</Content>
      <Content>Interview Talk</Content>
      {isSwitch !== undefined ? <Switch value={switchValue} changeFunction={switchChange} /> : <></>}
      <LoginButton />
    </HeaderWrapper>
  );
}
