import { useEffect, useState } from "react"
import { BoxInputPrescriptionView, BoxInputViewPrescription } from "../../components/BoxInput/BoxInput"
import { ButtonCanceled, ButtonSendPrescription } from "../../components/Button/Button"
import { CameraModal } from "../../components/CameraModal/CameraModal"
import { Container, ContainerViewPrescriptiion, ContainerViewPrescriptionButton, ScrollViewPrescriptiion } from "../../components/Container/ContainerStyle"
import { LinkBack } from "../../components/Links/Links"
import { ViewPrescriptiionImage } from "../../components/Logo/LogoStyle"
import { SubtitleViewPrescription, TitleViewPrescriptiion } from "../../components/Title/TitleStyle"
import { BoxViewImageImport, ImagePrescription, ImportImages, Line } from "./Styles"
import api from "../../services/services"
import { ActivityIndicator } from "react-native"

export const ViewPrescription = ({ navigation, route }) => {
    const [showCameraModel, setShowCameraModel] = useState(false)
    const [uriCameraCapture, setUriCameraCapture] = useState(null)

    const [consulta, setConsulta] = useState(null)
    const [descricaoExame, setDescricaoExame] = useState()



    async function GetConsultasId() {

        //Chamando o metodo da api
        await api.get(`/Consultas/BuscarPorId?id=${route.params.id}`
        ).then(response => {
            // console.log(response.data)
            setConsulta(response.data)
        }).catch(error => {
            console.log(error);
        })

    }

    //OCR
    async function InserirExame() {


        const formData = new FormData();
        formData.append("ConsultaId", route.params.id);
        formData.append("Imagem", {
            uri: uriCameraCapture,
            name: `image.${uriCameraCapture.split('.').pop()}`,
            type: `image/${uriCameraCapture.split('.').pop()}`
        });

        await api.post(`/Exame/Cadastrar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            // setDescricaoExame(descricaoExame + "\n" + response.data.descricao)
            setDescricaoExame(response.data.descricao)
            console.log("EXAME  " + descricaoExame + "\n" + response.data.descricao)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        GetConsultasId()
    }, []);

    useEffect(() => {
        if (uriCameraCapture) {
            InserirExame();
        }
    }, [uriCameraCapture])

    return (

        <ScrollViewPrescriptiion>
            <Container>

                {consulta != null ? <>

                    <ViewPrescriptiionImage
                        source={{ uri: consulta.medicoClinica.medico.idNavigation.foto }}
                    />

                    <TitleViewPrescriptiion>{consulta.medicoClinica.medico.idNavigation.nome}</TitleViewPrescriptiion>

                    <ContainerViewPrescriptiion>

                        <SubtitleViewPrescription>{consulta.medicoClinica.medico.especialidade.especialidade1}</SubtitleViewPrescription>
                        <SubtitleViewPrescription>CRM-{consulta.medicoClinica.medico.crm}</SubtitleViewPrescription>

                    </ContainerViewPrescriptiion>



                    <BoxInputViewPrescription
                        fieldWidth={100}
                        editable={false}
                        multiline={true}
                        fieldHeight={30}
                        textLabel={'Descrição da consulta'}
                        keyType="text"
                        fieldValue={consulta.descricao === null ? 'Não informado' : consulta.descricao}
                    />

                    <BoxInputPrescriptionView
                        fieldWidth={100}
                        editable={false}
                        fieldHeight={10}
                        multiline={true}
                        textLabel={'Diagnóstico do paciente'}
                        keyType="text"
                        fieldValue={consulta.diagnostico === null ? 'Não informado' : consulta.diagnostico}

                    />

                    <BoxInputViewPrescription
                        fieldWidth={100}
                        fieldHeight={10}
                        editable={false}
                        multiline={true}
                        textLabel={'Prescrição médica'}
                        keyType="text"
                        fieldValue={consulta.receita.medicamento === null ? 'Não informado' : consulta.receita.medicamento}

                    />

                    <BoxInputViewPrescription
                        fieldWidth={100}
                        fieldHeight={10}
                        foto={uriCameraCapture}
                        textLabel={'Exames médicos'}
                        keyType="text"
                        editable={false}
                        fieldValue={uriCameraCapture != null ? uriCameraCapture : "Nenhuma foto informada"}
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
                        fieldValue={descricaoExame}
                        multiline={true}
                    />

                </> : <ActivityIndicator />}

                <LinkBack onPress={() => navigation.replace("Main")} >Voltar</LinkBack>

                <CameraModal getMediaLibrary={true} visible={showCameraModel} setShowCameraModel={setShowCameraModel} setUriCameraCapture={setUriCameraCapture} />


            </Container>

        </ScrollViewPrescriptiion>
    )
}