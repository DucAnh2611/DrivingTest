import styled, { keyframes } from "styled-components";

const eclipsis1 = keyframes`
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
`;
const eclipsis3 = keyframes`
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
`;
const eclipsis2 = keyframes`
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(24px, 0);
    }
`;

export const LoadingMain = styled.div`
    & { 
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 3;
        background-color: var(--White);
        display: grid;
        place-items: center;
    }
    & div {
        & {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
        }
        & div {
        position: absolute;
        top: 33px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: var(--Black);
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
        }
        & div:nth-child(1) {
            left: 8px;
            animation: ${eclipsis1} 0.6s infinite;
        }
        & div:nth-child(2) {
            left: 8px;
            animation: ${eclipsis2} 0.6s infinite;
        }
        & div:nth-child(3) {
            left: 32px;
            animation: ${eclipsis2} 0.6s infinite;
        }
        & div:nth-child(4) {
            left: 56px;
            animation: ${eclipsis3} 0.6s infinite;
        }
    }

`;
