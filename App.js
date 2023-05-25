import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TelaCEP from "./src/Componentes/Principal";
import TelaHistoricoCEP from "./src/Componentes/SegundaTela";

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Consultar de CEP"
            component={TelaCEP}
            options={{
              title: "Consultar de CEP",
              headerShown: false
            }}
          />
          <Stack.Screen
            name="TelaHistoricoCEP"
            component={TelaHistoricoCEP}
            options={{
              title: "Histórico de consulta",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#497FDE",
  },
});

export default App;
