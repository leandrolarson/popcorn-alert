import { useState, useEffect } from "react";
import { View, StyleSheet, Image, Alert, Switch, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import FormInput from "./FormInput";
import FormButton from "./FormButton";

export default function FormScreen() {

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [movieGenre, setMovieGenre] = useState("");

  const [receiveNotifications, setReceiveNotifications] = useState(false);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [genreError, setGenreError] = useState("");


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []); 


  useEffect(() => {
    const isValidName = name.trim().length >= 3;
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    const isValidGenre = movieGenre.trim().length > 3;


    setNameError(
      name.length > 0 && !isValidName ? "Mínimo de 3 caracteres." : "",
    );
    setEmailError(email.length > 0 && !isValidEmail ? "E-mail inválido." : "");
    setGenreError(
      movieGenre.length > 0 && !isValidGenre ? "Campo obrigatório." : "",
    );

   
    if (isValidName && isValidEmail && isValidGenre) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [name, email, movieGenre]); 

 
  const handleSubmeter = () => {
    const formatedDate = dayjs().format("YYYY-MM-DD HH:mm:ss");

    const formData = {
      userName: name,
      userEmail: email,
      favoriteGenre: movieGenre,
      notification: receiveNotifications, 
      submissionStatus: "PENDING REVIEW",
    };

    console.log(`\n[LOG] ${formatedDate} - Form Submission Successful!`);
    console.log(JSON.stringify(formData, null, 2));

    Alert.alert("Sucesso!", `Formulário enviado com sucesso!`);
  };

 
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
         
        }}
      >
        <View style={styles.loading}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Sistema Carregado...
          </Text>
          <Ionicons name="battery-full" size={24} color="black" />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
    
      <Image style={styles.logo} source={require("../assets/logo.png")} />

   
      <FormInput
        label="Nome"
        placeholder="Digite seu nome completo"
        value={name}
        onChangeText={setName}
        error={nameError}
      />

      <FormInput
        label="Email"
        placeholder="exemplo@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        error={emailError}
      />

      <FormInput
        label="Gênero de Filme Favorito"
        placeholder="Ex: Ficção Científica, Terror, Comédia"
        value={movieGenre}
        onChangeText={setMovieGenre}
        error={genreError}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>
          Receber Notificações de Lançamentos?
        </Text>
       
        <Switch
          value={receiveNotifications}
          onValueChange={setReceiveNotifications}
          trackColor={{ false: "#767577", true: "#4A90E2" }}
          thumbColor={receiveNotifications ? "#ffffff" : "#f4f3f4"}
        />
      </View>

      <View style={styles.buttonContainer}>
   
        <FormButton
          title="Enviar Formulário"
          onPress={handleSubmeter}
          disabled={!isButtonEnabled} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 16,
  },
  switchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  switchLabel: { fontSize: 14, fontWeight: "bold", color: "#333", flex: 1 },
  buttonContainer: { width: "100%", marginTop: 10 },
  loading: { flexDirection: "row", gap: 10 },
});
