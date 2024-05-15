import { Container, ContentAccount } from "../../components/Container/ContainerStyle"
import { Logo } from "../../components/Logo/LogoStyle"
import { ButtonTitle, ButtonTitleGoogle, SubtitleErro, TextAccount, Title } from "../../components/Title/TitleStyle"
import { Input } from "../../components/Input/Input"
import { LinkAccount, LinkMedium } from "../../components/Links/Links"
import { Button, ButtonGoogle } from "../../components/Button/ButtonStyle"
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react"
import api from "../../services/services"

import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from "react-native"
import { userDecodeToken } from "../../utils/Auth"


export const Login = ({ navigation }) => {
    // const [email, setEmail] = useState('gui@paciente.com')
    // const [email, setEmail] = useState('guilherme.campos.r@gmail.com')
    const [email, setEmail] = useState('gui3@medico.com')
    const [senha, setSenha] = useState('gui123')
    const [loading, setLoading] = useState(false)
    const [verificaLogin, setVerificaLogin] = useState(true)

    async function handleLogin() {
        setLoading(true)
        // console.log(loading);

        await api.post('/Login', {
            email: email,
            senha: senha
        }).then(async (response) => {
            console.log(response.data)
            await AsyncStorage.setItem("token", JSON.stringify(response.data))
            const token = await userDecodeToken()
            setLoading(false)
            setVerificaLogin(true)
            // token.name != '...' ? navigation.navigate("Main") : navigation.navigate("UserProfile")
            navigation.replace("Main")

        }).catch(error => {
            console.log(error)
            setVerificaLogin(false)
            setLoading(false)
        })


    }

    return (
        <Container>

            <Logo
                source={require('../../assets/VitalHub_Logo.png')}
            />

            <Title>Entrar ou criar conta</Title>

            <Input
                placeholder={'E-mail'}
                keyboardType={'text'}
                placeholderTextColor={'#34898F'}
                verificado={verificaLogin}
                value={email}
                onChangeText={(txt) => setEmail(txt)}

            // value={fieldValue}
            // onChangeText={onChangeText}
            />

            <Input
                placeholder={'Senha'}
                keyboardType={'text'}
                placeholderTextColor={'#34898F'}
                secureTextEntry={true}
                verificado={verificaLogin}
                value={senha}
                onChangeText={(txt) => setSenha(txt)}
            // value={fieldValue}
            // onChangeText={onChangeText}
            />

            {verificaLogin ? null : <SubtitleErro>Email ou senha invalidos</SubtitleErro>}


            <LinkMedium onPress={() => navigation.replace("ForgotPassword")}>Esqueceu sua senha?</LinkMedium>

            <Button disabled={loading} onPress={() => handleLogin()}>
                {loading ? <ActivityIndicator /> : <ButtonTitle>Entrar</ButtonTitle>}
            </Button>

            <ButtonGoogle disabled={loading}>
                <AntDesign name="google" size={18} color="#496BBA" />
                <ButtonTitleGoogle>Entrar com o Google</ButtonTitleGoogle>
            </ButtonGoogle>

            <ContentAccount>
                <TextAccount>Não tem conta ?</TextAccount>
                <LinkAccount onPress={() => navigation.replace("CreateAccount")}>Crie uma conta agora!</LinkAccount>
            </ContentAccount>

        </Container>
    )
}