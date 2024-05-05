
import { styled } from 'styled-components';
import { HtmlTooltip } from 'components/Tooltip';

type ButtonProps = {
    tooltip?: string | React.ReactNode;
    IconComponent: any; 
    onClick?: any;
};

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
    z-index: 2;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
    }
`

export function ActionButton({ tooltip, IconComponent, onClick } : ButtonProps){
    return (
        <HtmlTooltip title={tooltip} disableInteractive>
            <Wrapper onClick={onClick}>
                <IconComponent fontSize="large" />
            </Wrapper>
        </HtmlTooltip>
        );
}