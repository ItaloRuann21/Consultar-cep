import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const TelaHistoricoCEP = () => {
  const [historico, setHistorico] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getHistorico = async () => {
      try {
        const data = await AsyncStorage.getItem("historicoCEP");
        if (data) {
          setHistorico(JSON.parse(data));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getHistorico();
  }, []);

  const navigateToCEPDetails = (cep) => {
    navigation.navigate("CEPDetails", { cep });
  };

  const clearHistorico = async () => {
    try {
      await AsyncStorage.removeItem("historicoCEP");
      setHistorico([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.clearButton} onPress={clearHistorico}>
        <Text style={styles.clearButtonText}>Limpar Histórico</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollContainer}>
        {historico.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cepButton}
            onPress={() => navigateToCEPDetails(item.cep)}
          >
            <Text style={styles.cepButtonText}>CEP: {item.cep}</Text>
            <Text style={styles.addressText}>
              Rua: {item.rua}
            </Text>
            <Text style={styles.addressText}>
              Bairro: {item.bairro}
            </Text>
            <Text style={styles.addressText}>
              Cidade: {item.cidade}
            </Text>
            <Text style={styles.addressText}>
              Endereço: {item.endereco}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cepButton: {
    backgroundColor: "#eaeaea",
    padding: 10,
    marginBottom: 10,
  },
  cepButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addressText: {
    fontSize: 14,
    marginTop: 4,
  },
  clearButton: {
    backgroundColor: "#f44336",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TelaHistoricoCEP;
