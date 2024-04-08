import { Modal } from "react-native"
import { LinkCodeModal } from "../Links/Links"
import { ButtonModal } from "../Button/ButtonStyle"
import { ButtonTitle, Title } from "../Title/TitleStyle"
import { ContainerQuery } from "../Container/ContainerStyle"
import { QueryContainerModal, QueryImageModal, QueryModalContent, QueryModalText } from "./Style"

export const QueryModal = ({
    visible,
    medico,
    navigation,
    setShowQueryModal,
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
            <QueryContainerModal>

                {/* Content */}
                <QueryModalContent>

                    <QueryImageModal source={require('../../assets/MedicQuery.png')} />

                    <Title>{medico.nome}</Title>

                    <ContainerQuery>

                        <QueryModalText>{medico.especialidade}</QueryModalText>
                        <QueryModalText>CRM-{medico.crm}</QueryModalText>

                    </ContainerQuery>

                    <ButtonModal onPress={() => navigation.replace("Location", { ClinicaId: medico.clinica })}>
                        <ButtonTitle>Ver local da consulta</ButtonTitle>
                    </ButtonModal>

                    {/* <ButtonSecondary>
                        <ButtonTitleSecondary>Cancelar</ButtonTitleSecondary>
                    </ButtonSecondary> */}

                    <LinkCodeModal onPress={() => setShowQueryModal(false)}>Cancelar</LinkCodeModal>

                </QueryModalContent>

            </QueryContainerModal>



        </Modal>
    )
}