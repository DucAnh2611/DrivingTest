import styled from "styled-components";

export const MainNav=styled.nav`
    position: fixed;
    width: 100%;
    height: 60px;
    background: var(--Black);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing:border-box;
    padding: 0 10%;
    box-shadow: 0 0 10px var(--BlackBlur);
    z-index: 2;
`;

export const LogoNav = styled.a`
    text-decoration: none;
    height: 100%;
    width: fit-content;
    display:flex;
    align-items: center;
    justify-content: flex-start;
    color: var(--White);
    &>span{
        margin-right: 10px;
        &>svg{
            height: 25px;
        }
    }
    &>p{
        text-transform: uppercase;
        font-size: 1.5vh;
        font-weight: bolder;
    }
    @media (max-width: 700px) {
        & {
            width: 70%;
        }
    }
`;

export const UserNav = styled.div`
    height: 100%;
    width: 50%;
    display:flex;
    align-items: center;
    justify-content: flex-end;
    color: var(--Black);
    position: relative;
    @media (max-width: 700px) {
        & {
            width: 30%;
        }
    }

`;

export const UserNavAvatar = styled.div`
    height: 100%;
    width: fit-content;

    &, &>div {
        display: flex;
        align-items:center;
        justify-content: center;
    }
    &> div {
        height: 35px;
        width: 35px;
        border-radius: 100%;
        overflow: hidden;
        border: 2px solid var(--Black);
        &> img{
            max-width: 100%;
            max-height: 100%;
        }
    }
`;
export const UserName = styled.div`
    height: 100%;
    width: 75%;
    display: flex;
    align-items:center;
    color: var(--White);  
    padding: 0 10px;
    &> p{
        text-align: right;
        width: 100%;
        font-size: 1.6vh;
        font-weight: bold;
        text-transform: capitalize;
    }
    @media (max-width: 700px) {
        & {
            display: none;
        }
    }
`;

export const UserMenuBtn = styled.div`
    height: 100%;
    width: fit-content;
    padding: 0 10px;
    &, &>button> span {
        display: flex;
        align-items:center;
        justify-content: center; 
    }
    &> button{
        height: 30px;
        width: 30px;
        border-radius: 100%;
        background: var(--Color2);
        border: none;
        cursor: pointer;
        padding: 0;
        &:hover {
            background: var(--Color3);
            &>span {
                color: var(--Black);
            }
        }
        &>span{
            color: var(--White);
            height: 100%;
            width: 100%;
            &> svg{
                height: 12px;
            }
        }

    }
`;
export const MenuMain = styled.div`
    position: absolute;
    height: fit-content;
    border-radius: 10px;
    overflow: hidden;
    width: 400px;
    bottom: 0;
    transform: translateY(105%);
    right: 0;
    background: var(--Black);
    box-shadow: 0 0 10px var(--Black);
    box-sizing: border-box;
    padding: 15px;

    @media (max-width: 1000px) {
        width: 300px;
    }
    @media (max-width: 450px) {
        width: 250px;
    }
`;
export const MenuPart = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    padding: 5px 0;
    &> div{
        width: 100%;
    }

`;

export const MenuPartHeader = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--White);
    &> p{
        color: var(--White);
        font-size: 1.6vh;
        font-weight: bold;
        text-transform: uppercase;
    }

    
`;

export const MenuPartContent = styled.div`
    height: fit-content;
    display: grid;
    flex-direction: column;
    &>div{
        width: 100%;
        height: auto;
        display: grid;
        grid-template-columns: 1fr 2fr;
        box-sizing: border-box;
        border: 1px solid var(--Black);
        margin: 5px 0;
        &> p{
            width: 100%;
            height: 100%;
            text-decoration: none;
            color: var(--White);
            margin: 0;
            min-height: 40px;
            display: flex;
            align-items: center;
            word-break: break-word;
            font-size: 1.4vh;

            &>b {
                margin-right: 10px;
            }
        }
        &:hover {
                background-color: var(--Color2);
                border-bottom: 1px solid var(--White);
        }
    }
    & >a{
        margin: 2px 0;
        text-decoration: none;
        color: var(--White);
        margin: 0;
        min-height: 40px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        font-size: 1.4vh;
        &:hover {
                background-color: var(--Color2);
                border-bottom: 1px solid var(--White);
            }
    }
    @media screen and (max-width: 1650px) {
        &>a {
            &:last-child{
                display: none;
            }
        }
    }
`;
