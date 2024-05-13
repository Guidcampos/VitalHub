import React, { useEffect, useState } from 'react';
import { SubtitleProfile, TitleProfile } from '../../components/Title/TitleStyle';
import { BoxInput } from '../../components/BoxInput/BoxInput';
import { Container, ContainerInput, ScrollViewLocation } from '../../components/Container/ContainerStyle';
import { MapImagem } from './Style';
import { ActivityIndicator, StatusBar } from 'react-native';
import { LinkLocation } from '../../components/Links/Links';
import Map from '../../components/Map/Map';
import api from '../../services/services';

export const Location = ({ navigation, route }) => {
    const [clinica, setClinica] = useState(null)

    useEffect(() => {

        if (clinica == null) {
            BuscarClinica()
        }
        console.log(clinica)
    }, [clinica])



    async function BuscarClinica() {
        await api.get(`/Clinica/BuscarPorId?id=${route.params.ClinicaId}`)
            .then(response => {
                setClinica(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    return (
        <Container>
            {clinica != null ? (
                <>
                    <MapImagem>
                        <Map latitude={clinica.endereco.latitude} longitude={clinica.endereco.longitude} titleClinica={clinica.nomeFantasia} />
                    </MapImagem>
                    <TitleProfile>{clinica.nomeFantasia}</TitleProfile>

                    <SubtitleProfile>{clinica.endereco.cidade}</SubtitleProfile>

                    <ScrollViewLocation contentContainerStyle={style = { alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                        <BoxInput
                            textLabel='Endereço'
                            placeholder='Endereço'
                            keyType='text'
                            editable={false}
                            fieldValue={clinica.endereco.logradouro}
                        />

                        <ContainerInput>

                            <BoxInput
                                textLabel='Número'
                                placeholder='Número'
                                keyType='numeric'
                                fieldWidth={45}
                                editable={false}
                                maxLength={8}
                                fieldValue={String(clinica.endereco.numero)}
                            />

                            <BoxInput
                                textLabel='Bairro'
                                placeholder='Bairro'
                                keyType='text'
                                editable={false}
                                fieldWidth={50}
                                fieldValue={clinica.endereco.cidade}
                            />

                        </ContainerInput>
                    </ScrollViewLocation>
                </>
            ) :
                <ActivityIndicator />
            }
            <LinkLocation onPress={() => navigation.replace("Main")}>Voltar</LinkLocation>

            <StatusBar barStyle='dark-content' translucent backgroundColor='transparent' />
        </Container>
    );
};

