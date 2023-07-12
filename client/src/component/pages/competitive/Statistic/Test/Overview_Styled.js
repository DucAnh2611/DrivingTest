import styled from "styled-components";

export const OverViewContent = styled.div`

    height: 130px;
    width: 280px;

    display: flex;
    flex-direction: column;

    border-radius: 20px;
    box-sizing: border-box;
    padding: 20px 15px;
    margin-right: 15px;

    &> div{
        width: 100%;
        display: flex;
        &>p{
            margin: 0;
            &>b{
                font-size: 3vh;
            }
        }
    }

    &:hover{
        box-shadow: 0 0 10px var(--BlackBlur);
    }
`;