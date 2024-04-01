import { BoxInputMedical, BoxInputMedicalRecord } from "../../components/BoxInput/BoxInput"
import { Button } from "../../components/Button/ButtonStyle"
import { Container, ContainerMedicalRecord, ScrollProfile } from "../../components/Container/ContainerStyle"
import { LinkCode } from "../../components/Links/Links"
import { UserImage } from "../../components/Logo/LogoStyle"
import { ButtonTitle, SubtitleMedicalRecord, TitleProfile } from "../../components/Title/TitleStyle"

export const MedicalRecord = ({navigation}) => {
    return (
        <ScrollProfile 
        showsVerticalScrollIndicator={false}
        
        >

            <Container>

                <UserImage
                    source={require('../../assets/ProfileImage.png')}
                />

                <TitleProfile>Richard Kosta</TitleProfile>


                <ContainerMedicalRecord>

                    <SubtitleMedicalRecord>22 anos</SubtitleMedicalRecord>

                    <SubtitleMedicalRecord>richard.kosta@gmail.com</SubtitleMedicalRecord>


                </ContainerMedicalRecord>

                <BoxInputMedicalRecord
                    textLabel='Descrição da Consulta'
                    placeholder='Descrição'
                    keyType='text'
                    placeholderTextColor={'#34898F'}
                />

                <BoxInputMedical
                    textLabel='Diagnóstico do paciente'
                    placeholder='Diagnóstico'
                    keyType='text'
                    placeholderTextColor={'#34898F'}
                />


                <BoxInputMedicalRecord
                    textLabel='Prescrição Médica'
                    placeholder='Prescrição médica'
                    keyType='text'
                    placeholderTextColor={'#34898F'}
                />

                <Button onPress = {() => navigation.replace("Main")}>
                    <ButtonTitle>Salvar</ButtonTitle>
                </Button>

            
                <LinkCode onPress = {() => navigation.replace("Main")}>Cancelar</LinkCode>



            </Container>

        </ScrollProfile>
    )
}