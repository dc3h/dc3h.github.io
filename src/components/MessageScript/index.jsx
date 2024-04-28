import MessageIcon from '@mui/icons-material/Message';
import { styled } from 'styled-components';

const Wrapper = styled.div`
    color: white;
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.1s;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
    }
`

export function MessageScript(){
    return (
        <Wrapper>
            <MessageIcon fontSize="large"></MessageIcon>
        </Wrapper>
        );
}