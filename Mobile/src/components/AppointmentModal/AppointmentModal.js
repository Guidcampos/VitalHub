import { Modal } from "react-native"
import { AppointmentImageModal, AppointmentModalContent, AppointmentModalText, AppointmentPatientModal } from "./Style"
import { LinkCodeModal } from "../Links/Links"
import { ButtonModal } from "../Button/ButtonStyle"
import { ButtonTitle, Title } from "../Title/TitleStyle"
import { ContainerMedicalRecord } from "../Container/ContainerStyle"

import { useEffect, useState } from "react"
import { userDecodeToken } from "../../utils/Auth"
import { dateFormatDbToView } from "../../utils/StringFunction"

export const AppointmentModal = ({
    visible,
    navigation,
    setShowModalAppointment,
    paciente,
    ...rest
}) => {
    const [ano,setAno] = useState()
    const [idade, setIdade] = useState()
    
    
   async function calcularData(ano){
    setAno(
        dateFormatDbToView(paciente.data).slice(-4)
       
    )
    
    return setIdade(new Date().getFullYear() - ano);
   }
   
useEffect(()=>{
calcularData(ano).then(response => console.log(idade))

})
    return (
        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            {/* Container */}
            <AppointmentPatientModal>

                {/* Content */}
                <AppointmentModalContent>

                    <AppointmentImageModal source={require('../../assets/appointmentmodal.png')} />

                    <Title>{paciente.nome}</Title>
                   
                    <ContainerMedicalRecord>
                        
                        <AppointmentModalText>{idade} anos</AppointmentModalText>
                        <AppointmentModalText>{paciente.email}</AppointmentModalText>

                    </ContainerMedicalRecord>

                    <ButtonModal onPress={() => navigation.replace("MedicalRecord",{idPaciente: paciente.idPaciente, idade: idade})}>
                        <ButtonTitle>Inserir Prontuário</ButtonTitle>
                    </ButtonModal>

                    {/* <ButtonSecondary>
                        <ButtonTitleSecondary>Cancelar</ButtonTitleSecondary>
                    </ButtonSecondary> */}

                    <LinkCodeModal onPress={() => setShowModalAppointment(false)}>Cancelar</LinkCodeModal>

                </AppointmentModalContent>

            </AppointmentPatientModal>



        </Modal>
    )
}