import { useEffect, useState } from "react"
import { CalendarHome } from "../../components/Calendar/Calendar"
import { Container } from "../../components/Container/ContainerStyle"
import { Header } from "../../components/Header/Header"
import { FilterAppointment } from "./MedicalConsultationsStyles"
import { BtnListAppointment } from "../../components/BtnListAppointment/BtnListAppointment"
import { ListComponent } from "../../components/List/ListStyles"
import { AppointmentCard } from "../../components/AppointmentCard/AppointmentCard"
import { CancellationModal } from "../../components/CancellationModal/CancellationModal"
import { AppointmentModal } from "../../components/AppointmentModal/AppointmentModal"
import { userDecodeToken } from "../../utils/Auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../../services/services"
import { dateFormatDbToView, functionPrioridade } from "../../utils/StringFunction"

export const MedicalConsultations = ({ navigation }) => {

    const [consultasApi, setConsultasApi] = useState([])
    const [profile, setProfile] = useState({})

    // state para o estado da lista(card)
    const [statusLista, setStatusLista] = useState("pendente")

    const Consultas = [
        { id: 1, nome: "Vinicius", situacao: "pendente" },
        { id: 2, nome: "Vinicius", situacao: "realizado" },
        { id: 3, nome: "Vinicius", situacao: "cancelado" },
        { id: 4, nome: "Vinicius", situacao: "realizado" },
        { id: 5, nome: "Vinicius", situacao: "cancelado" }
    ];

    // state para exibição dos modais 
    const [showModalCancel, setShowModalCancel] = useState(false)
    const [showModalAppointment, setShowModalAppointment] = useState(false)
    const [pacienteModal, setPacienteModal] = useState({nome:'', email: '', data: '', idPaciente : ''})
    

    async function ProfileLoad() {
        const profile = await userDecodeToken()

        if (profile) {
            console.log(profile)
        }
        setProfile(profile);

    }

    async function GetConsultas() {
        const token = JSON.parse(await AsyncStorage.getItem("token")).token

        if (token) {

            //Chamando o metodo da api
            await api.get('/Consultas/ConsultasMedico', {
                headers: { Authorization: `Bearer ${token}` }

            }).then(async (response) => {
                console.log(response.data);
                setConsultasApi(response.data)

            }).catch(error => {
                console.log(error)
            })
        }

    }

    useEffect(() => {
        GetConsultas();
        ProfileLoad();
    }, []);




    return (
        <Container>

            <Header />

            <CalendarHome />

            <FilterAppointment>

                {/* Agendadas */}
                <BtnListAppointment
                    textButton={"Agendadas"}
                    clickButton={statusLista === "Agendadas"}
                    onPress={() => setStatusLista("Agendadas")}
                />

                {/* Realizadas */}
                <BtnListAppointment
                    textButton={"Realizadas"}
                    clickButton={statusLista === "Realizadas"}
                    onPress={() => setStatusLista("Realizadas")}
                />

                {/* Canceladas */}
                <BtnListAppointment
                    textButton={"Canceladas"}
                    clickButton={statusLista === "Canceladas"}
                    onPress={() => setStatusLista("Canceladas")}
                />

            </FilterAppointment>


            {/* lista */}
            <ListComponent

                data={consultasApi}
                keyExtractor={(item) => item.id}

                renderItem={
                    ({ item }) =>
                        statusLista == item.situacao.situacao && (
                            <AppointmentCard
                                situacao={item.situacao.situacao}
                                onPressCancel={() => setShowModalCancel(true)}
                                onPressAppointment={() => {
                                    setShowModalAppointment(true)
                                    setPacienteModal({nome: item.paciente.idNavigation.nome, email: item.paciente.idNavigation.email, data: item.paciente.dataNascimento, idPaciente: item.pacienteId})
                                }
                                    
                                    }
                                ProfileNameCard={item.paciente.idNavigation.nome}
                                Age={dateFormatDbToView(item.dataConsulta)}
                                TipoConsulta={functionPrioridade(item.prioridade.prioridade)}
                                profile={"Medico"}
                            />
                        )
                }

            />

            {/* Modal cancelar */}

            <CancellationModal
                visible={showModalCancel}
                setShowModalCancel={setShowModalCancel}

            />

            {/* Modal ver prontuario */}

            <AppointmentModal
                visible={showModalAppointment}
                setShowModalAppointment={setShowModalAppointment}
                navigation={navigation}
                paciente = {pacienteModal}
            />


        </Container>
    )
}