import { ContainerHeader } from "../Container/ContainerStyle"
import { Ionicons } from '@expo/vector-icons';
import { BoxUser, DataUser, ImageUser, NameUser, TextDefault } from "./HomeStyles"

import { useEffect, useState } from "react";
import { userDecodeToken } from "../../utils/Auth";

export const Header = () => {
    const [token, setToken] = useState({})

    async function profileLoad() {

        const token = await userDecodeToken()
        if (token) {
            // console.log("TOKEN");
            // console.log(token);
            setToken(token)
        }
    }

    useEffect(() => {
        profileLoad()
    }, [])

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