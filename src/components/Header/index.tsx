import { styled } from 'styled-components';
import { StyleConstants } from 'styles/style-constant';
import Switch from 'components/Switch';
import { LoginButton } from 'components/Login';
import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';


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
  const handleButtonClick = () => {
    toast.warn('This feature is on developing', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    })
  }
  return (
    <HeaderWrapper>
      <LogoContent>J-Talkative.</LogoContent>
      <Content onClick={handleButtonClick}>IELTS Talk</Content>
      <Content onClick={handleButtonClick}>Interview Talk</Content>
      {isSwitch !== undefined ? (
        <Switch
          value={switchValue}
          changeFunction={switchChange}
          tooltip={
            <Fragment>
              <Typography color="inherit">Hold to Speak Switch</Typography>
              {"Turn on this button to activate hold button to speak instead of click to speak"}
            </Fragment>
          }
        />) : <></>}
      <LoginButton />
    </HeaderWrapper>
  );
}
