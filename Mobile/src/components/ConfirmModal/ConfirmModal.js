import { ActivityIndicator, Modal } from "react-native"
import { ButtonTitle, Subtitle, Title } from "../Title/TitleStyle"
import { Button } from "../Button/ButtonStyle"
import { LinkCodeModal } from "../Links/Links"
import { ContainerModalConfirm } from "../Container/ContainerStyle"
import { ConfirmModalContainer, ConfirmModalContent, ConfirmModalText, ConfirmSubTitle, ConfirmTitle, ContainerSub } from "./Style"
import { useEffect, useState } from "react"
import { userDecodeToken } from "../../utils/Auth"
import api from "../../services/services"
import moment from "moment"

export const ConfirmModal = ({
    visible,
    agendamento,
    setShowConfirmModal,
    navigation,
    ...rest
}) => {

    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(false)

    async function profileLoad() {
        const token = await userDecodeToken()

        setProfile(token)
    }


    async function handleConfirm() {
        setLoading(true)
        await api.post(`/Consultas/Cadastrar`, {
            ...agendamento,

            pacienteId: profile.id,
            //situação AGENDADAS vindo do banco
            situacaoId: '54231360-2D9B-4FC7-BD5F-5F4296EF2011'
        }).then(

            setShowConfirmModal(false),
            setLoading(false),

            navigation.replace("Main")

        ).catch((error) => {
            console.log(error);
            setLoading(false)
        })

    }

    useEffect(() => {
        profileLoad()
        console.log(profile)
    }, [visible])


    return (
        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            {/* Container */}
            {agendamento ?
                <ConfirmModalContainer>

                    {/* Content */}
                    <ConfirmModalContent>

                        <Title>Agendar consulta</Title>

                        <ConfirmModalText>Consulte os dados selecionados para a sua consulta</ConfirmModalText>

                        <ContainerSub>
                            <ConfirmTitle>Data da consulta</ConfirmTitle>
                            <ConfirmSubTitle>{moment(agendamento.dataConsulta).format("DD/MM/YYYY  ||  HH:mm")}</ConfirmSubTitle>

                            <ConfirmTitle>Médico(a) da consulta</ConfirmTitle>
                            <ConfirmSubTitle>{agendamento.medicoLabel}</ConfirmSubTitle>
                            <ConfirmSubTitle>{agendamento.medicoEspecialidade}</ConfirmSubTitle>

                            <ConfirmTitle>Clínica da consulta</ConfirmTitle>
                            <ConfirmSubTitle>{agendamento.clinicaLabel}</ConfirmSubTitle>

                            <ConfirmTitle>Local da consulta</ConfirmTitle>
                            <ConfirmSubTitle>{agendamento.localizacao}</ConfirmSubTitle>

                            <ConfirmTitle>Tipo da consulta</ConfirmTitle>
                            <ConfirmSubTitle>{agendamento.prioridadeLabel}</ConfirmSubTitle>


                        </ContainerSub>

                        <ContainerModalConfirm>

                            <Button disabled={loading} onPress={() => handleConfirm()}>
                                {loading ? <ActivityIndicator /> : <ButtonTitle>Continuar</ButtonTitle>}
                            </Button>

                            <LinkCodeModal onPress={() => setShowConfirmModal(false)}>Cancelar</LinkCodeModal>

                        </ContainerModalConfirm>


                    </ConfirmModalContent>

                </ConfirmModalContainer> :
                <ActivityIndicator />}



        </Modal>
    )
}