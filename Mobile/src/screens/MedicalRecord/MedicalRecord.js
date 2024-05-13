import { useEffect, useState } from "react"
import { BoxInputMedical, BoxInputMedicalRecord } from "../../components/BoxInput/BoxInput"
import { Button } from "../../components/Button/ButtonStyle"
import { Container, ContainerMedicalRecord, ScrollProfile } from "../../components/Container/ContainerStyle"
import { LinkCode } from "../../components/Links/Links"
import { UserImage } from "../../components/Logo/LogoStyle"
import { ButtonTitle, SubtitleMedicalRecord, TitleProfile } from "../../components/Title/TitleStyle"
import api from "../../services/services"
import { userDecodeToken } from "../../utils/Auth"
import { ActivityIndicator } from "react-native"
import { dateFormatDbToView } from "../../utils/StringFunction"

export const MedicalRecord = ({
    navigation,
    route
}) => {

    // const [token, setToken] = useState({})
    const [pacienteApi, setPacienteApi] = useState(null)
    const [editar, setEditar] = useState(false)
    const [consulta, setConsulta] = useState(null)
    const [consultaAtt, setConsultaAtt] = useState({ medicamento: "", descricao: "", diagnostico: "" })
    const [loading, setLoading] = useState(false)


    async function BuscarProntuario() {
        await api.get(`/Consultas/BuscarPorId?id=${route.params.consultaId}`)
            .then(response => {
                setConsulta(response.data)
                setConsultaAtt({
                    medicamento: response.data.receita.medicamento,
                    descricao: response.data.descricao,
                    diagnostico: response.data.diagnostico
                })

            })
            .catch(error => {
                console.log(error);
            })
    }

    async function PacienteApi() {
        await api.get(`/Pacientes/BuscarPorId?id=${route.params.idPaciente}`
        ).then(response => {
            setPacienteApi(response.data)
            // console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    async function updateProntuario() {
        setLoading(true)
        await api.put(`/Consultas/Prontuario`,

            {
                consultaId: consulta.id,
                medicamento: consultaAtt.medicamento,
                descricao: consultaAtt.descricao,
                diagnostico: consultaAtt.diagnostico
            }

        ).then(response => {

            console.log('Prontuário atualizado com sucesso !');
            BuscarProntuario()
            setEditar(false)
            setLoading(false)


        }).catch(error => {
            console.log(error)
            setEditar(false)
            setLoading(false)


        })

    }


    useEffect(() => {
        if (consulta === null) {
            BuscarProntuario()
        }
    }, [consulta])

    useEffect(() => {
        if (pacienteApi === null) {
            PacienteApi()
        }
    }, [pacienteApi])

    return (
        <ScrollProfile
            showsVerticalScrollIndicator={false}

        >

            <Container>
                {pacienteApi !== null ? (
                    <>
                        <UserImage
                            source={{ uri: route.params.foto }}
                        />

                        <TitleProfile>{pacienteApi.idNavigation.nome}</TitleProfile>


                        <ContainerMedicalRecord>

                            <SubtitleMedicalRecord>{route.params.idade} anos</SubtitleMedicalRecord>

                            <SubtitleMedicalRecord>{pacienteApi.idNavigation.email}</SubtitleMedicalRecord>


                        </ContainerMedicalRecord>
                        {consulta != null ? <>

                            <BoxInputMedicalRecord
                                textLabel='Descrição da Consulta'
                                placeholder='Descrição'
                                editable={editar}
                                keyType='text'
                                placeholderTextColor={'#34898F'}
                                multiline={true}
                                onChangeText={(txt) => setConsultaAtt({ ...consultaAtt, descricao: txt })}
                                fieldValue={consultaAtt.descricao}
                            />

                            <BoxInputMedical
                                textLabel='Diagnóstico do paciente'
                                placeholder='Diagnóstico'
                                editable={editar}
                                keyType='text'
                                placeholderTextColor={editar ? '#34898F' : 'black'}
                                multiline={true}
                                onChangeText={(txt) => setConsultaAtt({ ...consultaAtt, diagnostico: txt })}
                                fieldValue={consultaAtt.diagnostico}
                            />


                            <BoxInputMedicalRecord
                                textLabel='Prescrição Médica'
                                placeholder='Prescrição médica'
                                editable={editar}
                                keyType='text'
                                placeholderTextColor={'#34898F'}
                                multiline={true}
                                onChangeText={(txt) => setConsultaAtt({ ...consultaAtt, medicamento: txt })}
                                fieldValue={consultaAtt.medicamento}
                            />

                        </> :

                            <></>
                        }

                        <Button disabled={loading} onPress={() => { editar ? updateProntuario() : setEditar(true) }}>
                            {loading ? <ActivityIndicator /> : <ButtonTitle>{editar ? "Salvar" : "Editar"}</ButtonTitle>}
                        </Button>

                        <LinkCode onPress={() => { editar ? (setEditar(false), BuscarProntuario()) : navigation.replace("Main") }}>Cancelar</LinkCode>

                    </>
                ) : <ActivityIndicator />}
            </Container>

        </ScrollProfile>
    )
}