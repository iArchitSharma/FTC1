import styled from "styled-components"

const LoadingContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-color: rgb(0, 255, 255);
`
const LoadingAnimation = styled.div`
    z-index: 10;
    display: grid;
    place-items: center;
    height: 100%;
`
const LocateButton = styled.div`
    position: absolute;
    bottom: 40px;
    right: 90px;
    outline: none;
    width: 45px;
    height: 45px;
    border-radius: 100px;
    cursor: pointer;
    background-color: #fff;
    display: grid;
    place-items: center;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.07),
        -10px -10px 15px rgba(0, 0, 0, 0.07),
        10px -10px 15px rgba(0, 0, 0, 0.07),
        -10px 10px 15px rgba(0, 0, 0, 0.07);
`
const SearchButton = styled.button`
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    outline: none;
    border: none;
    padding: 12px;
    font-size: 1.1rem;
    box-shadow: 8px 8px 30px rgba(0, 0, 0, 0.1) , -8px -8px 30px rgba(0, 0, 0, 0.1);
    
    &:focus {
        box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.15) , -10px -10px 30px rgba(0, 0, 0, 0.15);
    }
`
const AddTrashCan = styled.div`
    width: fit-content;
    position: fixed;
    top: 20px;
    left: calc(100vw - 350px);
    z-index: 2;
    background-color: #fff;
    padding: 10px 25px 10px 25px;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 1.3rem;
    font-weight: 600;
    box-shadow: 10px 10px 50px rgba(0, 0, 0, 0.203) , -10px -10px 50px rgba(0, 0, 0, 0.203);
    transition: all 0.4s ease-in-out;

    :active {
        background-color: rgb(184, 184, 184);
    }
`
const MapStyle = styled.div`
    /* cursor: ${props => props.canAddLocation ? "url('https://icons-for-free.com/iconfiles/png/512/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png') 2 2 pointer": "pointer"} ; */
`

export {LoadingAnimation, LoadingContainer, LocateButton, SearchButton, AddTrashCan, MapStyle}