import AnimationInput from "@/components/AnimationInput";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Platform
} from "react-native";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");

  // Estilos del botón y del input según la plataforma
  const buttonStyle = Platform.OS === 'web' ? styles.buttonWeb : styles.button;
  const inputStyle = Platform.OS === 'web' ? styles.inputWeb : styles.input;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header con el botón de "Back" */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Ilustración */}
      <View style={styles.illustrationContainer}>
        <Image
          source={{ uri: "https://example.com/your-image-url.png" }} // Cambia esto por la URL de tu imagen
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Formulario de inicio de sesión */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Log In</Text>
        {/* <TextInput
          style={inputStyle}
          placeholder="Mobile Number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
        /> */}

        <AnimationInput 
          placeholder="Mobile Number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
        <TouchableOpacity
          style={[buttonStyle, !mobileNumber && styles.buttonDisabled]}
          disabled={!mobileNumber}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7C791", 
  },
  header: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingBottom: 20,
    backgroundColor: "#FFA726",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: 'bold',
    marginLeft: 20
  },
  illustrationContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: "center",
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",  // Ancho completo en dispositivos móviles
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  inputWeb: {
    width: "30%",  // Cambia el ancho a 80% en la web
    height: 45, // Opcional: Cambia el tamaño para la web
    borderColor: "#ccc",
    borderWidth: 2, // Opcional: Un borde más grueso para la web
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 18, // Opcional: Aumentar el tamaño de la fuente
  },
  button: {
    width: "100%",  // Ancho completo en dispositivos móviles
    height: 50,
    backgroundColor: "#FFA726",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonWeb: {
    width: "30%",  // Cambia el ancho a 80% en la web
    height: 45, // Opcional: Cambia el tamaño para la web
    backgroundColor: "#FFA726",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ddd",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});
