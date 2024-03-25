import { ContainerHeader } from "../Container/ContainerStyle"
import { Ionicons } from '@expo/vector-icons';
import { BoxUser, DataUser, ImageUser, NameUser, TextDefault } from "./HomeStyles"
import { userDecodeToken } from "../../utils/Auth";
import { useEffect, useState } from "react";
export const Header = () => {
    const [token,setToken] = useState({})
    
    async function ProfileLoad() {
        const token = await userDecodeToken()

        if (token) {
            console.log(token)
        }
        setToken(token);
        
    }
    useEffect(()=>{
        
        ProfileLoad()
    },[])
    return (

        <ContainerHeader>

            <BoxUser>

                <ImageUser
                    source={require('../../assets/unsplash_3HIroMoyre8.png')}
                />
                
                <DataUser>
                    <TextDefault>Bem Vindo !</TextDefault>
                    <NameUser>{token.name}</NameUser>
                </DataUser>

            </BoxUser>

            <Ionicons name="notifications" size={25} color="#fbfbfb" />

        </ContainerHeader>

    )
}