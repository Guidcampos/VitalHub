import { ActivityIndicator, StatusBar } from "react-native"
import { BoxInput } from "../../components/BoxInput/BoxInput"
import { Button, ButtonLogout, ButtonProfile } from "../../components/Button/ButtonStyle"
import { Container, ContainerInput, ScrollProfile } from "../../components/Container/ContainerStyle"
import { UserImage } from "../../components/Logo/LogoStyle"
import { ButtonTitle, SubtitleProfile, TitleProfile } from "../../components/Title/TitleStyle"
import { useEffect, useState } from "react"
import { userDecodeToken } from "../../utils/Auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../../services/services"
import { dateFormatDbToView } from "../../utils/StringFunction"


export const UserProfile = ({ navigation }) => {
    const [token, setToken] = useState({})
    const [usuario, setUsuario] = useState(null)

    async function ProfileLoad() {
        const token = await userDecodeToken()

        if (token) {
            console.log(token)
            setToken(token)
            await api.get(`${token.role}s/BuscarPorId?id=${token.id}`
            ).then(response => {
                // console.log(response.data)
                setUsuario(response.data)
            }).catch(error => {
                console.log(error);
            })
        }


    }


    useEffect(() => {

        ProfileLoad()

    }, [])
    return (
        <ScrollProfile>
            <Container>

                <UserImage
                    source={require('../../assets/ProfileImage.png')}
                />

                <TitleProfile>{token.name}</TitleProfile>

                <SubtitleProfile>{token.email}</SubtitleProfile>
                {usuario != null ?
                    <>
                        {token.role === 'Paciente' ?
                            <BoxInput
                                textLabel='Data de Nascimento'
                                placeholder='dd/mm/aaaa'
                                keyType='numeric'
                                fieldValue={dateFormatDbToView(usuario.dataNascimento)}
                                maxLength={12}
                            />
                            : null}

                        <BoxInput
                            textLabel={token.role === 'Paciente' ? 'CPF' : 'CRM'}
                            placeholder='*********-**'
                            keyType='numeric'
                            fieldValue=
                            {token.role === 'Paciente' ?
                                `${usuario.cpf.slice(0, 3)}.${usuario.cpf.slice(3, 6)}.${usuario.cpf.slice(6, 9)}-${usuario.cpf.slice(-2)}`
                                :
                                `${usuario.crm.slice(0, 10)}-${usuario.crm.slice(-1)}`
                            }
                            maxLength={15}
                        />

                        <BoxInput
                            textLabel='Endereço'
                            placeholder='Endereço...'
                            fieldValue={`${usuario.endereco.logradouro} ${usuario.endereco.numero}`}
                            keyType='text'
                        />

                        <ContainerInput>

                            <BoxInput
                                textLabel='Cep'
                                placeholder='00000-000'
                                keyType='numeric'
                                fieldWidth={45}
                                fieldValue={`${usuario.endereco.cep.slice(0, 5)}-${usuario.endereco.cep.slice(-3)}`}
                                maxLength={10}
                            />

                            <BoxInput
                                textLabel='Cidade'
                                placeholder='Cidade...'
                                keyType='text'
                                fieldWidth={50}
                                fieldValue={usuario.endereco.cidade}
                            />

                        </ContainerInput>
                    </>
                    :
                    <ActivityIndicator />
                }


                <Button>
                    <ButtonTitle>Salvar</ButtonTitle>
                </Button>

                <ButtonProfile>
                    <ButtonTitle>Editar</ButtonTitle>
                </ButtonProfile>

                <ButtonLogout onPress={() => {
                    AsyncStorage.clear(),
                        navigation.replace("Login")
                }}>
                    <ButtonTitle>Sair</ButtonTitle>
                </ButtonLogout>

                <StatusBar barStyle='dark-content' translucent backgroundColor='transparent' />

            </Container>
        </ScrollProfile>
    )
}