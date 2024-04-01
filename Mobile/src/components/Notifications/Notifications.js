
//IMPORTAT RECURSOS DO EXPO-NOTIFICATIONS
import *as  Notifications from 'expo-notifications';

//SOLICITA AS PERMISSÕES DE NOTIFICAÇÃO AO INICIAR O APP
Notifications.requestPermissionsAsync();

//DEFINI COMO AS NOTIFICACOES DEVEM SER TRATADAS QUANDO RECEBIDAS 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    //MOSTRAR O ALERTA QUANDO A NOTIFICAÇÃO FOR RECEBIDA
    shouldShowAlert: true,
    //REPRODUZ SOM AO RECEBER NOTIFICAÇÃO
    shouldPlaySound: true,
    //NUMERO DE NOTIFICAÇÕES NO ICONE DO APP
    shouldSetBadge: false
  })
})


  //FUNÇÃO PARA LIDAR COM A CHAMADA DA NOTIFICAÇÃO
 export const handleCallNotifications = async ({title, body}) => {
    //OBTEM STATUS DA PERMISSÃO
    const { status } = await Notifications.requestPermissionsAsync()
    //VERIFICA SE O USUARIO CONCEDEU PERMISSÃO
    if (status !== "granted") {
      alert("Você não deixou as notificações ativas")
      return;
    }
    //AGENDA UMA NOTIFICAÇÃO 
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: null
    })
  }
 



