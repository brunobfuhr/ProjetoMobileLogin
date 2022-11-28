import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text, Alert, ActivityIndicator, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import Checkbox from 'expo-checkbox';
const base64 = require('base-64');
import * as SecureStore from 'expo-secure-store';

const ViewLogin = ({ navigation }) => {

    const fieldUser = "myapp_usuario";
    const fieldPassword = "myapp_senha";
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState({
        username: '',
        password: '',
        saveUser: false,
    });

    useEffect(() => {

        async function getSecureStore(){
            const _username = await SecureStore.getItemAsync(fieldUser);
            const _password = await SecureStore.getItemAsync(fieldPassword);
            if(_username && _password) {
                /*setUsuario({
                    username: _username,
                    password: _password,
                    saveUser: true
                });*/
                login(_username, _password);
            }
        }

        getSecureStore();

    }, []) //seja executado somente na primeira renderizacao do componente

    function login(user, pass) {

        setLoading(true);

        setTimeout(() => {

            async function testLogin() {
                const response = await fetch('http://177.44.248.30:3333/auth', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic ' +
                            base64.encode(user + ":" + pass)
                    }
                });
                const json = await response.json();

                setLoading(false);
                if (json.id) {
                    if(usuario.saveUser){
                        await SecureStore.setItemAsync(fieldUser, usuario.username);
                        await SecureStore.setItemAsync(fieldPassword, usuario.password);
                        console.log("gravou");
                    }

                    //navegar adiante
                    navigation.navigate("ViewUsers");
                } else {
                    Alert.alert('Que pena 😥', json.message);
                }
            }

            testLogin();

        }, 900)

    }
    return (

        // <KeyboardAvoidingView
        // behavior={Plataform.OS === 'ios' ? 'padding' : 'height'}
        // serve para o teclado nao ficar por cima dos inputs no sistema IOS


        <View
            style={styles.container}>

            {/* if {loading == true ? <ActivityIndicator size='large' />} */}

            <Image
                style={{ width: 150, alignSelf: 'center' }}
                resizeMode='contain'
                source={require('../assets/logo-crie-ti.png')} />

            <Text style={styles.label}>Email</Text>

            <TextInput
                keyboardType='email-address'
                autoCapitalize='none' //para começar com letras minusculas
                placeholder='Informe seu email'
                placeholderTextColor='#ccc'
                value={usuario.username}
                onChangeText={(value) => setUsuario({ ...usuario, username: value })}
                style={styles.input} />


            <Text style={styles.label}>Senha</Text>

            <TextInput
                autoCapitalize='none'
                secureTextEntry={true}
                placeholder='Informe sua senha'
                placeholderTextColor='#ccc'
                value={usuario.password}
                onChangeText={(value) => setUsuario({ ...usuario, password: value })}
                style={styles.input} />


            <View  style={styles.checkbox}>
                <Checkbox
                    value={usuario.saveUser}
                    onValueChange={() => setUsuario({...usuario, saveUser: !usuario.saveUser})}
                />
                <Text style={styles.label}>Continuar conectado</Text>
            </View>


            <CustomButton
                backgroundColor="#0CF25D"
                textColor="#fff"
                label="Login"
                onPress={() => login()} />

        </View>
    )
}

export default ViewLogin;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        padding: 16,
        backgroundColor: '#275950',
        alignItems: 'flex-start',
    },
    checkbox:{
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 6,
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        color: '#000',
        fontSize: 16,
        fontFamily: 'inter-bold',
        paddingLeft: 6
    },
    label: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 5,
        fontFamily: 'inter-bold',
        
        
    },
    itemList: {
        width: '100%',
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemText: {
        flex: 1,
        color: '#000',
        paddingLeft: 8,
        fontSize: 24
    }

});