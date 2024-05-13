import { ContainerHeader } from "../Container/ContainerStyle"
import { Ionicons } from '@expo/vector-icons';
import { BoxUser, DataUser, ImageUser, NameUser, TextDefault } from "./HomeStyles"

import React, { useEffect, useState } from "react";
import { userDecodeToken } from "../../utils/Auth";
import api from "../../services/services";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Header = ({ }) => {
    const [token, setToken] = useState({})
    const [foto, setFoto] = useState(null)

    async function profileLoad() {

        const token = await userDecodeToken()
        if (token) {
            // console.log("TOKEN");
            // console.log(token);
            setToken(token)
        }
    }

    async function fotoLoad() {
        await api.get(`Usuario/BuscarPorId?id=${token.id}`
        ).then(response => {

            setFoto(response.data.foto)
        }).catch(error => {
            console.log("esse " + error);
        })
    }

    useEffect(() => {
        profileLoad()
    }, [])

    useFocusEffect(React.useCallback(() => {
        fotoLoad()

    }, [token]))



    return (

        <ContainerHeader>

            <BoxUser>

                <ImageUser
                    source={{ uri: foto }}
                />

                <DataUser>
                    <TextDefault>Bem Vindo !</TextDefault>
                    <NameUser>{token.name}</NameUser>
                </DataUser>

            </BoxUser>

            <Ionicons onPress={() => console.log(token)} name="notifications" size={25} color="#fbfbfb" />

        </ContainerHeader>

    )
}