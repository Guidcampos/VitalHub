
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {
  requestForegroundPermissionsAsync, //solicito a permissao de localizacao
  getCurrentPositionAsync, //captura a localizacao atual
  watchPositionAsync, //Captura em tempos a localizacao
  LocationAccuracy //Precisao de captura
} from "expo-location";
import { useEffect, useState, useRef } from "react";
import { mapskey } from "../../utils/mapsKey";
import api from "../../services/services";

<<<<<<< HEAD
export default function Map() {
  
  const mapReference = useRef(null)

  const [initialPosition, setInitialPosition] = useState(null);
  //api clínica
  const [clinicaApi, setClinicaApi] = useState()
  // para pegar a localização da clínica, irei precisar converter a localização em latitude e longitude
  // é mais simples pegar o cep e coverte-lo direto para long e lat
  const [finalPosition, setFinalPosition] = useState({ latitude: -23.550204, longitude: -46.311381 })
=======
export default function Map({ latitude, longitude, titleClinica }) {
  const mapReference = useRef(null)

  const [initialPosition, setInitialPosition] = useState(null);
  // { latitude: -23.550204, longitude: -46.311381 }
  const [finalPosition, setFinalPosition] = useState({ latitude: latitude, longitude: longitude })
>>>>>>> GuilhermeCampos

  async function CapturarLocalizacao() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();

      setInitialPosition(currentPosition);

      // console.log(initialPosition);
      // console.log(finalPosition.latitude);
      // console.log(finalPosition.longitude);
    }
  }
//Função de converter cep para longitude e latitude

// async function ConverterCep(params) {
    
  //     try {
  //       const cep = ''; // Substitua com o CEP que deseja converter
  //       const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=SUA_CHAVE_API`);
  //       const data = await response.json();
  //       if (data.results && data.results.length > 0) {
  //         const { lat, lng } = data.results[0].geometry.location;
  //         setCoordinates({ latitude: lat, longitude: lng });
  //       } else {
  //         setError('Nenhuma coordenada encontrada para o CEP fornecido.');
  //       }
  //     } catch (error) {
  //       setError('Ocorreu um erro ao buscar as coordenadas. Por favor, tente novamente mais tarde.');
  //     }
    
  // }
//Função de pegar localização da clínica baseado no cep?

  async function RecarregarVisualizacaoMapa() {
    if (mapReference.current && initialPosition) {
      await mapReference.current.fitToCoordinates(
        [
          { latitude: initialPosition.coords.latitude, longitude: initialPosition.coords.longitude },
          { latitude: finalPosition.latitude, longitude: finalPosition.longitude }
        ],
        {
          edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
          animated: true
        }
      )
    }
  }

  useEffect(() => {
    CapturarLocalizacao();

    //Capturar localizacao em tempo real
    // watchPositionAsync({
    //   accuracy : LocationAccuracy.High,
    //   timeInterval : 1000,
    //   distanceInterval : 1
    // }, async (response) => {
    //   await setInitialPosition( response )

    //   mapReference.current?.animateCamera({
    //     pitch : 60,
    //     center : response.coords
    //     }
    //   )
    // })'

  }, [10000]);

  useEffect(() => {
    RecarregarVisualizacaoMapa();
  }, [initialPosition]);

  return (
    <View style={styles.container}>
      {initialPosition != null ? (
        <MapView
          ref={mapReference}
          initialRegion={{

            latitude: initialPosition.coords.latitude,
            longitude: initialPosition.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          }}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={grayMapStyle}
        >

          <Marker

            coordinate={{

              latitude: initialPosition.coords.latitude,
              longitude: initialPosition.coords.longitude
            }}
            title='Meu Local'
            description='você está aqui'
          />
          <Marker

            coordinate={{
              latitude: finalPosition.latitude,

              longitude: finalPosition.longitude

            }}
            title={titleClinica}
          // description='Aprendendo a marcar no mapa'

          />

          <MapViewDirections
            origin={initialPosition.coords}
            destination={{
              latitude: finalPosition.latitude,

              longitude: finalPosition.longitude

            }}
            apikey={mapskey}
            strokeWidth={5}
            strokeColor="#496BBA"

          />
        </MapView>
      ) : (
        <>
          <Text>localização não encontrada</Text>

          <ActivityIndicator />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  map: {
    flex: 1,
    width: '100%'
  },


});

const grayMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#E1E0E7",
      },
    ],
  },
  {
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: -5,
      },
      {
        lightness: -5,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FBFBFB",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#33303E",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#66DA9F",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1B1B1B",
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#C6C5CE",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FBFBFB",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#ACABB7",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8A97",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8A97",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#8EA5D9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
];