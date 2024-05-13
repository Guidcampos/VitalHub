import React, { useEffect, useState } from "react"
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
import moment from "moment"
import { logProfileData } from "react-native-calendars/src/Profiler"
import { useFocusEffect } from "@react-navigation/native"

export const PatientConsultations = ({ navigation }) => {

    // state para exibição dos modais 
    const [showModalCancel, setShowModalCancel] = useState(false)
    const [showModalAppointment, setShowModalAppointment] = useState(false)
    const [showBookModal, setShowBookModal] = useState(false)
    const [showQueryModal, setShowQueryModal] = useState(false)

    const [consultasApi, setConsultasApi] = useState([])
    const [profile, setProfile] = useState({})
    const [dataConsulta, setDataConsulta] = useState('')



    const [medicoModal, setMedicoModal] = useState({ nome: '', especialidade: '', crm: '', clinica: '', foto: '' })
    //state para cancelar consulta
    const [consultaCancel, setConsultaCancel] = useState({
        id: '',
        //ID DE CONSULTAS CANCELAS, PEGAR NO BANCO -----------------------------
        situacao: "Canceladas"
    })


    async function ProfileLoad() {
        const token = await userDecodeToken()


        if (token) {
            // console.log(token);
            setProfile(token);
            setDataConsulta(moment().format('YYYY-MM-DD'))

        }
    }

    async function GetConsultas() {

        //Chamando o metodo da api
        await api.get(`/Pacientes/BuscarPorData?data=${dataConsulta}&id=${profile.id}`
        ).then(response => {

            setConsultasApi(response.data)
        }).catch(error => {
            console.log(error);
        })

    }


    //função listar todas as consultas
    // async function GetAllConsultas() {
    //     const token = JSON.parse(await AsyncStorage.getItem("token")).token

    //     if (token) {

    //         //Chamando o metodo da api
    //         await api.get('/Consultas', {
    //             headers: { Authorization: `Bearer ${token}` }

    //         }).then(async (response) => {
    //             // console.log(response.data);
    //             setConsultasApi(response.data)

    //         }).catch(error => {
    //             console.log(error)
    //         })
    //     }

    // }

    useEffect(() => {
        ProfileLoad();
    }, []);

    useEffect(() => {
        if (dataConsulta != '') {
            GetConsultas()
        }
    }, [dataConsulta, showModalCancel])


    // const Consultas = [
    //     { id: 1, nome: "Vinicius", situacao: "pendente" },
    //     { id: 2, nome: "Vinicius", situacao: "realizado" },
    //     { id: 3, nome: "Vinicius", situacao: "cancelado" },
    //     { id: 4, nome: "Vinicius", situacao: "realizado" },
    //     { id: 5, nome: "Vinicius", situacao: "cancelado" }
    // ];


    // state para o estado da lista(card)
    const [statusLista, setStatusLista] = useState("Agendadas")

    return (
        <Container>

            <Header />

            <CalendarHome setDataConsulta={setDataConsulta} />

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
                                onPressCard={() => {
                                    setShowQueryModal(item.situacao.situacao === "Agendadas" ? true : false),
                                        setMedicoModal({
                                            nome: item.medicoClinica.medico.idNavigation.nome,
                                            crm: item.medicoClinica.medico.crm,
                                            especialidade: item.medicoClinica.medico.especialidade.especialidade1,
                                            clinica: item.medicoClinica.clinicaId,
                                            foto: item.medicoClinica.medico.idNavigation.foto
                                        })
                                }}
                                onPressCancel={() => {
                                    setShowModalCancel(true),
                                        setConsultaCancel(prevState => ({ ...prevState, id: item.id }))
                                }}
                                onPressAppointment={() => setShowModalAppointment(true)}
                                navigation={navigation}
                                ProfileNameCard={item.medicoClinica.medico.idNavigation.nome}
                                Age={"CRM - " + item.medicoClinica.medico.crm}
                                TipoConsulta={functionPrioridade(item.prioridade.prioridade)}
                                idConsultaProntuario={item.id}
                                foto={item.medicoClinica.medico.idNavigation.foto}
                                hora={item.dataConsulta}
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
                medico={medicoModal}
            />

            {/* Modal cancelar */}

            <CancellationModal
                visible={showModalCancel}
                setShowModalCancel={setShowModalCancel}
                navigation={navigation}
                consultaCancel={consultaCancel}

            />

        </Container>
    )
}