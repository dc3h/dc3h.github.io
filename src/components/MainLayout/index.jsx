import { styled } from "styled-components";
import { StyleConstants } from "styles/style-constant";

export const MainLayout = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding: 8%;
`

export const PageLayout = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    /* border: 1px solid white; */
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
`

export const ContentLayout = styled.div`
    position: relative;
    height: calc(100% - ${StyleConstants.HEADER_HEIGHT});
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding: 30px 0px;
    border: 1px solid grey;
    border-radius: 30px;
`