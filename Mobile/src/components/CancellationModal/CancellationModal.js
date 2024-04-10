import { ActivityIndicator, Modal } from "react-native"
import { ButtonTitle, Title } from "../Title/TitleStyle"
import { LinkCodeModal } from "../Links/Links"
import { ModalContent, ModalText, PatientModal } from "./Style"
import { ButtonModal, ButtonSecondary } from "../Button/ButtonStyle"
import { handleCallNotifications } from "../Notifications/Notifications"
import api from "../../services/services"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState } from "react"
import { userDecodeToken } from "../../utils/Auth"

export const CancellationModal = ({
    visible,
    setShowModalCancel,
    consultaCancel,
    navigation,
    ...rest
}) => {

    const [loading, setLoading] = useState(false)
    async function CancelarConsulta() {
        setLoading(true)
        
        //Chamando o metodo da api
        await api.put(`/Consultas/Status`,


            { id: consultaCancel.id, situacaoId: consultaCancel.situacaoId }


        ).then(response => {

            handleCallNotifications({
                title: "Tudo Certo",
                body: "Sua consulta foi cancelada com sucesso"
            })
            setShowModalCancel(false)
            setLoading(false)
        }).catch(error => {
            console.log(error)
            setLoading(false)
        })

    }
    return (
        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            {/* Container */}
            <PatientModal>

                {/* Content */}
                <ModalContent>

                    <Title>Cancelar consulta</Title>

                    <ModalText>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</ModalText>

                    <ButtonModal disabled={loading} onPress={() =>
                        CancelarConsulta()
                    }>
                        {loading ? <ActivityIndicator /> : <ButtonTitle>Confirmar</ButtonTitle>}
                    </ButtonModal>

                    <LinkCodeModal onPress={() => setShowModalCancel(false)}>Cancelar</LinkCodeModal>

                </ModalContent>

            </PatientModal>



        </Modal>
    )
}