import React, { useRef, useState } from "react";
import { Header } from "components/Header";
import { styled } from "styled-components";
import { MainLayout, PageLayout, ContentLayout } from 'components/MainLayout';
import { useBoundStore } from 'store/store';
import ReactMicrophone from "components/ReactMic";
// import { MessageScript } from "components/MessageScript";


const Canvas = styled.img`
    position: relative;
    width: 500px;
    height: 350px;
`

const JoinButton = styled.button`
    position: relative;
    height: 50px;
    width: 150px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 30px;
    color: white;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`

export function HomePage() {
    const [isLazy, setLazy] = useState(false);
    const sessionId = useBoundStore(state => state.sessionId);
    console.log(`Session ID at Home Page: ${sessionId}`);
    return (
        <MainLayout>
            <PageLayout>
                <Header
                    isSwitch={true}
                    switchValue={isLazy}
                    switchChange={setLazy}
                />
                <ContentLayout>
                    <ReactMicrophone
                        isHold={isLazy}
                    />
                    {/* <MessageScript /> */}
                </ContentLayout> 
            </PageLayout>
        </MainLayout>
    );
}