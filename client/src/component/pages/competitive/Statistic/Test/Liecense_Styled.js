import styled from "styled-components";

export const LicenseMainDiv = styled.div`
    width: 100%;
    height: 250px;

    display: flex;
    flex-direction: column;
    background-color: var(--LicenseCard);
    border-radius: 10px;
    font-size: 1.1vh;

    div > {
        width: 100%;
    }
    &:hover{
        transform: scale(1.2);
    }
`;

export const LicenseHeader = styled.div`

    height: 20%;
    display: flex;
    flex-direction: row;

    &> div {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &:first-child {
            width: 20%;
        }
        &:last-child{
            width: 80%;
        }
        &>p {
            font-weight: bold;
            margin: 0;

            &:first-child{
                text-transform: uppercase;
            }

            &:last-child {
                border-bottom: 1px solid var(--Color1);
            }
        }
    }

`;

export const LicenseContent = styled.div`

    height: 80%;
    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    padding: 5px;

    &>div {

        width: 100%;
        display: flex;
        flex-direction: row;

        &:first-child{

            height: 70%;

            &>div {
                height: 100%;
                display: flex;


                &:first-child{

                    width: 30%;
                    overflow: hidden;
                    justify-content: center;
                    align-items: center;
                    background-color: var(--Color1);

                    &>img{
                        height: 100%;
                    }
                }

                &:last-child{

                    width: 70%;
                    flex-direction: column;

                    &>div{
                        width: 100%;
                    }

                }

            }

        }

        &:last-child{

            height: 30%;

            &>div {
                height: 100%;

                &> div  > p {
                    margin: 0;

                }

                &:first-child { 
                    width: 30%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                }

                &:last-child  {

                    width: 70%;

                    &> div > p{ 
                        font-size: 1vh;
                        text-align: center;
                    }

                } 
            }

        }
    }
`;

export const LicenseUserInfo= styled.div`
    &>div{

        display: flex;
        flex-direction: column;

        &:first-child {

            align-items: center;
            justify-content: center;

            &> p{
                margin: 0;
                font-weight: bold;
                color: var(--Color7);
            }

        }

        &:last-child {
            
            &>div {
            
                display: flex;
                box-sizing: border-box;
                padding: 0 5px;
                width: 100%;

                &> p{
                    margin: 3px 0;
                    &:last-child { 
                        margin-left: 5px;
                        font-weight: bold;
                    }
                }
            
            }


        }
    }
`;
