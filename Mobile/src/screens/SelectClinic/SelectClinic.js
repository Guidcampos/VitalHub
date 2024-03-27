import { useEffect, useState } from "react";
import { SelectClinicCard, SelectMedCard } from "../../components/AppointmentCard/AppointmentCard"
import { Button } from "../../components/Button/ButtonStyle";
import { Container } from "../../components/Container/ContainerStyle";
import { LinkCode } from "../../components/Links/Links";
import { ListComponent } from "../../components/List/ListStyles";
import { ButtonTitle, Title, TitleSelect } from "../../components/Title/TitleStyle";
import api from "../../services/services";

export const SelectClinic = ({ navigation }) => {

    // const Clinicas = [
    //     { id: 1, nome: "Clínica Natureh", local: "São Paulo, SP", rate: "4,5", data: "Seg-Sex" },
    //     { id: 2, nome: "Diamond Pró-Mulher", local: "São Paulo, SP", rate: "4,8", data: "Seg-Sex" },
    //     { id: 3, nome: "Clinica Villa Lobos", local: "Taboão, SP", rate: "4,2", data: "Seg-Sab" },
    //     { id: 4, nome: "SP Oncologia Clínica", local: "Taboão, SP", rate: "4,2", data: "Seg-Sab" }

    // ];

    const [clinicasApi, setClinicasApi] = useState([])

    async function GetClinicas() {
        //Chamando o metodo da api
        await api.get('/Clinica/ListarTodas').then(async (response) => {
            // console.log(response.data);
            setClinicasApi(response.data)

        }).catch(error => {
            console.log(error)
        })

    }

    useEffect(() => {
        GetClinicas();
    }, []);

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
                        // rate={item.rate}
                        // openTime={item.data}

                        />
                    )
                }

            />

            <Button>
                <ButtonTitle onPress={() => navigation.replace("SelectMed")}>Continuar</ButtonTitle>
            </Button>

            <LinkCode onPress={() => navigation.replace("Main")}>Cancelar</LinkCode>

        </Container>
    );
};