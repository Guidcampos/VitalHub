import { Modal } from "react-native"
import { LinkCodeModal } from "../Links/Links"
import { Button, ButtonModal } from "../Button/ButtonStyle"
import { ButtonTitle, LabelButtonModal, Title } from "../Title/TitleStyle"
import { ButtonModalContainer, ContainerMedicalRecord, ContainerModalEnd } from "../Container/ContainerStyle"
import { BookModalContainer, ModalContent } from "./BookModalStyle"
import { SmallButtonModal } from "../Button/Button"
import { LargeInputBoxModal } from "../BoxInput/BoxInput"
import { useState } from "react"

export const BookModal = ({
    visible,
    navigation,
    setShowBookModal,
    ...rest
}) => {
    //AGENDAMENTO DA CONSULTA
    const [agendamento, setAgendamento] = useState(null)



    async function handleContinue() {
        await setShowBookModal(false)
        navigation.replace("SelectClinic", { agendamento: agendamento })
    }
    return (
        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            {/* Container */}
            <BookModalContainer>

                {/* Content */}
                <ModalContent>

                    <Title>Agendar consulta</Title>

                    <LabelButtonModal>Qual o nível da consulta ?</LabelButtonModal>

                    <ButtonModalContainer>
                        {/* Id das prioridades BANCO --- > '9EFD2354-EB8E-445F-B598-8656E8DB427E', 'AF8A2195-9BCC-475E-8D73-6757E7E84DE0' 'C434C124-6FC3-4BE2-963F-9BECB665119E' */}

                        <SmallButtonModal text={'Rotina'} onPress={() =>
                            setAgendamento({
                                ...agendamento,
                                prioridadeId: '9EFD2354-EB8E-445F-B598-8656E8DB427E',
                                prioridadeLabel: 'Rotina'
                            })}
                            selected={agendamento && agendamento.prioridadeLabel === 'Rotina'} />

                        <SmallButtonModal text={'Exame'} onPress={() =>
                            setAgendamento({
                                ...agendamento,
                                prioridadeId: 'AF8A2195-9BCC-475E-8D73-6757E7E84DE0',
                                prioridadeLabel: 'Exame'

                            })}
                            selected={agendamento && agendamento.prioridadeLabel === 'Exame'} />

                        <SmallButtonModal text={'Urgência'} onPress={() =>
                            setAgendamento({
                                ...agendamento,
                                prioridadeId: 'C434C124-6FC3-4BE2-963F-9BECB665119E',
                                prioridadeLabel: 'Urgência'

                            }
                            )}
                            selected={agendamento && agendamento.prioridadeLabel === 'Urgência'} />

                    </ButtonModalContainer>


                    <LargeInputBoxModal
                        fieldWidth={100}
                        placeholderTextColor={"#34898F"}
                        textLabel={"Informe a localização desejada"}
                        placeholder={"Informe a localização"}
                        fieldValue={agendamento ? agendamento.localizacao : null}
                        onChangeText={(txt) => setAgendamento({
                            ...agendamento,
                            localizacao: txt

                        })}
                        editable={true}
                    />

                    <ContainerModalEnd>

                        <Button onPress={() => handleContinue()}>
                            <ButtonTitle>Continuar</ButtonTitle>
                        </Button>

                        <LinkCodeModal onPress={() => setShowBookModal(false)}>Cancelar</LinkCodeModal>

                    </ContainerModalEnd>


                </ModalContent>

            </BookModalContainer>



        </Modal>
    )
}