import styled from 'styled-components';
import { useBoundStore } from 'store/store';
import { useEffect, useRef } from 'react';


const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 10px 0;
`

const MessageTag = styled.div`
    width: 100%;
    height: fit-content;
    text-align: left;
    box-sizing: border-box;
    padding: 5px 10px;
    background-color: white;
    color: black;
    box-shadow: 1px 1px 10px 0px grey;
    border-radius: 10px;
    margin-bottom: 10px;
`

export default function ConversationScriptTag({ process }){
    const conversation = useBoundStore(state => state.conversation);
    const DisplayRef = useRef<HTMLDivElement | null>(null);

    const ScrollToBottom = () => {
        if (DisplayRef.current) {
            DisplayRef.current.scrollTop = DisplayRef.current.scrollHeight;
    }
    };
        useEffect(() => {
        ScrollToBottom();
    }, [process]);

    return (
        <Wrapper ref={DisplayRef}>
            {process ? (
                <>
                  {conversation.map((chat, index) => <MessageTag key={index}>{chat.content}</MessageTag>)}
                  <MessageTag>On Processing ...</MessageTag>
                </>
            ) : (
                conversation.map((chat, index) => <MessageTag key={index}>{chat.content}</MessageTag>)
            )}
        </Wrapper>
    );
}