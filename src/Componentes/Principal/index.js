import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, TextInput, Button } from "react-native";
import { Input, Text } from "react-native-elements";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const TelaCEP = () => {
  const navigation = useNavigation();
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  const clearAddressData = async () => {
    try {
      await AsyncStorage.removeItem("addressData");
      setAddress(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("addressData").then((data) => {
      if (data) {
        setAddress(JSON.parse(data));
      }
    });
  }, []);

  const searchAddress = async () => {
    try {
      const cleanCep = cep.replace(/\D/g, "");
      if (cleanCep.length !== 8) {
        setError("CEP inválido. Por favor, digite um CEP válido.");
        setAddress(null);
        return;
      }
  
      const response = await axios.get(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );
      if (response.data.erro) {
        setError(
          "CEP não encontrado. Por favor, verifique o CEP digitado e tente novamente."
        );
        setAddress(null);
        return;
      }
  
      const addressData = {
        rua: response.data.logradouro,
        bairro: response.data.bairro,
        cidade: response.data.localidade,
        endereco: `${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}`,
      };
  
      await AsyncStorage.setItem("addressData", JSON.stringify(addressData));
  
      // Adicionar CEP pesquisado ao histórico
      const historicoCEP = await AsyncStorage.getItem("historicoCEP");
      const historico = historicoCEP ? JSON.parse(historicoCEP) : [];
      const novoItemHistorico = { cep: cleanCep, ...addressData };
      historico.unshift(novoItemHistorico); // Adicionar no início do array
      await AsyncStorage.setItem("historicoCEP", JSON.stringify(historico));
  
      setAddress(addressData);
      setError(null);

    } catch (error) {
      console.error(error);
      setError(
        "Ocorreu um erro ao buscar o endereço. Por favor, tente novamente mais tarde."
      );
      setAddress(null);
    }
  };
  

  
  

  return (
    //view para fundo
    <View style={styles.container1}>
      <View style={{ flexDirection: "column" }}><Button
        title="Histórico"
        onPress={() => navigation.navigate("TelaHistoricoCEP")}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
      </View>
      <Text style={styles.title}>Consultar CEP</Text>
      <View style={styles.container2}>
        <Text style={styles.label}>Digite seu CEP</Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Ex. 49044322"
            value={cep}
            onChangeText={setCep}
            keyboardType="numeric"
            containerStyle={styles.input}
            inputStyle={styles.inputText}
          />
        </View>
        <View style={{ flexDirection: "column" }}>
        
          <Button
            title="Consultar"
            onPress={searchAddress}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
          />

          {/* <Button
            title="Limpar"
            onPress={() => {
              setAddress(null);
              AsyncStorage.removeItem("addressData");
            }}
            buttonStyle={styles.clearButton}
            titleStyle={styles.clearButtonText}
          /> */}
        </View>
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : address ? (
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Rua:</Text>
          <Text style={styles.addressText}>{address.rua}</Text>
          <Text style={styles.addressLabel}>Bairro:</Text>
          <Text style={styles.addressText}>{address.bairro}</Text>
          <Text style={styles.addressLabel}>Cidade:</Text>
          <Text style={styles.addressText}>{address.cidade}</Text>
          <Text style={styles.addressLabel}>Endereço:</Text>
          <Text style={styles.addressText}>{address.endereco}</Text>

          <Button
            title="Limpar"
            onPress={() => {
              setAddress(null);
              AsyncStorage.removeItem("addressData");
            }}
            buttonStyle={styles.clearButton}
            titleStyle={styles.clearButtonText}
          />
        </View>
      ) : null}
    </View>
  );
};



// Estilos do Aplicativo
const styles = StyleSheet.create({
  container1: {
    width: "100%",
    height: "100%",
    botton: 0,
    alignItems: "center",
    backgroundColor: '#d8d8cffa',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 70,
  },
  container2: {
    width: "100%",
    height: "auto",
    marginTop: 30,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    //marginBottom: 0,
  },
  input: {
    width: "93%",
    borderRadius: 50,
    //backgroundColor: "#f6f6f6",
    height: 40,
    margin: 12,
    paddingLeft: 10,
  },
  inputText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "#2196f3",
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: "68%",
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  addressContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  addressText: {
    fontSize: 18,
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 20,
  },
  addressLabel: {
    fontWeight: "bold",
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: "#f44336",
    borderRadius: 10,
    height: 40,
    width: 100,
    marginTop: 45,
  },
  clearButtonText: {
    fontSize: 16,
  },
});

export default TelaCEP;
