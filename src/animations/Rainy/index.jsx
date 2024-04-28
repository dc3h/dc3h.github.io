import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const animateRainFall = keyframes`
    0% {
        transform: translateY(-200px);
    }

    100% {
        transform: translateY(100rem);
    }
`;


const RainyBackground = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    z-index: 1;
    top: -100%;
    opacity: 1;
    /* transition: top 5s, opacity 6s; */
`

const RainLine = styled.i`
    position: absolute;
    height: 200px;
    background: linear-gradient(transparent, white);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    animation: ${animateRainFall} 2s linear infinite;
`

function Rainy() {
    const rainBgRef = useRef();

    const createRain = () => {
        let amount = 20;
        let body = rainBgRef.current;
        body.style.top = '0%';
        // body.style.opacity = "1";
        for (let i=0; i<amount; i++){
            console.log("rain");
            let drop = document.createElement('RainLine');
            let size = Math.random()*5;
            let posX = Math.floor(Math.random()*window.innerWidth);
            let delay = Math.random()*-20;
            let duration = Math.random()*5;
            drop.style.width = 0.2+size+'px';
            drop.style.left = posX+'px';
            drop.style.animationDelay = delay+'s';
            drop.style.animationDuration = 2 + duration+'s';
            body.appendChild(drop);
        }
    }

    useEffect(() => {
        createRain();
    }, []);

    return (
        <RainyBackground className="rain-bg" ref={rainBgRef} />
    );
}

export default Rainy;
