import styled from "styled-components";

export const TestReportMain = styled.div`
    height: 100vh;
    width: 1600px;

    margin: 0 auto;
    box-sizing: border-box;
    padding: 100px 0 50px ;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: transparent;

    &>div {
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        border-radius: 25px;
        box-sizing: border-box;
        padding: 20px 40px;
        box-shadow: 0 0 35px #212a3e10;
    }
    color: var(--Black);
`;

export const PartMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &>div{
        width: 100%;
        display: flex;
    }
`;

export const PartHeader = styled.div`
    height: 70px;
    align-items: center;

    &>h1{

        font-size: 3vh;

    }

`
export const PartContent = styled.div`
    height: fit-content;
    align-items: center;
    padding: 10px 0;

`

export const PartContent_statistic = styled.div`
    height: 90%;
    padding: 10px 0;
    flex-direction: column;

    &> div{
        width: 100%;
        box-sizing: border-box;

        &:first-child{
            display: flex;
            flex-direction: row;
            height: 10%;
            border-bottom: 1px solid var(--Color3);
            &>div{
                height: 90%;
                display: flex;
                flex-direction: row;
            }
        }

        &:last-child {
            height: 90%;
        }
    }

`;

export const ButtonSelectTypeChartDiv = styled.div`
    width: 50%;
    justify-content: flex-start;

    &>button {
        height: 90%;
        width: 100px;
        font-size: 1.3vh;

        background-color: transparent;
        border: none;
        cursor: pointer;

        border-bottom: 3px solid transparent;  
        box-sizing: border-box;

        &:hover, &.selected {
            background-color: var(--Color3); 
            border-bottom: 3px solid var(--Color2);  
        }
    }
`;

export const TimeSelectTypeCharDiv = styled.div`
    width: 50%;
    justify-content: flex-end;
    &>div{
        height: 100%;
        width: fit-content;
        display: flex;
        align-items: center;

        &>select {
            height: 80%;
            width: 150px;
            border: 3px solid var(--Color3);
            border-radius: 20px;
            margin-left: 10px;
            font-size: 1.2vh;
            box-sizing: border-box;
            padding: 0 10px;
            cursor: pointer;

            &:focus{
                outline: none;
                border: 3px solid var(--Color1);
            }
        }
    }
`;

export const HistoryMain = styled.a`
    min-height: 72px;
    max-height: 72px;
    width: 100%;

    color: var(--Color1);
    text-decoration: none;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;

    &:hover {
        border-bottom: 1px solid;
        &>div:last-child{
            display: flex;
            backdrop-filter: blur(5px);
        }
    }

    &>div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;

        box-sizing: border-box;
        padding: 10px;

        &:first-child{

            &>div{
                height: 100%;
                display: flex;
                align-items: center;

                &:first-child {
                    width: 80%;

                    &>p{
                        margin: 0;
                        font-size: 1.5vh;
                        font-weight: bold;
                    }
                    
                }
                &:last-child{
                    width: 20%;
                    justify-content: center;
                    &>span{
                        height: 30px;
                        width: 30px;
                        border: 4px solid;
                        border-radius: 100%;

                        display: flex;
                        align-items: center;
                        justify-content: center;

                        &.verified {
                            color: var(--Correct);
                        }
                        
                        &.failed{
                            color: var(--Wrong);
                        }
                        &> svg {
                            height: 25px;
                        }
                    }
                }
            }
        }
        &:last-child{
            display: none;
            background-color: rgb(0, 0, 0, 0.5);

            &> div{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                height: 100%;

                &>p{
                    font-size: 1.5vh;
                    margin:0;
                }

                &:first-child {
                    width: 80%;
                    color: var(--White);
                    
                }
                &:last-child{
                    width: 20%;
                    align-items: flex-end;

                    &>p{

                        font-size: 2vh;
                        font-weight: bold;

                    }

                    &.verified{
                        color: var(--Correct);
                    }

                    &.failed{
                        color: var(--Wrong);
                    }
                }
            }
        }
    }

`;