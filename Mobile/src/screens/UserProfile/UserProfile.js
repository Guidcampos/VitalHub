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
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { ButtonCamera } from "./StyleUserProfile"
import { View } from "react-native"
import { CameraModal } from "../../components/CameraModal/CameraModal"

import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'

export const UserProfile = ({ navigation }) => {
    const [token, setToken] = useState({})
    const [usuario, setUsuario] = useState(null)

    const [showCameraModel, setShowCameraModel] = useState(false)
    const [uriCameraCapture, setUriCameraCapture] = useState("")
    const formData = new FormData();
    formData.append("Arquivo",{
        uri: uriCameraCapture,
        name: `image.${uriCameraCapture.split(".")[1]}`,
        type: `image.${uriCameraCapture.split(".")[1]}`
    });

    async function AlterarFotoPerfil(){
        await api.put(`/Usuario/AlterarFotoPerfil?id=${token.id}`,formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {console.log(response)}).
        catch(error => {console.log(error)})

    }

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
    async function AtualizarMedico(){

        await api.put(`/${token.role}s`)

    }

    async function requestGaleria(){
        await MediaLibrary.requestPermissionsAsync();
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      }
    
    

    useEffect(() => {
        ProfileLoad();
        requestGaleria();
    }, [])

    useEffect(()=>{
       if(uriCameraCapture !== null){
        AlterarFotoPerfil();
       }
    },[uriCameraCapture])

    return (
        <ScrollProfile>
            <Container>
            <View style = {{width:"100%",position:'relative'}}>
                <UserImage
                    source={require('../../assets/ProfileImage.png')}
                />
                
                <ButtonCamera onPress = {() => {setShowCameraModel(true)}
            
                }>
                <MaterialCommunityIcons name = "camera-plus" size={20} color={'white'}/>
                </ButtonCamera>
                </View>
                
                

                <TitleProfile>{token.name}</TitleProfile>
                <SubtitleProfile>{token.email}</SubtitleProfile>
                
                {token.name != " " ? (
                    usuario != null ?
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
                ) : null}


                <Button>
                    <ButtonTitle onPress={() => AlterarFotoPerfil()}>Salvar</ButtonTitle>
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

            <CameraModal  getMediaLibrary={true} visible={showCameraModel} setShowCameraModel={setShowCameraModel} setUriCameraCapture={setUriCameraCapture} />
        </ScrollProfile>
    )
}