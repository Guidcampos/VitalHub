import { ActivityIndicator, Modal } from "react-native"
import { AppointmentImageModal, AppointmentModalContent, AppointmentModalText, AppointmentPatientModal } from "./Style"
import { LinkCodeModal } from "../Links/Links"
import { ButtonModal } from "../Button/ButtonStyle"
import { ButtonTitle, Title } from "../Title/TitleStyle"
import { ContainerMedicalRecord } from "../Container/ContainerStyle"

import { useEffect, useState } from "react"
import { userDecodeToken } from "../../utils/Auth"
import { dateFormatDbToView } from "../../utils/StringFunction"
import api from "../../services/services"
import moment from "moment"
import { handleCallNotifications } from "../Notifications/Notifications"

export const AppointmentModal = ({
    visible,
    navigation,
    setShowModalAppointment,
    consultaRealizada,
    paciente,
    ...rest
}) => {
    const [ano, setAno] = useState()
    const [idade, setIdade] = useState()
    const [loading, setLoading] = useState(false)
    const [dataok, setDataok] = useState(false)


    async function calcularData(ano) {
        setAno(
            dateFormatDbToView(paciente.data).slice(-4)

        )

        return setIdade(new Date().getFullYear() - ano);
    }


    const verificarData = () => {
        setDataok(moment(consultaRealizada.data).format("DD/MM/YYYY") <= moment().format("DD/MM/YYYY"))
    }

    async function handleRealizadas() {

        setLoading(true)
        if (dataok) {
            //Chamando o metodo da api
            await api.put(`/Consultas/Status?idConsulta=${consultaRealizada.id}&status=Realizadas`,

            ).then(response => {

                handleCallNotifications({
                    title: "Tudo Certo",
                    body: "Consulta confirmada com sucesso"
                })
                setShowModalAppointment(false)
                setLoading(false)
            }).catch(error => {
                console.log(error)
                setLoading(false)
            })
        } else {
            handleCallNotifications({
                title: "Algo está errado",
                body: "Sua consulta não pode ser confirmada pois ela ainda não ocorreu"
            })
            setShowModalAppointment(false)
            setLoading(false)
        }

    }

    useEffect(() => {
        calcularData(ano)
        verificarData()
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

                    <AppointmentImageModal source={{ uri: paciente.foto }} />

                    <Title>{paciente.nome}</Title>

                    <ContainerMedicalRecord>

                        <AppointmentModalText>{idade} anos</AppointmentModalText>
                        <AppointmentModalText emailgrande={paciente.email.length >= 28}>{paciente.email}</AppointmentModalText>

                    </ContainerMedicalRecord>

                    <ButtonModal disabled={loading} onPress={() => consultaRealizada.situacao === "Agendadas" ? handleRealizadas() :

                        navigation.navigate("MedicalRecord", { idPaciente: paciente.idPaciente, idade: idade, foto: paciente.foto, consultaId: paciente.consultaId })

                    }>

                        {loading ? <ActivityIndicator /> :

                            consultaRealizada.situacao === "Agendadas" ?
                                <ButtonTitle>Confirmar Consulta</ButtonTitle> :

                                consultaRealizada.situacao === "Realizadas" ?
                                    <ButtonTitle>Inserir Prontuário</ButtonTitle> :

                                    null
                        }
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