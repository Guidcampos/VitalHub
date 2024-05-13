import { StatusBar } from "react-native"
import { Container } from "../../components/Container/ContainerStyle"
import CalendarComponent from "../../components/CalendarComponent/CalendarComponent"
import InputSelect from "../../components/InputSelect/InputSelect"
import { Button } from "../../components/Button/ButtonStyle"
import { ButtonTitle, LabelSelectText, TitleSelect } from "../../components/Title/TitleStyle"
import { LinkCodeModal } from "../../components/Links/Links"
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal"
import { useEffect, useState } from "react"


export const SelectDate = ({ navigation, route }) => {

    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [agendamento, setAgendamento] = useState({ dataSelecionada: "" })
    const [dataSelecionada, setDataSelecionada] = useState("")
    const [horaSelecionada, setHoraSelecionada] = useState("")

    function handleContinue() {
        if (dataSelecionada && horaSelecionada) {
            setAgendamento({
                ...route.params.agendamento,

                dataConsulta: `${dataSelecionada} ${horaSelecionada}`,
            });

            setShowConfirmModal(true)
        }
    }

    useEffect(() => {
        console.log(dataSelecionada)
    }, [dataSelecionada]);

    useEffect(() => {
        console.log(agendamento);
    }, [dataSelecionada]);


    return (
        <Container>

            <StatusBar translucent backgroundColor="transparent" barStyle='dark-content' />

            <TitleSelect>Selecionar Data</TitleSelect>

            <CalendarComponent
                setDataSelecionada={setDataSelecionada}
                dataSelecionada={dataSelecionada}
            />

            <LabelSelectText>Selecione um horário disponível</LabelSelectText>

            <InputSelect
                setHoraSelecionada={setHoraSelecionada}
            />

            <Button onPress={() => handleContinue()}>
                <ButtonTitle>Continuar</ButtonTitle>
            </Button>

            <LinkCodeModal onPress={() => navigation.replace("Main")}>Cancelar</LinkCodeModal>

            <ConfirmModal
                agendamento={agendamento}
                visible={showConfirmModal}
                setShowConfirmModal={setShowConfirmModal}
                navigation={navigation}
            />

        </Container>

    )
}