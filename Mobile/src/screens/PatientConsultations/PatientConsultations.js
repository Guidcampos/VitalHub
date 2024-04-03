import { useEffect, useState } from "react"
import { BtnListAppointment } from "../../components/BtnListAppointment/BtnListAppointment"
import { CalendarHome } from "../../components/Calendar/Calendar"
import { Container } from "../../components/Container/ContainerStyle"
import { Header } from "../../components/Header/Header"
import { FilterAppointment } from "../MedicalConsultations/MedicalConsultationsStyles"
import { ListComponent } from "../../components/List/ListStyles"
import { AppointmentCard } from "../../components/AppointmentCard/AppointmentCard"
import { FontAwesome6 } from '@expo/vector-icons';
import { BtnIcon } from "./Style"
import { BookModal } from "../../components/BookModal/BookModal"
import { QueryModal } from "../../components/QueryModal/QueryModal"
import { CancellationModal } from "../../components/CancellationModal/CancellationModal"
import api from "../../services/services"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { userDecodeToken } from "../../utils/Auth"
import { dateFormatDbToView, functionPrioridade } from "../../utils/StringFunction"

export const PatientConsultations = ({ navigation }) => {

    // state para exibição dos modais 
    const [showModalCancel, setShowModalCancel] = useState(false)
    const [showModalAppointment, setShowModalAppointment] = useState(false)
    const [showBookModal, setShowBookModal] = useState(false)
    const [showQueryModal, setShowQueryModal] = useState(false)

    const [consultasApi, setConsultasApi] = useState([])
    const [profile, setProfile] = useState({})

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
            await api.get('/Consultas', {
                headers: { Authorization: `Bearer ${token}` }

            }).then(async (response) => {
                // console.log(response.data);
                setConsultasApi(response.data)

            }).catch(error => {
                console.log(error)
            })
        }

    }
    async function handlePress( rota ){
        
        navigation.replace(rota, {clinicaId: consultasApi.medicoClinica.clinicaId})

    }

    useEffect(() => {
        GetConsultas();
        ProfileLoad();
    }, []);

    // const Consultas = [
    //     { id: 1, nome: "Vinicius", situacao: "pendente" },
    //     { id: 2, nome: "Vinicius", situacao: "realizado" },
    //     { id: 3, nome: "Vinicius", situacao: "cancelado" },
    //     { id: 4, nome: "Vinicius", situacao: "realizado" },
    //     { id: 5, nome: "Vinicius", situacao: "cancelado" }
    // ];

    // state para o estado da lista(card)
    const [statusLista, setStatusLista] = useState("pendente")

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
                                onPressCard={() => setShowQueryModal(item.situacao.situacao === "Agendadas" ? true : false)}
                                onPressCancel={() => setShowModalCancel(true)}
                                onPressAppointment={() => setShowModalAppointment(true)}
                                navigation={navigation}
                                ProfileNameCard={item.medicoClinica.medico.idNavigation.nome}
                                Age={dateFormatDbToView(item.dataConsulta)}
                                TipoConsulta={functionPrioridade(item.prioridade.prioridade)}
                            />
                        )
                }

            />

            <BtnIcon onPress={() => setShowBookModal(true)}>
                <FontAwesome6 name="stethoscope" size={24} color="white" />
            </BtnIcon>

            {/* Modal agendar consulta */}

            <BookModal
                visible={showBookModal}
                setShowBookModal={setShowBookModal}
                navigation={navigation}
            />

            {/* Modal query */}
            <QueryModal
                visible={showQueryModal}
                setShowQueryModal={setShowQueryModal}
                navigation={navigation}
            />

            {/* Modal cancelar */}

            <CancellationModal
                visible={showModalCancel}
                setShowModalCancel={setShowModalCancel}
                navigation={navigation}

            />

        </Container>
    )
}