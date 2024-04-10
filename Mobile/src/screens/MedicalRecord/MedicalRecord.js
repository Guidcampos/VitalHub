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

    const [token,setToken] = useState({})
    const [pacienteApi, setPacienteApi] = useState(null)
   
    const [descricao,setDescricao] = useState("")
    const [diagnostico,setDiagnostico] = useState("")
    const [prescricao, setPrescricao] = useState("")

    async function ConsultaProntuario(){
        //continuar aqui
        await api.put("/Consultas/Prontuario",{id: route.params.idConsulta, descricao: descricao,diagnostico: diagnostico,receita:{medicamento: prescricao},})
        .then(response => {
            console.log("Atualizado com sucesso")
        }).catch(error => {
            console.log(error)
        })

    }
   
    async function LoadMedicalRecord(){
        const token = await userDecodeToken()
        if (token) {
            console.log(token)
        }
        setToken(token);
    }
    
    async function PacienteApi(){
    await api.get(`/Pacientes/BuscarPorId?id=${route.params.idPaciente}`,{
        headers: {Authorization: `Bearer ${token}`}
    }).then(response =>
        {
            setPacienteApi(response.data)
            console.log(response.data)
        }).catch(error =>{
            console.log(error)
        })
    
    }
    useEffect(()=>{
        
        LoadMedicalRecord()
       if (pacienteApi == null) {
        PacienteApi()
       } 
       
    },[pacienteApi])
    return (
        <ScrollProfile 
        showsVerticalScrollIndicator={false}
        
        >
        
            <Container>
                {pacienteApi !== null ? (
                    <>
                <UserImage
                    source={require('../../assets/ProfileImage.png')}
                />

                <TitleProfile>{pacienteApi.idNavigation.nome}</TitleProfile>


                <ContainerMedicalRecord>

                    <SubtitleMedicalRecord>{route.params.idade} anos</SubtitleMedicalRecord>

                    <SubtitleMedicalRecord>{pacienteApi.idNavigation.email}</SubtitleMedicalRecord>


                </ContainerMedicalRecord>

                <BoxInputMedicalRecord
                    textLabel='Descrição da Consulta'
                    placeholder='Descrição'
                    keyType='text'
                    placeholderTextColor={'#34898F'}
                    fieldValue={descricao}
                    onChangeText={(txt)=>{setDescricao(txt)}}
                />

                <BoxInputMedical
                    textLabel='Diagnóstico do paciente'
                    placeholder='Diagnóstico'
                    keyType='text'
                    placeholderTextColor={'#34898F'}
                    fieldValue={diagnostico}
                    onChangeText={(txt) => {setDiagnostico(txt)}}
                />


                <BoxInputMedicalRecord
                    textLabel='Prescrição Médica'
                    placeholder='Prescrição médica'
                    keyType='text'
                    placeholderTextColor={'#34898F'}
                    fieldValue={prescricao}
                    onChangeText={(txt)=> {setPrescricao(txt)}}
                />

                {/* <Button onPress = {() => navigation.replace("Main")}> */}
                <Button onPress = {() => {
                    console.log(route.params.idConsulta)
                    ConsultaProntuario()
                    }}>
                    <ButtonTitle>Salvar</ButtonTitle>
                </Button>

            
                <LinkCode onPress = {() => navigation.replace("Main")}>Cancelar</LinkCode>

                </>
                ):<ActivityIndicator/>}
            </Container>

        </ScrollProfile>
    )
}