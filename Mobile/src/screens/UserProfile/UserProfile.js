import { ActivityIndicator, Alert, StatusBar } from "react-native"
import { BoxInput } from "../../components/BoxInput/BoxInput"
import { Button, ButtonLogout, ButtonProfile } from "../../components/Button/ButtonStyle"
import { Container, ContainerInput, ScrollProfile } from "../../components/Container/ContainerStyle"
import { UserImage } from "../../components/Logo/LogoStyle"
import { ButtonTitle, SubtitleProfile, TitleProfile } from "../../components/Title/TitleStyle"
import { useEffect, useState } from "react"
import { userDecodeToken } from "../../utils/Auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../../services/services"
import { dateFormatDbToView, formatDate, invertDate } from "../../utils/StringFunction"

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ButtonCamera } from "./StyleUserProfile"
import { View } from "react-native"
import { CameraModal } from "../../components/CameraModal/CameraModal"

import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'
import moment from "moment/moment"
import { encode } from "base-64"
import { jwtDecode } from "jwt-decode"


export const UserProfile = ({ navigation }) => {
    const [token, setToken] = useState({})
    const [usuario, setUsuario] = useState(null)
    const [primeiroAcesso, setPrimeiroAcesso] = useState(false)

    const [loadFoto, setLoadFoto] = useState(false)
    const [foto, setFoto] = useState()
    const [loading, setLoading] = useState(false)

    const [showCameraModel, setShowCameraModel] = useState(false)
    const [uriCameraCapture, setUriCameraCapture] = useState("")

    const [editar, setEditar] = useState(false)
    const [verificadoCEP, setVerificadoCEP] = useState(true)
    const [verificadoCPF, setVerificadoCPF] = useState(true)
    const [verificadoCRM, setVerificadoCRM] = useState(true)
    const [verificadoRG, setVerificadoRG] = useState(true)
    const [verificadoNascimento, setVerificadoNascimento] = useState(true)

    //states para update
    const [usuarioATT, setUsuarioATT] = useState({
        nome: "",
        rg: "",
        nascimento: "",
        cpf: "",
        cep: "",
        logradouro: "",
        numero: "",
        cidade: "",
        crm: ""
    })

    //VERIFICAÇOES
    const verificaCep = () => {
        if (usuarioATT.cep.length !== 8) {
            Alert.alert('Aviso', 'O CEP deve ter exatamente 8 dígitos.')
            setVerificadoCEP(false)
        } else {
            setVerificadoCEP(true)
        }
    };
    const verificaCPF = () => {
        if (usuarioATT.cpf.length !== 11) {
            Alert.alert('Aviso', 'O CPF deve ter exatamente 11 dígitos.')
            setVerificadoCPF(false)
        } else {
            setVerificadoCPF(true)
        }
    };
    const verificaCRM = () => {
        if (usuarioATT.crm.length !== 10) {
            Alert.alert('Aviso', 'O CRM deve ter exatamente 10 dígitos.')
            setVerificadoCRM(false)
        } else {
            setVerificadoCRM(true)
        }
    };
    const verificaRG = () => {

        if (usuarioATT.rg.length < 9) {
            Alert.alert('Aviso', 'O RG deve ter mais que 9 dígitos.')
            setVerificadoRG(false)
        } else {
            setVerificadoRG(true)
        }
    };
    const verificaNascimento = () => {

        if (!usuarioATT.nascimento) {
            setVerificadoNascimento(false)
        } else if (usuarioATT.nascimento.length === 10) {
            setVerificadoNascimento(true)
        }
        else if (usuarioATT.nascimento.includes("-")) {
            setVerificadoNascimento(true)

        } else {
            setVerificadoNascimento(false)
            Alert.alert('Aviso', 'Por favor preencha uma data valida \n DD/MM/YYYY')
        }
    };



    const handleNascimento = (text) => {
        const formattedText = formatDate(text);
        setUsuarioATT({ ...usuarioATT, nascimento: formattedText });
    };


    async function updateProfile() {
        setLoading(true)

        try {
            if (token.role === "Paciente") {
                await api.put(`/Pacientes?idUsuario=${token.id}`,
                    {
                        rg: usuarioATT.rg,
                        cpf: usuarioATT.cpf,
                        dataNascimento: usuarioATT.nascimento.includes("-") ? invertDate(dateFormatDbToView(usuarioATT.nascimento)) : invertDate(usuarioATT.nascimento),
                        cep: usuarioATT.cep,
                        logradouro: usuarioATT.logradouro,
                        numero: usuarioATT.numero,
                        cidade: usuarioATT.cidade,
                        nome: usuarioATT.nome,
                    })
            } else {
                await api.put('/Medicos', {
                    nome: usuarioATT.nome,
                    crm: usuarioATT.crm,
                    cep: usuarioATT.cep,
                    logradouro: usuarioATT.logradouro,
                    numero: usuarioATT.numero,
                    cidade: usuarioATT.cidade,
                }, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token.token).token}`,
                        'Content-Type': 'application/json'
                    }
                })
            }

            if (token.name !== usuarioATT.nome) {
                try {
                    if (token) {
                        Alert.alert('Ação necessaria', `Prezado ${usuarioATT.nome}, é necessario relogar para autenticação`)
                        AsyncStorage.clear(), navigation.replace("Login")
                        setPrimeiroAcesso(false)
                    }
                } catch (error) {
                    console.error('Erro ao atualizar nome do usuário:', error);
                }
            }


            ProfileLoad()
            setLoading(false)
            setEditar(false)

            // if (primeiroAcesso) {
            //     navigation.replace("Main")
            //     setPrimeiroAcesso(false)
            // }

        } catch (error) {
            console.error("Erro ao atualizar os dados do usuário:", error);
            setLoading(false)
            setEditar(true)
        }
    }

    async function AlterarFotoPerfil() {

        setLoadFoto(true)
        const formData = new FormData();
        formData.append("Arquivo", {
            uri: uriCameraCapture,
            name: `image.${uriCameraCapture.split(".")[1]}`,
            type: `image/${uriCameraCapture.split(".")[1]}`
        });

        await api.put(`/Usuario/AlterarFotoPerfil?id=${token.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            // console.log(response) 
        })
            .catch(error => { console.log(error), setLoadFoto(false) })
        setLoadFoto(false)
    }

    async function ProfileLoad() {
        const token = await userDecodeToken()

        if (token) {
            // console.log(token)
            setToken(token)
            if (token.name === "...") {
                setEditar(true)
                setPrimeiroAcesso(true)
            }
            await api.get(`${token.role}s/BuscarPorId?id=${token.id}`
            ).then(response => {
                setFoto(response.data.idNavigation.foto)
                setUsuario(response.data)
                setUsuarioATT({
                    nome: response.data.idNavigation.nome,
                    rg: response.data.rg,
                    nascimento: response.data.dataNascimento,
                    cpf: response.data.cpf,
                    cep: response.data.endereco.cep,
                    logradouro: response.data.endereco.logradouro,
                    numero: response.data.endereco.numero,
                    cidade: response.data.endereco.cidade,
                    crm: response.data.crm
                })

                if (!usuarioATT.nascimento) {
                    setPrimeiroAcesso(true)
                    setVerificadoNascimento(false)
                }
                if (!usuarioATT.nascimento.includes("-")) {
                    setVerificadoNascimento(true)
                }



            }).catch(error => {
                console.log(error);
            })
        }
    }

    async function requestGaleria() {
        await MediaLibrary.requestPermissionsAsync();
        await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    useEffect(() => {
        ProfileLoad()
        requestGaleria();
    }, [loadFoto])

    useEffect(() => {
        if (uriCameraCapture !== null) {
            AlterarFotoPerfil();
        }
    }, [uriCameraCapture])





    return (
        <ScrollProfile>
            <Container>
                <View style={{ width: "100%", position: 'relative' }}>
                    {usuario != null ?
                        (loadFoto) ? <ActivityIndicator /> :
                            <UserImage
                                // source={require('../../assets/ProfileImage.png')}
                                source={{ uri: foto }}
                            /> : <></>}

                    <ButtonCamera onPress={() => { setShowCameraModel(true) }}>
                        <MaterialCommunityIcons name="camera-plus" size={20} color={'white'} />
                    </ButtonCamera>
                </View>
                {!editar ?
                    <TitleProfile>{token.name}</TitleProfile>
                    : null}

                <SubtitleProfile>{token.email}</SubtitleProfile>
                {!editar ? (
                    usuarioATT != null ?

                        <>
                            {token.role === 'Paciente' ?
                                <BoxInput
                                    textLabel='Data de Nascimento'
                                    placeholder='dd/mm/aaaa'
                                    keyType='numeric'
                                    editable={editar}
                                    fieldValue={usuarioATT.nascimento ? dateFormatDbToView(usuarioATT.nascimento) : usuarioATT.nascimento}
                                    maxLength={12}

                                />
                                : null}

                            <BoxInput
                                textLabel={token.role === 'Paciente' ? 'CPF' : 'CRM'}
                                placeholder='*********-**'
                                keyType='numeric'
                                editable={editar}
                                fieldValue=
                                {token.role === 'Paciente' ? usuarioATT.cpf ?
                                    `${usuarioATT.cpf.slice(0, 3)}.${usuarioATT.cpf.slice(3, 6)}.${usuarioATT.cpf.slice(6, 9)}-${usuarioATT.cpf.slice(-2)}` : null
                                    : usuarioATT.crm ?
                                        `${usuarioATT.crm.slice(0, 10)}-${usuarioATT.crm.slice(-1)}` : null
                                }
                                maxLength={15}
                            />

                            <BoxInput
                                textLabel='Endereço'
                                placeholder='Endereço...'
                                editable={editar}
                                fieldValue={usuarioATT.logradouro && usuarioATT.numero ? `${usuarioATT.logradouro} ${usuarioATT.numero}` : null}
                                keyType='text'
                            />

                            <ContainerInput>

                                <BoxInput
                                    textLabel='Cep'
                                    placeholder='00000-000'
                                    keyType='numeric'
                                    editable={editar}
                                    fieldWidth={45}
                                    fieldValue={usuarioATT.cep ? `${usuarioATT.cep.slice(0, 5)}-${usuarioATT.cep.slice(-3)}` : null}
                                    maxLength={10}
                                />

                                <BoxInput
                                    textLabel='Cidade'
                                    placeholder='Cidade...'
                                    keyType='text'
                                    editable={editar}
                                    fieldWidth={50}
                                    fieldValue={usuarioATT.cidade}
                                />

                            </ContainerInput>
                        </>
                        :
                        <ActivityIndicator />
                ) :
                    //EDITAR ----------------------------------------------
                    <>
                        <BoxInput
                            textLabel='Nome'
                            placeholder='Nome...'
                            editable={editar}
                            fieldValue={usuarioATT.nome}
                            keyType='text'
                            onChangeText={(txt) => setUsuarioATT({ ...usuarioATT, nome: txt })}
                        />

                        {token.role === 'Paciente' ?
                            <>
                                <BoxInput
                                    textLabel='Data de Nascimento'
                                    placeholder='dd/mm/aaaa'
                                    editable={editar}
                                    onBlur={verificaNascimento}
                                    verificado={verificadoNascimento}
                                    keyType='numeric'
                                    fieldValue={
                                        primeiroAcesso ? usuarioATT.nascimento :
                                            usuarioATT.nascimento.includes("-") ?

                                                dateFormatDbToView(usuarioATT.nascimento)

                                                : usuarioATT.nascimento}
                                    // onChangeText={(txt) => setUsuarioATT({
                                    //     ...usuarioATT,
                                    //     nascimento: txt
                                    // })}
                                    onChangeText={handleNascimento}
                                    maxLength={10}
                                />

                                <BoxInput
                                    textLabel='RG'
                                    placeholder='Informe seu RG'
                                    editable={editar}
                                    verificado={verificadoRG}
                                    onBlur={verificaRG}
                                    keyType='text'
                                    fieldValue={usuarioATT.rg}
                                    onChangeText={(txt) => setUsuarioATT({
                                        ...usuarioATT,
                                        rg: txt
                                    })}
                                    maxLength={10}

                                />

                            </>
                            : null}

                        <BoxInput
                            textLabel={token.role === 'Paciente' ? 'CPF' : 'CRM'}
                            placeholder='*********-**'
                            editable={editar}
                            keyType='numeric'
                            onBlur={token.role === 'Paciente' ? verificaCPF : verificaCRM}
                            verificado={verificadoCPF && verificadoCRM}
                            fieldValue=
                            {token.role === 'Paciente' ?
                                usuarioATT.cpf
                                :
                                usuarioATT.crm}
                            onChangeText={(txt) => token.role === 'Paciente' ?
                                setUsuarioATT({ ...usuarioATT, cpf: txt })
                                :
                                setUsuarioATT({ ...usuarioATT, crm: txt })}

                            maxLength={token.role === 'Paciente' ? 11 : 10}
                        />

                        <BoxInput
                            textLabel='Endereço'
                            placeholder='Endereço...'
                            editable={editar}
                            fieldValue={usuarioATT.logradouro}
                            onChangeText={(txt) => setUsuarioATT({ ...usuarioATT, logradouro: txt })}
                            keyType='text'
                        />
                        <BoxInput
                            textLabel='Numero'
                            placeholder='Numero...'
                            editable={editar}
                            keyType='numeric'
                            fieldValue={usuarioATT.numero ? String(usuarioATT.numero) : null}
                            onChangeText={(txt) => setUsuarioATT({ ...usuarioATT, numero: txt })}
                        />

                        <ContainerInput>

                            <BoxInput
                                textLabel='Cep'
                                placeholder='00000-000'
                                keyType='numeric'
                                editable={editar}
                                fieldWidth={45}
                                fieldValue={usuarioATT.cep}
                                onBlur={verificaCep}
                                verificado={verificadoCEP}
                                onChangeText={(txt) => {
                                    setUsuarioATT({ ...usuarioATT, cep: txt })
                                }}
                                maxLength={8}
                            />

                            <BoxInput
                                textLabel='Cidade'
                                placeholder='Cidade...'
                                editable={editar}
                                keyType='text'
                                fieldWidth={50}
                                fieldValue={usuarioATT.cidade}
                                onChangeText={(txt) => setUsuarioATT({ ...usuarioATT, cidade: txt })}
                            />

                        </ContainerInput>
                    </>
                }

                {/* // <Button>
                    // </Button> */}
                <ButtonProfile disabled={loading} onPress={() => editar ?

                    verificadoCEP && verificadoCPF && verificadoCRM && verificadoRG ? updateProfile() :

                        Alert.alert("DADOS INCORRETOS", "Preencha corretamente os campos em destaque")

                    : setEditar(true)}>
                    {editar ?
                        <ButtonTitle>{loading ? <ActivityIndicator /> : "Salvar"}</ButtonTitle>
                        :
                        <ButtonTitle>Editar</ButtonTitle>

                    }
                </ButtonProfile>

                <ButtonLogout onPress={() => {
                    !editar ?
                        (AsyncStorage.clear(), navigation.replace("Login"))
                        :

                        (setEditar(false), ProfileLoad(), setVerificadoCEP(true), setVerificadoCRM(true), setVerificadoCPF(true), setVerificadoRG(true))

                }}>
                    {!editar ?
                        <ButtonTitle>Sair</ButtonTitle> :
                        <ButtonTitle>Cancelar</ButtonTitle>}
                </ButtonLogout>

                <StatusBar barStyle='dark-content' translucent backgroundColor='transparent' />

            </Container>

            <CameraModal getMediaLibrary={true} visible={showCameraModel} setShowCameraModel={setShowCameraModel} setUriCameraCapture={setUriCameraCapture} />
        </ScrollProfile >
    )
}