import { useState } from "react"
import { Button } from "../../components/Button/ButtonStyle"
import { Container } from "../../components/Container/ContainerStyle"
import { Input } from "../../components/Input/Input"
import { LinkCode } from "../../components/Links/Links"
import { Logo } from "../../components/Logo/LogoStyle"
import { ButtonTitle, Subtitle, Title } from "../../components/Title/TitleStyle"
import api from "../../services/services"
import { Alert } from "react-native"

export const CreateAccount = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [verificarSenha, setVerificarSenha] = useState('')
    const [idTipoUsuario, setTipoUsuario] = useState('74A2CCB7-27C8-42D8-86BA-2880CD98EC7C')

    async function cadastrar(verificarSenha, senha) {
        if (email === "") {
            Alert.alert(
                "Erro", "Favor preencher o campo email"
            )

        }
        else if (senha === "") {
            Alert.alert(
                "Erro", "Favor preencher o campo senha"
            )

        }
        else if (verificarSenha === "") {
            Alert.alert(
                "Erro", "Favor preencher o campo confirmar senha"
            )

        }
        else if (verificarSenha === senha) {

            try {
                await api.post("/Pacientes", {
                    email: email,
                    nome: 'Sem nome',
                    foto: '',
                    senha: senha,
                    idTipoUsuario: idTipoUsuario,
                })
                console.log("Cadastrado com sucesso")

                navigation.replace("Login")
            } catch (error) {

                console.log("erro ao cadastrar")
            }

        }
        else {
            console.log("Senhas não batem")
            Alert.alert(
                "Erro", "Senhas não batem"
            )
        }
    }

    return (
        <Container>

            <Logo
                source={require('../../assets/VitalHub_Logo.png')}
            />

            <Title>Criar conta</Title>

            <Subtitle>Insira seu endereço de e-mail e senha para realizar seu cadastro.</Subtitle>

            <Input
                placeholder={'Usuário ou E-mail'}
                keyboardType={'text'}
                placeholderTextColor={'#34898F'}
                value={email}
                onChangeText={(txt) => setEmail(txt)}
            />

            <Input
                placeholder={'Senha'}
                keyboardType={'text'}
                placeholderTextColor={'#34898F'}
                secureTextEntry={true}
                value={senha}
                onChangeText={(txt) => setSenha(txt)}
            />

            <Input
                placeholder={'Confirmar senha'}
                keyboardType={'text'}
                placeholderTextColor={'#34898F'}
                secureTextEntry={true}
                value={verificarSenha}
                onChangeText={
                    (txt) => setVerificarSenha(txt)
                }
            />

            <Button onPress={() => cadastrar(verificarSenha, senha)}>
                <ButtonTitle>Cadastrar</ButtonTitle>
            </Button>

            <LinkCode onPress={() => navigation.replace("Login")}>Cancelar</LinkCode>

        </Container>
    )
}