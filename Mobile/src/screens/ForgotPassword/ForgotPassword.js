import { Container, ConteinerIcon } from "../../components/Container/ContainerStyle"
import { Logo } from "../../components/Logo/LogoStyle"
import { Feather } from '@expo/vector-icons';
import { ButtonTitle, Subtitle, Title } from "../../components/Title/TitleStyle";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/ButtonStyle";
import { useState } from "react";
import api from "../../services/services";
import { ActivityIndicator } from "react-native";

export const ForgotPassword = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    async function EnviarEmail() {
        setLoading(true)
        await api.post(`/RecuperarSenha?email=${email}`)
            .then(() => {
                navigation.replace("CheckEmail", { emailRecup: email })
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
        setLoading(false)

    }

    return (
        <Container>

            {/* lembrar de mexer no icon, pois esta mais acima que a imagem */}
            <ConteinerIcon onPress={() => navigation.replace("Login")}>

                <Feather name="arrow-left-circle" size={30} color="#34898F" />

            </ConteinerIcon>


            <Logo
                source={require('../../assets/VitalHub_Logo.png')}
            />


            <Title>Recuperar Senha</Title>

            <Subtitle>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</Subtitle>

            <Input
                placeholder={'Usuário ou E-mail'}
                keyboardType={'text'}
                placeholderTextColor={'#34898F'}
                value={email}
                onChangeText={(txt) => setEmail(txt)}
            />

            <Button disabled={loading} onPress={() => EnviarEmail()}>
                {loading ? <ActivityIndicator /> : <ButtonTitle >Continuar</ButtonTitle>}
            </Button>

        </Container>
    )
}