import React from "react";
import { StyleSheet, View } from "react-native";
import TelaCEP from "./src/Componentes/Principal";



export default function App() {
  return (
    <View style={styles.container}>
      <TelaCEP />
    </View>
  );
}


const styles = StyleSheet.create({
  
    
  container: {
    flex: 1,
    
    backgroundColor: "#497FDE",
    paddingTop: 80,
  },
});

