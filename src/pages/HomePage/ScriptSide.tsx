import styled from "styled-components";
import { useState } from 'react';
import JobDescriptionTag from "./JobDescription";
import CurriculumVitaeTag from "./CurriculumVitae";
import ConversationScriptTag from "./ConversationScript";

interface ScriptBoxProps {
    active?: Boolean;
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const ScriptBox = styled.div<ScriptBoxProps>`
    width: 100%;
    height: ${props => (props.active ? "calc(100% - 40px*2 - 10px*2)" : "40px")};
    min-height: 20px;
    border: 1px solid grey;
    border-radius: 30px;
    box-sizing: border-box;
    padding: 10px 20px;
    color: white;
    font-family: 'Poppins';
    margin-bottom: 10px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
    }
`

export default function ScriptSide({ process }){
    const [active, setActive] = useState(2);
    const tagNames = ['Job Description', 'Curriculum Vita', 'Conversation Script'];
    const tagElements = [
        <JobDescriptionTag />,
        <CurriculumVitaeTag />,
        <ConversationScriptTag process={process}/>
    ];

    const handleOnclick = (idx) => {
        setActive(idx)
    }
    return (
        <Wrapper>
            {tagNames.map((tag, index) => {
                return <ScriptBox
                    active={active==index}
                    onClick={()=>{handleOnclick(index)}}
                >{active==index ? tagElements[index] : tag}</ScriptBox>
            })}
        </Wrapper>
    );
}

