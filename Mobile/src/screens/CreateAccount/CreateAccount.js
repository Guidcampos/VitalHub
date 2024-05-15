import { useState } from "react"
import { Button } from "../../components/Button/ButtonStyle"
import { Container } from "../../components/Container/ContainerStyle"
import { Input } from "../../components/Input/Input"
import { LinkCode } from "../../components/Links/Links"
import { Logo } from "../../components/Logo/LogoStyle"
import { ButtonTitle, Subtitle, SubtitleErro, Title } from "../../components/Title/TitleStyle"
import api from "../../services/services"
import { ActivityIndicator, Alert } from "react-native"
import { handleCallNotifications } from "../../components/Notifications/Notifications"

export const CreateAccount = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [verificarSenha, setVerificarSenha] = useState('')
    const [senhaVerificada, setSenhaVerificada] = useState(true)

    //TIPO DE USUARIO VINDO DO BANCO -- ALTERAR ---------------------------------------------
    const [idTipoUsuario, setTipoUsuario] = useState('775747A8-EC31-4288-B27E-BF43CE94812A')

    const [loading, setLoading] = useState(false)

    function confirmarSenha() {
        if (senha === verificarSenha) {
            setSenhaVerificada(true)
        } else {
            setSenhaVerificada(false)
        }

    }
    async function cadastrar(verificarSenha, senha) {
        setLoading(true)

        if (nome === "") {
            // Alert.alert(
            //     "Erro", "Favor preencher o campo Nome"
            // )
            console.log("NOME VAZIO")
        }
        if (email === "") {
            // Alert.alert(
            //     "Erro", "Favor preencher o campo email"
            // )
            console.log("email VAZIO")

        }
        else if (senha === "") {
            // Alert.alert(
            //     "Erro", "Favor preencher o campo senha"
            // )
            console.log("senha VAZIO")


        }
        else if (verificarSenha === "") {
            // Alert.alert(
            //     "Erro", "Favor preencher o campo confirmar senha"
            // )
            console.log("verificarSenha VAZIO")

        }
        else if (verificarSenha === senha) {
            setSenhaVerificada(true)
            setLoading(true)

            try {

                const form = new FormData()
                form.append("nome", `${nome}`)
                form.append("email", `${email}`)
                form.append("senha", `${senha}`)
                form.append("idTipoUsuario", `${idTipoUsuario}`)



                await api.post("/Pacientes", form,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                    // {
                    //     nome: "",
                    //     // foto: "string",
                    //     email: email,
                    //     senha: senha,
                    //     idTipoUsuario: idTipoUsuario,
                    // }
                )
                handleCallNotifications({
                    title: "Cadastrado com sucesso",
                    body: "Faça o login e complete seu cadastro!"
                })
                setLoading(false)
                navigation.replace("Login")
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        else {
            console.log("Senhas não batem")
            setSenhaVerificada(false)
            setLoading(false)
        }
        setLoading(false)

    }

    return (
        <Container>

            <Logo
                source={require('../../assets/VitalHub_Logo.png')}
            />

            <Title>Criar conta</Title>

            <Subtitle>Insira seu endereço de e-mail e senha para realizar seu cadastro.</Subtitle>

            <Input
                placeholder={'Nome'}
                keyboardType={'text'}
                placeholderTextColor={'#34898F'}
                value={nome}
                onChangeText={(txt) => setNome(txt)}
            />
            {nome ? null : <SubtitleErro>Preencha este campo</SubtitleErro>}

            <Input
                placeholder={'Email'}
                keyboardType={'text'}
                placeholderTextColor={'#34898F'}
                value={email}
                onChangeText={(txt) => setEmail(txt)}
            />
            {email ? null : <SubtitleErro>Preencha este campo</SubtitleErro>}

            <Input
                placeholder={'Senha'}
                keyboardType={'text'}
                placeholderTextColor={'#34898F'}
                secureTextEntry={true}
                value={senha}
                onChangeText={(txt) => setSenha(txt)}
            />
            {senha ? null : <SubtitleErro>Preencha este campo</SubtitleErro>}


            <Input
                placeholder={'Confirmar senha'}
                keyboardType={'text'}
                placeholderTextColor={'#34898F'}
                secureTextEntry={true}
                value={verificarSenha}
                onBlur={confirmarSenha}
                verificado={senhaVerificada}
                onChangeText={
                    (txt) => setVerificarSenha(txt)
                }
            />
            {senhaVerificada ? null : <SubtitleErro>Senhas diferentes</SubtitleErro>}

            <Button>
                {loading ? <ActivityIndicator />
                    : <ButtonTitle disabled={loading} onPress={() => cadastrar(verificarSenha, senha)}>Cadastrar</ButtonTitle>}
            </Button>

            <LinkCode disabled={loading} onPress={() => navigation.replace("Login")}>Cancelar</LinkCode>


        </Container>
    )
}