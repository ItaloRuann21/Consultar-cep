import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TelaCEP from "./src/Componentes/Principal";
import TelaHistoricoCEP from "./src/Componentes/SegundaTela";

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#497FDE",
    paddingTop: 80,
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Consultador de CEP"
            component={TelaCEP}
            options={{
              title: "Consultador de CEP",
              headerShown: false, // Oculta o cabeçalho da tela
            }}
          />
          <Stack.Screen
            name="TelaHistoricoCEP"
            component={TelaHistoricoCEP}
            options={{
              title: "Histórico de consultas",
              // Deixe as opções vazias para usar o estilo padrão do cabeçalho
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
