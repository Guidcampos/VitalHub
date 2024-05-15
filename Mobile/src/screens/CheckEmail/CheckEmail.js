import { Container, ContainerInputEmail, ConteinerIcon } from "../../components/Container/ContainerStyle"
import { AntDesign } from '@expo/vector-icons';
import { Logo } from "../../components/Logo/LogoStyle";
import { ButtonTitle, Subtitle, SubtitleErro, SubtitleErro1, Title } from "../../components/Title/TitleStyle";
import { InputCheckEmail } from "../../components/Input/InputStyles";
import { Button } from "../../components/Button/ButtonStyle";
import { LinkCode } from "../../components/Links/Links";
import { useState, useRef } from "react";
import { ActivityIndicator } from "react-native";
import api from "../../services/services";
import { handleCallNotifications } from "../../components/Notifications/Notifications";

export const CheckEmail = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const [codigo, setCodigo] = useState("")
    const [codigoVerificado, setCodigoVerificado] = useState(true)

    //array para receber os valores do input
    const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)]

    function focusNextInput(index) {
        //verificar se o index é menor que a quantidade de campo
        if (index < inputs.length - 1) {
            inputs[index + 1].current.focus()
        }
    }
    function focusPrevInput(index) {
        if (index > 0) {
            inputs[index - 1].current.focus()
        }
    }

    async function EnviarEmail() {
        setLoading(true)
        await api.post(`/RecuperarSenha?email=${route.params.emailRecup}`)
            .then(() => {
                setLoading(false)
                setCodigoVerificado(true)
                handleCallNotifications({
                    title: "Codigo reenviado com sucesso",
                    body: "Verifique seu email, seu novo codigo já foi enviado"
                })
            })
            .catch(error => {
                console.log(error)
            })
        setLoading(false)
    }

    async function ValidarCodigo() {
        setLoading(true)

        await api.post(`/RecuperarSenha/ValidateRecoveryCode?email=${route.params.emailRecup}&codigo=${codigo}`)
            .then(() => {
                navigation.replace("RedefinePassword", { emailRecup: route.params.emailRecup })
                setLoading(false)
                setCodigoVerificado
            }).catch(error => {
                console.log(error)
                setCodigoVerificado(false)
            })
        setLoading(false)
    }

    return (
        <Container>

            <ConteinerIcon onPress={() => navigation.replace("Login")}>

                <AntDesign name="closecircle" size={30} color="#34898F" />

            </ConteinerIcon>

            <Logo
                source={require('../../assets/VitalHub_Logo.png')}
            />

            <Title>Verifique seu e-mail</Title>

            <Subtitle>Digite o código de 4 dígitos enviado para {route.params.emailRecup}</Subtitle>

            <ContainerInputEmail>

                {/* <InputCheckEmail
                    placeholder={'0'}
                    keyboardType={'numeric'}
                    placeholderTextColor={'#34898F'}
                    maxLength={1}
                /> */}
                {
                    [0, 1, 2, 3].map((index) => (
                        <InputCheckEmail
                            key={index}
                            ref={inputs[index]}
                            placeholder={''}
                            keyboardType={'numeric'}
                            placeholderTextColor={'#34898F'}
                            maxLength={1}
                            verificado={codigoVerificado}
                            onChangeText={(txt) => {
                                //verificar se o campo é vazio
                                if (txt === "") {
                                    focusPrevInput(index)
                                } else {
                                    //verificar se o campo foi preenchido
                                    const codigoInformado = [...codigo]
                                    codigoInformado[index] = txt
                                    setCodigo(codigoInformado.join(''))
                                    focusNextInput(index)
                                }
                            }}
                        />
                    ))

                }


            </ContainerInputEmail>
            {codigoVerificado ? null :
                <SubtitleErro1>Codigo invalido</SubtitleErro1>
            }


            <Button disabled={loading} onPress={() => ValidarCodigo()}>
                {loading ? <ActivityIndicator /> : <ButtonTitle>Entrar</ButtonTitle>}
            </Button>

            <LinkCode disabled={loading} onPress={() => EnviarEmail()}> {loading ? <ActivityIndicator /> : "Reenviar Código"}</LinkCode>



        </Container>
    )
}