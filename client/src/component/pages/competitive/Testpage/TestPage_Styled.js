import styled from "styled-components";

export const TestSection = styled.section`
    height: 100vh;
    width: 70%;

    margin: 0 auto;
    box-sizing: border-box;
    padding: 100px 0 0 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    z-index: 0;

    &> div {
        border-radius: 10px;
        box-sizing: border-box;
        padding: 20px;
    }


    @media (max-width: 1450px) {
        margin: 0 auto 0 0;
        width: 75%;
    }
    @media (max-width: 950px) {
        margin: 0 auto;
        width: 90%;
        padding: 150px 0 0 0;
    }
`;

export const ListQuesComp = styled.div`
    position: fixed;
    top: 100px;
    right: 50px;

    width: 300px;
    height: fit-content;   
    box-shadow: 0 0 20px var(--BlackBlur);
    background-color: var(--White);
    z-index: 1;
    overflow: hidden;
    @media (max-width: 1800px) {
        width: 250px;
        right: 30px; 
    }
    @media (max-width: 1450px) {
        width: 22%;
        right: 10px; 
    }
    @media (max-width: 950px) {
        width: 90%;
        height: 60px;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        &:hover {
            height: fit-content;
        }
    }
    
`;

export const ListQuesHeader = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;

    overflow: hidden;    
    &> p{
        width: 100%;
        font-weight: bold;
        font-size: 2vh;
        margin: 0;
    }
    @media (max-width: 1800px) {
        &> p{
            font-size: 1.5vh;
        }
    }
    @media (max-width: 950px) {
        height: 20px;
    }
`;

export const ListQuesBtn = styled.div`
    width: 100%;
    height: fit-content;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(5, 1fr);
    
    row-gap: 10px;
    margin: 10px 0;
    &> button{

        &.checked {
            background-color: var(--Color6);
        }
        &.notChecked {
            background-color: var(--White);
        }
        --sizeBtn: 45px;

        height: var(--sizeBtn);
        width: var(--sizeBtn);

        font-weight: bold;
        font-size: 1.3vh;

        border-radius: 100%;
        border: 1px solid var(--Color2);
        color: var(--Black);

        cursor: pointer;
        margin: 0;

        &:hover {
            background-color: var(--Color3);
            transform: scale(1.05);
        }
    }
    @media (max-width: 1800px) {
        row-gap: 15px;
        &>button {
            font-size: 1.2vh;
            --sizeBtn: 40px;
        }
    }
    @media (max-width: 1200px) {
        row-gap: 5px;
        &>button {
            --sizeBtn: 35px;    
        }
        
    }
    @media (max-width: 950px) {
        grid-template-columns: repeat(10, 1fr);
        row-gap: 10px;
        margin: 20px 0 10px;
    }
    @media (max-width: 550px) {
        grid-template-columns: repeat(5, 1fr);
        row-gap: 10px;
        margin: 20px 0;
    }

`;

export const ListQuesSubmitBtn = styled.div`
    margin: 15px 0;
    height: 40px;
    &> button{
        height: 100%;
        width: 50%;

        border: none;
        font-weight: bold;
        font-size: 1.3vh;

        border-radius: 10px;
        background-color: var(--Color2);
        color: var(--White);

        cursor: pointer;
        margin: 0;

        &:hover {
            background-color: var(--Color3);
            color: var(--Black);
        }
    }
    @media (max-width: 950px) {
        margin: 10px 0;
        display: flex;
        align-items: center;
        &>button {
            width: 30%;
            height: 100%;
        }
    }
`;

export const ListQuesTimer = styled.div`
    width: 100%;
    height: 30px;
    margin: 10px 0;
    &> p{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 2.3vh;
        font-weight: bold;
        color: var(--Wrong);
    }
    @media (max-width: 950px) {
        margin: 0;
        position: absolute;
        top: 15px;
        right: 20px;
        width: fit-content;
        &>p {
            margin: 0;
            font-size: 1.5vh;
        }

    }
`;

export const TestInfoComp = styled.div`
    position: fixed;
    top: 100px;
    left: 50px;

    width: 300px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 20px var(--BlackBlur);
    &> div{
        width: 100%;
    }
    @media (max-width: 1800px) {
        width: 250px;
        left: 30px; 
    }
    @media (max-width: 1450px) {
        display: none;
    }
`;

export const TestInfoHeader = styled.div`
    height: 180px;
    overflow: hidden;

    border-radius: 10px;
    background-color: var(--Black);
    display: grid;
    place-items: center;
    &> img{
        max-width: 100%;
        max-height: 100%;
    }


`;

export const TestInfoName = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    margin: 20px 0;
    &> p{
        margin: 0;
        font-size: 2.2vh;
    }
`;

export const TestInfomain = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    &> p{
        margin: 0;
        font-size: 1.5vh;
    }
`;

export const MainTestComp = styled.div`
    position: relative;
    width: 90%;
    height: 90%;
    justify-content: flex-start;
    z-index: 0;

    &>div{
        width: 100%;
    }

    @media (max-width: 950px) {
        margin: 0 auto;
        width: 100%;
    }
`;

export const MainTestDefault = styled.div`
    height: fit-content;
    &> p {
        text-align: left;
        font-size: 2vh;
    }
`;

export const MainTestAQues = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    &> div{
        width: 100%;
    }
`;

export const AQuesHeader = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    &>div {
        width: 100%;
    }
`;

export const AQuesContext = styled.div`
    height: fit-content;
    &> p {
        &>b{
            border-bottom: 3px solid var(--Color3);
        }
        text-align: left;
        font-size: 1.8vh;
    }
`;
export const AQuesImg = styled.div`
    min-height: 300px;
    max-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--Black);
    border-radius: 10px;
    overflow: hidden;

    &> img{
        height: 250px;
    }
    
    @media (max-width: 1200px) {
        min-height: 200px;
        max-height: 200px;
        &> img{
            height: 220px;
        }
    }
    
    @media (max-width: 950px) {
        min-height: 150px;
        max-height: 150px;
        &> img{
            height: 120px;
        }
    }
    @media (max-width: 550px) {
        min-height: 100px;
        max-height: 100px;
        &> img{
            height: 80px;
        }
    }
`;

export const AQuesMain = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    &> div{
        width: 100%;
        height: fit-content;
        margin: 5px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        cursor: pointer;
        padding: 15px 10px;
        border-radius: 10px;
        &:hover {
            background-color: var(--Color3);
        }
        &:active{
            transform: scale(0.98);
        }
        &> div{
            width: 20px;
            height: 20px;
            position: relative;
            border: 2px solid var(--Color1);
            border-radius: 100%;
            &.nothing{
                &::after{
                    display: none;
                }
            }
            &.checked{
                &::after{
                    display: block;
                }
            }
            &:after{
                content: "";
                position: absolute;
                height: 50%;
                width: 50%;
                background-color: var(--Color1);
                border-radius: 100%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        &> p{
            margin: 0 0 0 10px;
            width: 95%;
            height: fit-content;
            display: flex;
            align-items: center;
            font-size: 1.8vh;
        }
    }
`;


export const PopupResults = styled.div`
    position: fixed;
    z-index: 2;

    &> div:first-child {
        position: fixed;
        top:0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: black;
        opacity: .1;
        z-index: 0;
    }

`;

export const ControlButton= styled.div`
    position: absolute; 
    bottom: 0;
    left: 0;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &>button {
        height: 50%;
        width: 120px;
        cursor: pointer;
        border-radius: 15px;
        background-color: var(--White);
        box-sizing: border-box;
        border: 3px solid var(--Black);
        font-size: 1.4vh;
        font-weight: bold;
        &:last-child {
            background-color: var(--Black);
            color: var(--White);
        }
        &:hover{
            background-color: var(--Color1);
            color: var(--White);
            box-shadow: 0 0 10px var(--Color1);
        }
    }


`;

export const ResultsMain = styled.div`
    position: fixed;
    width: 30%;
    height: fit-content;

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: var(--White);
    box-shadow: 0 0 10px grey;
    box-sizing: border-box;
    padding: 20px 30px;
    opacity: 1;

    &> div{
        width: 100%;
        display: flex;
    }
    @media (max-width: 1200px) {
        width: 400px;
        height: fit-content;
    }
    @media (max-width: 550px) {
        width: 100%;
        height: 100%;
        justify-content: space-between;
    }
`;
export const ResultsMainHeader = styled.div`
    flex-direction: column;
    height: 100px;
    border-bottom: 2px solid var(--Black);
    padding-bottom: 10px;
    &> p{
        margin: 1px 0;
        font-size: 1.4vh;
    }

`;
export const ResultsMainBody = styled.div`
    flex-direction: column;
    height: 300px;
    justify-content: center;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid var(--Black);
    &> div{
        &:first-child   {
            margin: 5% 0 0;
            &> div{
                width: 150px;
                height: 150px;
                border-radius: 100%;
                border: 8px solid var(--Black);
                display: flex;
                flex-direction: column;
                &> span {
                    height: 60%;
                    width: 100%;
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    &> svg{
                        height: 60%;
                    }
                }
                &> p{
                    height: 40%;
                    font-size: 1.6vh;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    margin: 0;
                }
            }               
        }
     
        &:last-child {
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            &>p {
                font-weight: bold;
                font-size: 3vh;
                color: var(--Black);
            }
        }
    }

`;

export const ResultsMainbtnReturn = styled.div`
    height: 70px;
    margin: 5% 0 0 ;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    &> a{
        text-decoration: none;
        color: var(--Black);
        font-size: 1.5vh;
        font-weight: bold;
        height: 100%;
        width: 49%;
        border-radius: 10px;
        box-sizing: border-box;
        border: 3px solid  var(--Black);

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &:first-child{
            background-color: var(--Color3);
        }
        &:last-child{
            background-color: var(--White);
        }
        &:hover {
            background-color: var(--Color1);
            color: var(--White);
        }
    }
`;
