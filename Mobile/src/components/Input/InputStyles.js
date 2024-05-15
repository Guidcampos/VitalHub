import styled from "styled-components";

export const InputBox = styled.TextInput`
    border: ${props => !props.editable ? "none" : (!props.verificado) ? "2px solid red" : "2px solid #49B3BA"};
    align-items: left;
    justify-content: center;
    ${props => props.editable ? "" : "background-color: #F5F3F3"};
    padding: 16px;
    border-radius: 5px;
    color:  ${props => props.editable ? "#34898F" : "#4E4B59"};
    font-size: 14px;
    font-family: MontserratAlternates_600SemiBold;
    width: 90%;
    margin-top: 15px;
    
`
export const InputCheckEmail = styled(InputBox)`
    width: 65px;
    height: 62px;
    border:${props => !props.verificado ? "2px solid red" : "2px solid #49B3BA"};
    text-align: center;
    font-size: 40px;
    padding: 10px;
    font-family: Quicksand_600SemiBold;
`

export const InputProfileBox = styled.TextInput`
/* border: 1px solid #F5F3F3; */
border: ${props => !props.editable ? "none" : (!props.verificado) ? "2px solid red" : "2px solid #49B3BA"};
width: 90%;
align-items: left;
justify-content: center;
padding: 16px;
${props => props.editable ? "" : "background-color: #F5F3F3"};
/* color: #33303E; */
color:  ${props => props.editable ? "#34898F" : " #33303E"};
font-size: 14px;
font-family: MontserratAlternates_500Medium;
border-radius: 5px;
margin-bottom: ${props => !props.verificado ? "0px" : "20px"};
`

export const InputBoxMedicalRecord = styled(InputBox)`
border: ${props => !props.editable ? "none" : "2px solid #49B3BA"};
/* text-align: start; */
padding: 10px;
height: 121px;
margin-bottom: 20px;
`
export const InputText = styled.TextInput`
width:80%;
border:2px solid #49B3BA;
font-family: MontserratAlternates_600SemiBold;
color: #49B3BA;
border-radius: 10px;
padding: 20px;
margin-top: 10px;
margin-bottom: 5px;
font-size: 18px;
`
export const InputTextLargeModal = styled(InputText)`
    width: 100%;
    text-transform: capitalize;
    font-size: 16px;
`

export const InputViewPrescriptionBox = styled.TextInput`
width: 90%;
height: 121px;
align-items: left;
justify-content: center;
padding: 16px;
${props => props.editable ? "" : "background-color: #F5F3F3"};
color:  ${props => props.editable ? "#34898F" : "#4E4B59"};
font-size: 14px;
font-family: MontserratAlternates_500Medium;
border-radius: 5px;
margin-bottom: 20px;
text-align: start;
border: ${props => props.editable ? "2px solid #49B3BA" : "none"};
`
export const InputPrescriptionViewBox = styled(InputViewPrescriptionBox)`
height: 53px;
`