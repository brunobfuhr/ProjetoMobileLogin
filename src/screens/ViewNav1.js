import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import * as Animatable from 'react-native-animatable';

const ViewNav1 = (props) => {
  return (
    <Animatable.View
      animation="fadeIn"
      style={styles.container}>

      <CustomButton
        backgroundColor="#0CF25D"
        textColor='#fff'
        onPress={() => props.navigation.navigate("ViewTasks")}
        label="Navegar para ViewTasks" />

      <CustomButton
        backgroundColor="#0CF25D"
        textColor='#fff'
        onPress={() => props.navigation.navigate("ViewLogin")}
        label="Navegar para Login" />

      <CustomButton
        backgroundColor="#0CF25D"
        textColor='#fff'
        onPress={() => props.navigation.navigate("ViewUsers")}
        label="Navegar para ViewUsers" />

    </Animatable.View>
  );
}

export default ViewNav1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#275950',
    justifyContent: 'center',
    alignItems: 'center',
  }
});