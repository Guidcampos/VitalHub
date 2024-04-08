import { Container, ContentAccount } from "../../components/Container/ContainerStyle"
import { Logo } from "../../components/Logo/LogoStyle"
import { ButtonTitle, ButtonTitleGoogle, TextAccount, Title } from "../../components/Title/TitleStyle"
import { Input } from "../../components/Input/Input"
import { LinkAccount, LinkMedium } from "../../components/Links/Links"
import { Button, ButtonGoogle } from "../../components/Button/ButtonStyle"
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react"
import api from "../../services/services"

import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from "react-native"

export const Login = ({ navigation }) => {
    const [email, setEmail] = useState('gui@paciente.com')
    const [senha, setSenha] = useState('gui123')
    const [loading, setLoading] = useState(false)

    async function handleLogin() {
        setLoading(true)
        // console.log(loading);

        await api.post('/Login', {
            email: email,
            senha: senha
        }).then(async (response) => {
            // console.log(response.data)
            await AsyncStorage.setItem("token", JSON.stringify(response.data))
            setLoading(false)
            navigation.navigate("Main")

        }).catch(error => {
            console.log(error)
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
                placeholder={'Usuário ou E-mail'}
                keyboardType={'text'}
                placeholderTextColor={'#34898F'}

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

                value={senha}
                onChangeText={(txt) => setSenha(txt)}
            // value={fieldValue}
            // onChangeText={onChangeText}
            />


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