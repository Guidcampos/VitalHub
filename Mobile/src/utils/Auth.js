import AsyncStorage from "@react-native-async-storage/async-storage"
import { decode, encode} from "base-64"
import { jwtDecode } from "jwt-decode"

if(!global.atob){
global.atob = decode

}
if(!global.btoa){

global.btoa = encode
}

export const userDecodeToken = async () =>{
const token = await AsyncStorage.getItem("token");
if(token === null){
    return null;
}
//Decodifica o token recebido
const decoded = jwtDecode(token)
return {
    name: decoded.name,
    role: decoded.role,
    email: decoded.email
}
}