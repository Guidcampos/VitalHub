import { Container, ContainerInputEmail, ConteinerIcon } from "../../components/Container/ContainerStyle"
import { AntDesign } from '@expo/vector-icons';
import { Logo } from "../../components/Logo/LogoStyle";
import { ButtonTitle, Subtitle, Title } from "../../components/Title/TitleStyle";
import { InputCheckEmail } from "../../components/Input/InputStyles";
import { Button } from "../../components/Button/ButtonStyle";
import { LinkCode } from "../../components/Links/Links";
import api from "../../services/services";
//Hook
import { useRef, useState } from "react";

export const CheckEmail = ({navigation, route}) => {

    const [codigo,setCodigo] = useState("")
    const inputs = [useRef(null),useRef(null),useRef(null),useRef(null)]

    async function ValidarCodigo(){
        await api.post(`/RecuperarSenha/ValidateSentCode?email=${route.params.emailRecuperacao}&codigo=${codigo}`).then(() =>
            {
                navigation.replace("RedefinePassword", {emailRecuperacao: route.params.emailRecuperacao})
            }
            ).catch(error => {
                console.log(error)
            })


    }

    function focusNextInput(index){
        if(index < inputs.length - 1){

            inputs[ index + 1 ].current.focus()

        }
        
    }
    function focusPrevInput(index){
        if (index > 0) {
            inputs[index-1].current.focus()
        }

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

            <Subtitle>Digite o código de 4 dígitos enviado para {route.params.emailRecuperacao}</Subtitle>

            <ContainerInputEmail>

                {/* <InputCheckEmail
                    placeholder={'0'}
                    keyboardType={'numeric'}
                    placeholderTextColor={'#34898F'}
                    maxLength={1}
                    
                /> */}
                {
                    [0,1,2,3].map((index)=>(
                    <InputCheckEmail
                    key={index}
                    ref = {inputs[index]}

                    placeholder={'0'}
                    keyboardType={'numeric'}
                    placeholderTextColor={'#34898F'}
                    maxLength={1}

                    onChangeText = {(txt)=>{
                        if(txt === ""){
                            focusPrevInput(index)
                        }else{
                            //... spread - pega tudo que vem do objeto como valor
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

            <Button onPress={() => ValidarCodigo()}>
                <ButtonTitle>Entrar</ButtonTitle>
            </Button>

            <LinkCode>Reenviar Código</LinkCode>



        </Container>
    )
}