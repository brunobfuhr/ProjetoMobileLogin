import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
const base64 = require('base-64');
import * as SecureStore from 'expo-secure-store';
import { FontAwesome } from '@expo/vector-icons';




export default ViewUsers = () => {

    const fieldUser = "myapp_usuario";
    const fieldPassword = "myapp_senha";
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    /*
        Busca os usuários da API (através do listUsers)
        na criação do componente ViewUsers
    */
    useEffect(() => {
        listUsers();
    }, [])

    async function listUsers() {

        setLoading(true);

        const _username = await SecureStore.getItemAsync(fieldUser);
        const _password = await SecureStore.getItemAsync(fieldPassword);

        const response = await fetch('http://177.44.248.30:3333/users', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode(_username + ":" + _password)
            }
        });
        const json = await response.json();

        setLoading(false);
        if (json) {
            setUsers(json);
        } else {
            Alert.alert('Ops, deu ruim 😥', json.message);
        }

        if(item.sex == "M"){
            item.sex == <FontAwesome name="male" size={24} color="blue" />
        }else{
            
            <FontAwesome name="female" size={24} color="red" />
        }

    

    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Lista de Usuários</Text>
            <ScrollView>
                <View style={{ flex: 1 }}>
                    {
                        users.map((item) => {
                            console.log('ITEM=>', item)
                            return (
                                <View 
                                style={styles.container2}
                                key={item.id}>
                                    
                                  
                                    

                                    <Text style={styles.label}>Nome : {item.name} </Text>
                                    <Text style={styles.label}>Sexo : {item.sex}</Text>
                                    <Text style={styles.label}>Idade : {item.age}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>

        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        padding: 16,
        backgroundColor: '#275950',
        // alignItems: 'flex-start',
        borderWidth: 1,
        borderRadius: 6,
        borderColor:"#fff",
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        padding: 1,
        backgroundColor: '#fff',
        // alignItems: 'flex-start',
        borderWidth: 1,
        borderRadius: 6,
        borderColor:"#fff",
        margin: 3,
        
    },
    text: {
        color: "#fff",
        fontSize: 30,
        alignSelf: 'center',
        fontFamily: 'inter-black',
        textDecorationLine: 'underline',
        paddingBottom: 15
    },
    label: {
        color: "#000",
        fontSize: 20,
        
    }
});