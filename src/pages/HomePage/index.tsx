import React, { useRef, useState } from "react";
import { Header } from "components/Header";
import { styled } from "styled-components";
import { MainLayout, PageLayout, ContentLayout } from 'components/MainLayout';
import ScriptSide from "./ScriptSide";
import ActionSide from "./ActionSide";

interface SideLayout {
    width?: string;
    isBorder?: boolean;
}

const SideLayout = styled.div<SideLayout>`
    width: ${props => (props.width)};
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;
    border: ${props => (props.isBorder ? "1px solid grey;" : "unset")};
    border-radius: ${props => (props.isBorder ? "30px" : "unset")};
`

export function HomePage() {
    const [isLazy, setLazy] = useState(false);
    const [process, setProcess] = useState(false);
    
    return (
        <MainLayout>
            <PageLayout>
                <Header
                    isSwitch={true}
                    switchValue={isLazy}
                    switchChange={setLazy}
                />
                <ContentLayout>
                    <SideLayout width={'30%'}>
                        <ActionSide
                            isLazy={isLazy}
                            process={process}
                            setProcess={setProcess}/>
                    </SideLayout>
                    <SideLayout width={'60%'}>
                        <ScriptSide process={process}/>
                    </SideLayout>
                </ContentLayout> 
            </PageLayout>
        </MainLayout>
    );
}