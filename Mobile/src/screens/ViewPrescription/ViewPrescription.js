import { useState } from "react"
import { BoxInputPrescriptionView, BoxInputViewPrescription } from "../../components/BoxInput/BoxInput"
import { ButtonCanceled, ButtonSendPrescription } from "../../components/Button/Button"
import { CameraModal } from "../../components/CameraModal/CameraModal"
import { Container, ContainerViewPrescriptiion, ContainerViewPrescriptionButton, ScrollViewPrescriptiion } from "../../components/Container/ContainerStyle"
import { LinkBack } from "../../components/Links/Links"
import { ViewPrescriptiionImage } from "../../components/Logo/LogoStyle"
import { SubtitleViewPrescription, TitleViewPrescriptiion } from "../../components/Title/TitleStyle"
import { BoxViewImageImport, ImagePrescription, ImportImages, Line } from "./Styles"

export const ViewPrescription = ({ navigation }) => {
    const [showCameraModel, setShowCameraModel] = useState(false)
    const [uriCameraCapture, setUriCameraCapture] = useState(null)
    return (
        <ScrollViewPrescriptiion>

            <Container>

                <ViewPrescriptiionImage
                    source={require('../../assets/MedicalImage.png')}
                />

                <TitleViewPrescriptiion>Dr. Claudio</TitleViewPrescriptiion>

                <ContainerViewPrescriptiion>

                    <SubtitleViewPrescription>Cliníco geral</SubtitleViewPrescription>
                    <SubtitleViewPrescription>CRM-15286</SubtitleViewPrescription>

                </ContainerViewPrescriptiion>

                <BoxInputViewPrescription
                    fieldWidth={100}
                    fieldHeight={30}
                    textLabel={'Descrição da consulta'}
                    keyType="text"
                    fieldValue={"O paciente possuí uma infecção no ouvido. Necessário repouse de 2 dias e acompanhamento médico constante"}
                />

                <BoxInputPrescriptionView
                    fieldWidth={100}
                    fieldHeight={10}
                    textLabel={'Diagnóstico do paciente'}
                    keyType="text"
                    fieldValue={"Infecção no ouvido"}
                />

                <BoxInputViewPrescription
                    fieldWidth={100}
                    fieldHeight={10}
                    textLabel={'Prescrição médica'}
                    keyType="text"
                    fieldValue={`Medicamento: Advil Dosagem: 50 mg Frequência: 3 vezes ao dia Duração: 3 dias`}
                />

                <BoxInputViewPrescription
                    fieldWidth={100}
                    fieldHeight={10}
                    textLabel={'Exames médicos'}
                    keyType="text"
                    editable={false}
                    fieldValue={"Nenhuma foto informada"}
                />

                <ContainerViewPrescriptionButton>

                    <ButtonSendPrescription text={'Enviar'} onPress={() => setShowCameraModel(true)} />

                    <ButtonCanceled text={'Cancelar'} onPress={() => setUriCameraCapture(null)} />

                </ContainerViewPrescriptionButton>

                <Line></Line>

                <BoxInputViewPrescription
                    fieldWidth={100}
                    fieldHeight={121}
                    keyType="text"
                    editable={false}
                    fieldValue={"Resultado do exame de sangue : tudo normal"}
                />

                <LinkBack onPress={() => navigation.replace("Main")} >Voltar</LinkBack>

                <CameraModal visible={showCameraModel} setShowCameraModel={setShowCameraModel} setUriCameraCapture={setUriCameraCapture} />
            </Container>

        </ScrollViewPrescriptiion>
    )
}