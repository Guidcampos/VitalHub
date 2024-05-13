import { useEffect, useState } from "react";
import { SelectMedCard } from "../../components/AppointmentCard/AppointmentCard"
import { Button } from "../../components/Button/ButtonStyle";
import { Container } from "../../components/Container/ContainerStyle";
import { LinkCode } from "../../components/Links/Links";
import { ListComponent } from "../../components/List/ListStyles";
import { ButtonTitle, Title, TitleSelect } from "../../components/Title/TitleStyle";
import api from "../../services/services";

//FORA DO COMPONENTE
//criar state para receber a lista de medicos
//criar a função para obter a lista de medicos da api e setar na lista
//criar um effect para a chamada da função


export const SelectMed = ({ navigation, route }) => {

    //Passar os dados do array para o flatlist
    // const Medicos = [
    //     { id: 1, nome: "Dr Kaua", image: "https://github.com/kauameloo.png", especialidade: "Cirurgião, Cardiologista" },
    //     { id: 2, nome: "Dr Paladino", image: "https://github.com/MateusPaladino-29.png", especialidade: "Demartologa, Esteticista" },
    //     { id: 3, nome: "Dr Eduardo", image: "https://github.com/Duduuz7.png", especialidade: "Clínico, Pediatra" },

    // ];
    const [medicosApi, setMedicosApi] = useState([])
    const [medico, setMedico] = useState(null)

    async function GetMedicos() {
        //Chamando o metodo da api
        await api.get(`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`).then(async (response) => {
            // console.log(response.data);
            setMedicosApi(response.data)

        }).catch(error => {
            console.log(error)
        })

    }

    async function handleContinue() {
        if (medico.medicoClinicaId) {
            navigation.replace("SelectDate", {
                agendamento: {
                    ...route.params.agendamento,
                    ...medico
                }
            })
        }
    }

    useEffect(() => {
        GetMedicos();
    }, []);

    useEffect(() => {
        console.log(route);
    }, [route]);

    return (

        <Container>


            <TitleSelect>Selecionar Medico</TitleSelect>

            {/* lista */}
            <ListComponent

                data={medicosApi}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}

                renderItem={
                    ({ item }) =>
                    (
                        <SelectMedCard
                            selected={medico && medico.medicoClinicaId === item.id}
                            medico={item}
                            setMedico={setMedico}
                            ProfileNameCard={item.idNavigation.nome}
                            textCard={item.especialidade.especialidade1}
                            imageUrl={{ uri: item.idNavigation.foto === 'string' ? "https://github.com/Guidcampos.png" : item.idNavigation.foto }}

                        />
                    )
                }

            />

            <Button onPress={() => handleContinue()}>
                <ButtonTitle>Continuar</ButtonTitle>
            </Button>

            <LinkCode onPress={() => navigation.replace("Main")}>Cancelar</LinkCode>

        </Container>
    );
};

