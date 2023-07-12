import styled, {keyframes} from "styled-components";

export const LinkTest = styled.div`
    height: 100%;
    width: 20%;
    text-decoration: none;
    color: var(--Black);

    overflow: hidden;

    display: flex;
    flex-direction: column;
    background-color: var(--White);
    border: 1px solid var(--Color3);
    box-shadow: 0 0 15px var(--BlackBlur);

    border-radius: 20px;
    position: relative;

    &:hover {
        &> div{
            &:first-child > div  > img{
                transform: scale(1.2);
            }
            &:last-child{
                display: block;
            }
        }
    }

    @media (max-width: 1400px) {
        width: 200px;
    }
    @media (max-width: 1200px) {
        width: 150px;
    }
    @media (max-width: 500px) {
        width: 100%;
        height: 80px;
        flex-direction: row;
    }
`;

export const TestHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50%;
    position: relative;
    width: 100%;
    &> div{
        width: 100%;
        height: 100%;
        display: flex;
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: var(--Black);
        border-radius: 20px;
        overflow: hidden;

        &>img{
            max-width: 100%;
            max-width: 100%;
        }
    }
    &> span{
        position: absolute;
        background-color: var(--Color3);
        height: fit-content;
        width: fit-content;
        padding: 5px 7px;
        border-radius: 10px;
        top: 10px;
        left: 10px;
        color: var(--Black);

        display: flex;
        align-items: center;
        justify-content: center;
        &>svg{
            height: 15px;
        }
    }

    @media (max-width: 1200px) {
        height: 20%;
        &> div {
            display: none;
        }
        &>span{
            padding: 0;
            height: 80%;
            width: 87%;
            &>svg{
                height: 20px;
                
            }
        }
    }
    @media (max-width: 500px) {
        &>span{
            height: fit-content;
            padding: 5px 7px;
            width: fit-content;
            border-radius: 8px;
            &>svg{
                height: 10px;
            }
        }
        &>div{
            &>img {
                object-fit: cover;
            }
            display: flex;
        }
        height: 100%;
        width: 35%;
    }
`;

const inOut = keyframes`
    0%{
        right: 0;
    }
    50%{
        right: 5px;
    }
    100%{
        right: 0;
    }
`;

export const TestContent = styled.div`
    width: 100%;
    height: 55%;
    box-sizing: border-box;
    padding: 10px;
    &> div{
        width: 100%;
        display: flex;
        flex-direction: row;
        &:first-child{
            height: 35%;
            &>h1{
                margin: 0;
                font-size: 1.7vh;
                font-weight: bold;
            }
        }
        &:nth-child(2){
            height: 20%;
            align-items: center;
            gap: 10px;
            &>p{
                margin: 0;
                width: fit-content;
                display: flex;
                align-items: center;
                height: 15%;
                padding: 15px;
                font-size: 1.3vh;
                font-weight: bold;
                background-color: var(--Color3);
                border-radius: 20px;
                color: var(--Black);
                &:last-child{
                    background-color: var(--Black);
                    color: var(--White);
                }
            }
            
        }
        &:nth-child(3){
            height: 20%;
            align-items: center;
            &>p{
                margin: 0;
                font-size: 1.5vh;
            }
        }
        &:nth-child(4){
            height: 25%;
            display: flex;
            flex-direction: row;
            align-items: flex-end;

            &>button{
                border: none;
                border-radius: 30px;  
                height: 80%;
                width: 100%;
                background-color: var(--Black);
                display: flex;
                align-items: center;
                box-sizing: border-box;
                justify-content: space-between;
                padding: 0 10px;
                cursor: pointer;
                &>p{
                    width: 90%;
                    color: var(--White);
                    font-size: 1vh;
                    font-weight: bold;
                    text-align: left;
                }
                &>button {
                    border: none;
                    position:relative;
                    display: grid;
                    place-items: center;
                    background-color: var(--White);
                    border-radius: 20px;
                    height: 60%;
                    width: 30px;
                    cursor: pointer;
                }
                &:hover{
                    transform: scale(1.02);
                    background-color: var(--Color1);
                    box-shadow: 0 0 10px var(--Color1);
                    &> button {
                        width: 30%;
                        animation: ${inOut} 0.9s infinite linear;   
                        box-shadow: 0 0 10px var(--White);
                    }
 
                }
            }
        }
    }

    @media (max-width: 1200px) {
        height: 80%;
        &>div {
            &:nth-child(2) {
                height: 30%;
                flex-direction: column;
                align-items: flex-start;
                justify-content: space-evenly;
                gap: 0;
                &>p {
                    padding: 0;
                    height: fit-content;
                    background-color: transparent;
                    color: var(--Black); 
                    font-weight: normal;
                    &:last-child{
                        background-color: transparent;
                        color: var(--Black); 
                    }
                }
            }
            &:nth-child(3) {
                height: 10%;
            }
        }
    }
    @media (max-width: 500px) {
        width: 65%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &>div{
            &:first-child{
                height: 65%;
                &>h1{
                    font-size: 1.3vh;
                }
            }
            &:nth-child(2), &:nth-child(3) {
                display: none;
            }
            &:last-child{
                height: 35%;
                &>button{
                    height: 100%;
                    &>button> svg {
                        height: 10px;
                    }
                }
            }
        }
    }

`;

export const NothingHistory = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;
    background: var(--Color3);
    &>p {
        font-size: 1.9vh;
        color: var(--Color4);
        font-weight: bold;
    }
`;

export const LinkHistory = styled.a`
    position: relative; 
    height: 95px;
    width: 100%;
    text-decoration: none;
    color: var(--Black);

    box-sizing: border-box;
    padding: 1%;

    display: flex;
    flex-direction: row;
    background-color: var(--White);
    box-shadow: 0 0 15px var(--BlackBlur);
    margin: 20px 0;
    &> div {
        height: 100%;
        overflow: hidden;
    }
    &.failed{
        border-left: 5px solid var(--Color5);
    }
    &.verified{
        border-left: 5px solid var(--Color6);
    }
    
    &:hover {
        transform: scale(1.01);
        & > div {
            &:first-child{
                display: block;
            }
        }
    }
    @media (max-width: 500px) {
        height: 80px;
    }
`;

export const HistoryHeader = styled.div`
    height: 100%; 
    width: 50%;
    z-index:1;
    flex-direction: row;
    display: flex;
    align-items: center;
    &> p{
        margin: 0;
        font-weight: bold;
        font-size: 1.8vh;
    }
    @media (max-width: 1000px) {
        width: 70%;
    }
    @media (max-width: 500px) {
        &>p {
            font-size: 1.5vh;
        }
    }

`;
export const HistoryMain = styled.div`
    height: 100%; 
    width: 50%;
    z-index:1;
    flex-direction: row;
    display: flex;
    align-items: center;
    &> div{
        height: 100%;
        display: flex;
        &>p{
            margin: 0;
            font-size: 1.3vh;
        }
        &:first-child{
            width: 75%;
            flex-direction: column;
            justify-content: center;
        }
        &:last-child{
            width: 20%;
            align-items: center;
            justify-content: flex-end;
            &> p{
                font-weight: bold;
                font-size: 2vh;                
            }

        }
    }
    @media (max-width: 1000px) {
        width: 30%;
        &>div {
            &:first-child{
                display: none;
            }
            &:last-child{
                width: 100%;
            }
        }
    }
    
`;

const fromLeft = keyframes`
    from{
        left: -100%;
    }
    to{
        left: 0;
    }
`;

export const LayoutHover = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left:0;
    display: none;
    z-index: 0;

    &>span{
        position: absolute;
        height: 100%;
        animation: ${fromLeft} .1s linear;
        &:first-child{
            background-color: var(--Color4);
        }
        &:nth-child(2){
            background-color: var(--Color3);
        }        
        &:last-child{
            background-color: var(--Color6);
        }
    }
`;

export const ConfirmRedirect = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    top:0;
    left: 0;
    background-color: var(--BlackBlur);
    border-radius: 20px;

    display: grid;
    place-items: center;
    z-index: 1;

    &>div{
        height: 250px;
        width: 400px;

        border-radius: 20px;
        background-color: var(--White);
        box-shadow: 0 0 10px var(--BlackBlur);
        box-sizing: border-box;
        padding: 20px;
        
        display: flex;
        flex-direction: column;
        &>div {
            width: 100%;
            display: flex;
            &:first-child{
                height: 70%;
                align-items: center;
                &>p{
                    text-align: center;
                    font-size: 2vh;
                    font-weight: bold;
                }
            }
            &:last-child{
                height: 30%;
                align-items: flex-end;
                justify-content: space-between;
                &>a, &>button{
                    display: grid;
                    place-items: center;
                    cursor: pointer;
                    color: var(--Black);
                    box-sizing: border-box;
                    border: none;
                    text-decoration: none;
                    text-transform: none;
                    font-size: 1.7vh;
                    font-weight: bold;
                    border: 3px solid var(--Black);
                    border-radius: 15px;    
                    width: 49%;
                    height: 80%;
                }
                &>button:hover {
                    background-color: var(--Color3);
                    box-shadow: 0 0 10px var(--Color3);
                    color: var(--Black);
                }
                &> a{
                    background-color: var(--Black);
                    color: var(--White);
                    &:hover {
                        box-shadow: 0 0 10px var(--Black);
                    }
                }
            }
        }
    }
    @media (max-width:500px) {
        &>div{
            width: 90%;
        }
    }
`;