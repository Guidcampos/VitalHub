import { useState } from "react"
import { Button } from "../../components/Button/ButtonStyle"
import { Container } from "../../components/Container/ContainerStyle"
import { Input } from "../../components/Input/Input"
import { LinkCode } from "../../components/Links/Links"
import { Logo } from "../../components/Logo/LogoStyle"
import { ButtonTitle, Subtitle, Title } from "../../components/Title/TitleStyle"
import api from "../../services/services"
<<<<<<< HEAD
import { Alert } from "react-native"

export const CreateAccount = ({ navigation }) => {
    const [email,setEmail] =  useState('')
    const [senha,setSenha] =  useState('')
    const [verificarSenha,setVerificarSenha] = useState('')
    const [idTipoUsuario,setTipoUsuario] = useState('74A2CCB7-27C8-42D8-86BA-2880CD98EC7C')

    async function cadastrar(verificarSenha, senha) {
        if(email === ""){
            Alert.alert(
                "Erro", "Favor preencher o campo email"
                 )
            
        }
        else if(senha === ""){
            Alert.alert(
                "Erro", "Favor preencher o campo senha"
                 )
           
        }
        else if(verificarSenha === ""){
            Alert.alert(
                "Erro", "Favor preencher o campo confirmar senha"
                 )
            
        }
        else if(verificarSenha === senha){
            
            try{
                await api.post("/Pacientes",{
                email:email,
                senha:senha,
                idTipoUsuario: idTipoUsuario,
            })  
            console.log("Cadastrado com sucesso")

            navigation.replace("Login")
            }catch(error){
    
                console.log("erro ao cadastrar")
            }

        }
        else{
            console.log("Senhas não batem")
            Alert.alert(
               "Erro", "Senhas não batem"
                )
        }
=======

export const CreateAccount = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [idTipoUsuario, setTipoUsuario] = useState('775747A8-EC31-4288-B27E-BF43CE94812A')
    async function cadastrar() {
        try {
            await api.post("/Pacientes", {
                email: email,
                senha: senha,
                idTipoUsuario: idTipoUsuario,
            })
            console.log("Cadastrado com sucesso")

        } catch (error) {

            console.log("erro ao cadastrar")
        }

>>>>>>> GuilhermeCampos
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
<<<<<<< HEAD
                value={verificarSenha}
                onChangeText={
                (txt) => setVerificarSenha(txt)
                }
            />
            
            <Button>
                <ButtonTitle onPress = {() => cadastrar(verificarSenha,senha)}>Cadastrar</ButtonTitle>
=======
                value={senha}
                onChangeText={(txt) => setSenha(txt)}
            />

            <Button onPress={() =>

                navigation.replace("Login")}>
                <ButtonTitle onPress={() => cadastrar()}>Cadastrar</ButtonTitle>
>>>>>>> GuilhermeCampos
            </Button>

            <LinkCode onPress={() => navigation.replace("Login")}>Cancelar</LinkCode>

        </Container>
    )
}