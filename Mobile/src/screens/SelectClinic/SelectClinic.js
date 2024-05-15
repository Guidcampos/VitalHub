import { useEffect, useState } from "react";
import { SelectClinicCard, SelectMedCard } from "../../components/AppointmentCard/AppointmentCard"
import { Button } from "../../components/Button/ButtonStyle";
import { Container } from "../../components/Container/ContainerStyle";
import { LinkCode } from "../../components/Links/Links";
import { ListComponent } from "../../components/List/ListStyles";
import { ButtonTitle, Title, TitleSelect } from "../../components/Title/TitleStyle";
import api from "../../services/services";
import { Alert } from "react-native";

export const SelectClinic = ({ navigation, route }) => {

    // const Clinicas = [
    //     { id: 1, nome: "Clínica Natureh", local: "São Paulo, SP", rate: "4,5", data: "Seg-Sex" },
    //     { id: 2, nome: "Diamond Pró-Mulher", local: "São Paulo, SP", rate: "4,8", data: "Seg-Sex" },
    //     { id: 3, nome: "Clinica Villa Lobos", local: "Taboão, SP", rate: "4,2", data: "Seg-Sab" },
    //     { id: 4, nome: "SP Oncologia Clínica", local: "Taboão, SP", rate: "4,2", data: "Seg-Sab" }

    // ];

    const [clinicasApi, setClinicasApi] = useState([])

    const [clinicaCard, setClinicaCard] = useState(null)


    async function handleContinue() {
        if (clinicaCard.clinicaId) {
            navigation.replace("SelectMed", {
                agendamento: {
                    ...route.params.agendamento,
                    ...clinicaCard
                }
            })
        }
    }



    async function GetClinicas() {
        //Chamando o metodo da api
        await api.get(`/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`)
            .then(async (response) => {
                // console.log(response.data);
                setClinicasApi(response.data)

            }).catch(error => {
                console.log(error)
            })

    }

    useEffect(() => {
        GetClinicas();
    }, []);

    useEffect(() => {
        console.log(route);
    }, [route]);


    return (

        <Container>


            <TitleSelect>Selecionar Clinica</TitleSelect>

            {/* lista */}
            <ListComponent

                data={clinicasApi}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}

                renderItem={
                    ({ item }) =>
                    (
                        <SelectClinicCard
                            ProfileNameCard={item.nomeFantasia}
                            textCard={item.endereco.cidade}
                            selected={clinicaCard && clinicaCard.clinicaId === item.id}
                            clinica={item}
                            setClinicaCard={setClinicaCard}
                        // rate={item.rate}
                        // openTime={item.data}

                        />
                    )
                }

            />

            <Button>
                <ButtonTitle onPress={() => handleContinue()}>Continuar</ButtonTitle>
            </Button>

            <LinkCode onPress={() => navigation.replace("Main")}>Cancelar</LinkCode>

        </Container>
    );
};