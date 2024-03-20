import { Modal } from "react-native"
import { LinkCodeModal } from "../Links/Links"
import { ButtonModal } from "../Button/ButtonStyle"
import { ButtonTitle, Title } from "../Title/TitleStyle"
import { ContainerQuery } from "../Container/ContainerStyle"
import { QueryContainerModal, QueryImageModal, QueryModalContent, QueryModalText } from "./Style"

export const QueryModal = ({
    visible,
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

                    <Title>Dr. Claudio</Title>
                   
                    <ContainerQuery>
                        
                        <QueryModalText>Cliníco geral</QueryModalText>
                        <QueryModalText>CRM-15286</QueryModalText>

                    </ContainerQuery>

                    <ButtonModal onPress={() => navigation.replace("Location")}>
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