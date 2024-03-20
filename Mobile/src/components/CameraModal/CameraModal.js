import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState, useRef } from 'react';
import { FontAwesome, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

export const CameraModal = ({ visible, setUriCameraCapture, setShowCameraModel = false }) => {

    const cameraRef = useRef(null)
    const [photo, setPhoto] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [tipoCamera, setTipoCamera] = useState(CameraType.front)

    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync()
        })();
    }, [])

    async function CapturePhoto() {
        if (cameraRef) {
            const response = await cameraRef.current.takePictureAsync()
            setOpenModal(true)
            setPhoto(response.uri)

        }
    }

    async function ClearPhoto() {
        setPhoto(null)
        setOpenModal(false)
    }

    async function UploadPhoto() {
        setUriCameraCapture(photo)
        setOpenModal(false)
        setShowCameraModel(false)
    }


    return (

        <Modal style={styles.container} visible={visible}>
            <Camera
                ref={cameraRef}
                type={tipoCamera}
                style={styles.camera}
                ratio='16:9'>
           
            <View style={styles.viewCapture}>

                <TouchableOpacity
                    style={styles.btnFlip}>
                    <Ionicons name='flash' size={40} color="#FFF" />

                </TouchableOpacity>

                <TouchableOpacity style={styles.btnCapture} onPress={() => CapturePhoto()}>
                    <FontAwesome name='camera' size={23} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnFlip}
                    onPress={() => setTipoCamera(tipoCamera === CameraType.front ? CameraType.back : CameraType.front)}>
                    <Ionicons name='camera-reverse' size={40} color="#FFF" />

                </TouchableOpacity>
            </View>
            </Camera>
            <TouchableOpacity style={styles.btnClear} onPress={() => setShowCameraModel(false)}>
                <AntDesign name='closecircle' size={40} color="#ff0000" />
            </TouchableOpacity>
            <Modal animationType='slide' transparent={false} visible={openModal}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>

                    <Image
                        style={{ width: "100%", height: 500, borderRadius: 15 }}
                        source={{ uri: photo }}
                    />

                    <View style={{ margin: 10, flexDirection: 'row', gap: 20 }}>
                        {/* Botoes de controle */}
                        <TouchableOpacity style={styles.btnClear} onPress={() => ClearPhoto()}>
                            <AntDesign name='closecircle' size={50} color="#ff0000" />
                        </TouchableOpacity>

                        {/* <Button onPress={() => setShowConfirmModal(true)}>
                            <ButtonTitle>Continuar</ButtonTitle>
                        </Button> */}

                        <TouchableOpacity style={styles.btnUpload} onPress={() => UploadPhoto()}>
                            <MaterialCommunityIcons  name='upload' size={50} color="#FFF" />
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    camera: {
        flex: 1,
        height: "70%",
        width: "90%",
        margin: 20,
        justifyContent: 'flex-end'
    },

    viewFlip: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },

    viewCapture: {
        alignItems: 'center',
        
        justifyContent: 'center',
        flexDirection: 'row',
    },

    btnFlip: {
        padding: 20
    },

    txtFlip: {
        fontSize: 20,
        color: '#FFF',
        marginBottom: 20
    },

    btnCapture: {
        width: 70,
        height: 70,
        padding: 20,
        margin: 20,
        borderRadius: 50,
        backgroundColor: "#121212",
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnClear: {
        margin: 20,
        borderRadius: 50,
        backgroundColor: "#FFF",
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnUpload: {
        margin: 20,
        borderRadius: 50,
        backgroundColor: "#000",
        justifyContent: 'center',
        alignItems: 'center',
    },
});