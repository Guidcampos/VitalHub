import styled from "styled-components";

export const FieldContent = styled.View`
    width: ${props => `${props.fieldWidth}%`} ;
    align-items: center;
    gap: 10px;
`

export const FieldContentMedicalRecord = styled.View`
    width: ${props => `${props.fieldWidth}%`} ;
    align-items: center;
`

export const FotoPrescriptions = styled.Image`
height: 121px;
 /* resizeMode: contain; */
`

export const InputFoto = styled.View`
width: 90%;
height: 121px;
border-radius: 5px;
margin-bottom: 20px;
`