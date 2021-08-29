import React, {useState} from 'react'
import ReactDOM from "react-dom"
import styled from "styled-components"

let TOP_VALUE = 20

export default function Alert({heading, message, onBackdropClickHandler}) {
    const [top, setTop] = useState(TOP_VALUE)

    let closeAlert = () => {
        if(onBackdropClickHandler)
        setTimeout(() => onBackdropClickHandler() , 300)
        setTop(-100)
    }
    return (
        ReactDOM.createPortal(
                <AlertContainer>
                    <Backdrop onClick = {closeAlert} />
                    <AlertBoxContainer top = {top}>
                        {heading &&
                            <Heading>
                                {heading}
                            </Heading>
                        }

                        <Message> {message} </Message>

                        <OkButton onClick = {closeAlert}> 
                            OK 
                        </OkButton>
                    </AlertBoxContainer>
                </AlertContainer>
            , document.querySelector("#alert-pg")
        )
    )
}

const Backdrop = styled.div`
    position: fixed; 
    top: 0;
    bottom: 0;
    left:0;
    right: 0;
    cursor: pointer;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.295);
`
const AlertBoxContainer = styled.div`
    position: fixed;
    top: ${props => props.top + "px"};
    left: 50%;
    transform-origin: center center;
    transform: translateX(-50%);
    z-index: 110;
    width: 450px;
    background-color: #fff;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.192), -4px -4px 10px rgba(0, 0, 0, 0.192);
    transition: top 0.3s ease-in-out;
    animation: top-to-bottom 0.3s;

    @keyframes top-to-bottom {
        from {
            top: -100px;
            transform: translateX(-50%);
        }
        to {
            top: ${TOP_VALUE + "px"};
            transform: translateX(-50%);
        }
    }

`
const Message = styled.div`
    text-align: center;
    padding: 30px;
    font-size: 1.15rem;
`
const OkButton = styled.div`
    padding: 12px 40px 12px 40px;
    background-color: rgb(255, 153, 0);
    color: white;
    font-weight: 800;
    font-size: 1.2rem;
    width: fit-content;
    display: block;
    margin: 10px auto 35px auto;
    cursor: pointer;
    border-radius: 40px;

    :hover {
        background-color: rgb(240, 148, 0);
    }
    :active {
        background-color: rgb(219, 132, 0);
    }
`
const AlertContainer = styled.div``
const Heading = styled.div`
    font-size: 1.6rem;
    text-align: center;
    padding: 20px;
    border-bottom: 2px solid red;
    text-transform: uppercase;
`