import { Container, ContainerInputEmail, ConteinerIcon } from "../../components/Container/ContainerStyle"
import { AntDesign } from '@expo/vector-icons';
import { Logo } from "../../components/Logo/LogoStyle";
import { ButtonTitle, Subtitle, Title } from "../../components/Title/TitleStyle";
import { InputCheckEmail } from "../../components/Input/InputStyles";
import { Button } from "../../components/Button/ButtonStyle";
import { LinkCode } from "../../components/Links/Links";
import { useState, useRef } from "react";
import { ActivityIndicator } from "react-native";
import api from "../../services/services";

export const CheckEmail = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const [codigo, setCodigo] = useState("")
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

    async function ValidarCodigo() {
        setLoading(true)

        await api.post(`/RecuperarSenha/ValidateRecoveryCode?email=${route.params.emailRecup}&codigo=${codigo}`)
            .then(() => {
                navigation.replace("RedefinePassword", { emailRecup: route.params.emailRecup })
                setLoading(false)
            }).catch(error => {
                console.log(error)
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
                            placeholder={'0'}
                            keyboardType={'numeric'}
                            placeholderTextColor={'#34898F'}
                            maxLength={1}
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

            <Button disabled={loading} onPress={() => ValidarCodigo()}>
                {loading ? <ActivityIndicator /> : <ButtonTitle>Entrar</ButtonTitle>}
            </Button>

            <LinkCode>Reenviar Código</LinkCode>



        </Container>
    )
}