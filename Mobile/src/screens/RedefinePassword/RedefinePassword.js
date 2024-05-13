import { Container, ConteinerIcon } from "../../components/Container/ContainerStyle"
import { AntDesign } from '@expo/vector-icons';
import { Logo } from "../../components/Logo/LogoStyle";
import { ButtonTitle, Subtitle, Title } from "../../components/Title/TitleStyle";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/ButtonStyle";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import api from "../../services/services";

export const RedefinePassword = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")

    async function AlterarSenha() {
        setLoading(true)
        if (senha === confirmarSenha) {

            api.put(`/Usuario/AlterarSenha?email=${route.params.emailRecup}`, { senhaNova: senha }).
                then(() => {
                    navigation.replace("Login")
                }).catch(error => {
                    console.log(error)
                    setLoading(false)
                })

        } else {
            alert("Senhas incompatíveis")
        }
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

            <Title>Redefinir senha</Title>

            <Subtitle>Insira e confirme a sua nova senha</Subtitle>

            <Input
                placeholder={'Nova Senha'}
                keyboardType={'text'}
                placeholderTextColor={'#34898F'}
                secureTextEntry={true}

                value={senha}
                onChangeText={(txt) => setSenha(txt)}
            />

            <Input
                placeholder={'Confirmar nova senha'}
                keyboardType={'text'}
                placeholderTextColor={'#34898F'}
                secureTextEntry={true}
                value={confirmarSenha}
                onChangeText={(txt) => setConfirmarSenha(txt)}
            />

            <Button disabled={loading} onPress={() => AlterarSenha()}>
                {loading ? <ActivityIndicator /> : <ButtonTitle>Confirmar nova senha</ButtonTitle>}
            </Button>


        </Container>
    )
}