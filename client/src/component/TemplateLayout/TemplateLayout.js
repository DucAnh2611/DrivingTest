import styled from "styled-components";

export const VerifyDiv = styled.div`
    height: 100vh;
    width: 100%;
    overflow: hidden auto;
    background-color: var(--Black);

    display: grid;
    place-items: center;
`;

export const VerifySection = styled.section`
    height: fit-content;
    min-height: 10%;

    width: 450px;

    overflow: hidden hidden;
    box-sizing: border-box;
    padding: 30px;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;

    background-color: var(--White);
    border-radius: 10px;
    box-shadow: 0 0 10px var(--Black);

    @media (max-width:450px) {
        width: 100%;
        border-radius: 0;
    }
`;

export const VerifyFieldDiv = styled.div`
    height: fit-content;
    width: 100%;

    overflow: hidden;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    &>p{
        margin: 30px 0 50px;
        font-size: 2.6vh;
        width: 100%;
        height: fit-content;
        text-align: center;
        font-weight: bold;

    }
    &> button{
       height: 50px;
       width: 49%; 

       box-sizing:border-box;
       padding: 10px;
       border: none;
       border-radius: 10px;
       cursor: pointer;

       font-size: 1.8vh;
       font-weight: bold;

       &:first-child{
        &:disabled{
            background-color: var(--Color3);
            cursor: default;
            &:active{
                transform: none;
            }
        }
        background-color: var(--Color2);
        color: var(--White);
       }
       &:last-child{
        background-color: var(--White);
        border: 3px solid var(--Color2);
        color: var(--Black);
       }
       &:hover {
        background-color: var(--Color1);
        color: var(--White);
       }
       &:active{
        transform: scale(0.9);
       }

    }
    @media (max-width:450px) {
        &>p{
            height: fit-content;
        }
    }
`;


export const VerifyInputDiv = styled.div`
    width: 100%;
    height: 80px;
    
    box-sizing: border-box;
    position: relative;

    margin: 10px 0;
    &>p{
        margin:0;
        color: var(--Wrong);
        font-size: 1.2vh;
        text-align: left;
    }
    &>input{
        position: relative;
        height: 75%;
        width: 100%;
        
        box-sizing: border-box;
        padding: 0 10px;

        font-size: 1.6vh;
        font-weight: 400;
        color: var(--Black);

        border: 3px solid var(--Color3);
        border-radius: 10px;
        background-color: transparent;
        
        z-index: 1;

        &:focus{
            outline: none;
            border-color: var(--Color2);
        }
    }
    &>span {
        background-color: var(--White);
        position: absolute;
        top: 37%;
        left: 10px;

        transform: translateY(-50%);
        padding: 0 5px;
        
        color: var(--Color2);
        font-size: 1.4vh;
        font-weight: 400;

        z-index: 0;

    }
    & > input:valid ~ span, & > input:focus ~ span{
        z-index:1;
        top:0;
        background-color: var(--White);
    }
`;
export const PageSection = styled.section`
    height: 100vh;
    width: 70%;

    margin: 0 auto;
    box-sizing: border-box;
    padding: 100px 0 50px ;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: transparent;

    &>div{
        width: 100%;
        display: flex;
        flex-direction: column;

        background-color: var(--White);
        border-radius: 10px;
        &> div {
            box-sizing: border-box;
        }
    }
`;
export const PageFirstDiv = styled.div`
    height: 55%;
    @media (max-width: 1200px) {
        height: 45%;
    }
    @media (max-width: 500px) {
        height: 35%;
    }
`
export const PageSectDiv = styled.div`
    height: 45%;
    @media (max-width: 1200px) {
        height: 55%;
    }
    @media (max-width: 500px) {
        height: 65%;
    }
`
export const PageSectionHeader = styled.div`
    height: 60px;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & >div {
        height: 100%;
    }  
`;
export const PageSectionHeaderTitle = styled.div`
    display: flex;
    align-items: center;
    &>h1 {
        width: 100%;
        text-overflow: ellipsis;
        font-size: 2.5vh;
        font-weight: bold;
        text-align: left;
    }
`

export const PageSectionHeaderSearch = styled.div`
    justify-content: flex-end;
    display: flex;
    align-items: center;
    &>input {
        width: 300px;
        height: 70%;
        
        font-size: 1.4vh;
        font-weight: 400;
        color: var(--Black);

        border: 3px solid var(--Color3);
        border-radius: 10px;
        background-color: transparent;

        box-sizing: border-box;
        padding: 0 10px;
        &:focus{
            outline: none;
            border-color: var(--Color1);
        }
        &::placeholder{
            font-size: 1.3vh;
        }
    }

    @media (max-width: 1200px) {
        &>input {
            width: 200px;
        }
    }
    @media (max-width: 700px) {
        &>input {
            width: 150px;
        }
    }
    @media (max-width: 500px) {
        display: none;
    }
`;

export const PageSectionMain = styled.div`
    height: 90%;
    overflow: auto;
    box-sizing: border-box;
    padding: 0 20px;
    position: relative;
`;

export const PageSectionMainRow = styled.div`
    height: 90%;
    overflow: auto hidden;
    box-sizing: border-box;
    padding: 20px 0 ;
    position: relative;

    display: flex;
    flex-direction: row;
    column-gap: 10px;
    justify-items: center;
    
    @media (max-width: 500px) {
        flex-direction: row;
        overflow: hidden auto;
    }
`;


