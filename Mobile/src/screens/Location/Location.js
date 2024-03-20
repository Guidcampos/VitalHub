import React from 'react';
import { SubtitleProfile, TitleProfile } from '../../components/Title/TitleStyle';
import { BoxInput } from '../../components/BoxInput/BoxInput';
import { Container, ContainerInput } from '../../components/Container/ContainerStyle';
import { MapImagem } from './Style';
import { StatusBar } from 'react-native';
import { LinkLocation } from '../../components/Links/Links';
import Map from '../../components/Map/Map';

export const Location = ({navigation}) => {
    return (
        <Container>

            <MapImagem>
                <Map/>
            </MapImagem>

            <TitleProfile>Clínica Natureh</TitleProfile>

            <SubtitleProfile>São Paulo, SP</SubtitleProfile>

            <BoxInput
            textLabel='Endereço'
            placeholder='Rua Vicenso Silva, 987'
            keyType='text'
            />

            <ContainerInput>

            <BoxInput
            textLabel='Número'
            placeholder='578'
            keyType='numeric'
            fieldWidth={45}
            maxLength={8}
            /> 

            <BoxInput
            textLabel='Bairro'
            placeholder='Moema-SP'
            keyType='text'
            fieldWidth={50}
            />

            </ContainerInput>

            <LinkLocation onPress={() => navigation.replace("Main")}>Voltar</LinkLocation>

            <StatusBar barStyle='dark-content' translucent backgroundColor='transparent'/>

            </Container>
    );
};

