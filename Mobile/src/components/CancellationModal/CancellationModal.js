import { Modal } from "react-native"
import { ButtonTitle, Title } from "../Title/TitleStyle"
import { LinkCodeModal } from "../Links/Links"
import { ModalContent, ModalText, PatientModal } from "./Style"
import { ButtonModal, ButtonSecondary } from "../Button/ButtonStyle"
import { handleCallNotifications } from "../Notifications/Notifications"

export const CancellationModal = ({
    visible,
    setShowModalCancel,
    navigation,
    ...rest
}) => {
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

                    <ButtonModal onPress={() => {
                        setShowModalCancel(false) , 
                        handleCallNotifications({
                            title: "Tudo Certo", 
                            body: "Sua consulta foi cancelada com sucesso"})}
                        }>
                        <ButtonTitle>Confirmar</ButtonTitle>
                    </ButtonModal>

                    <LinkCodeModal onPress={() => setShowModalCancel(false)}>Cancelar</LinkCodeModal>

                </ModalContent>

            </PatientModal>
            
       

        </Modal>
    )
}