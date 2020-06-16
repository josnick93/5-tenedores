import React, { useRef } from "react";
import { View, StyleSheet, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import LoginForm from "../../components/Account/LoginForm";
import LoginFacebook from "../../components/Account/LoginFacebook";

export default function Login() {
  const toastRef = useRef();
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/logo.png")}
        resizeMode="contain"
        style={styles.logo}
      ></Image>
      <View>
        <LoginForm toastRef={toastRef} />
        <CreateAccount />
      </View>
      <Divider style={styles.divider}></Divider>
      <Text>Social login</Text>
      <View styles={styles.viewContainer}>
        <LoginFacebook toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

function CreateAccount() {
  const navigation = useNavigation();
  return (
    <Text styles={styles.textRegister}>
      ¿Aun no tienes una cuenta?{" "}
      <Text
        style={styles.registerBtn}
        onPress={() => navigation.navigate("register")}
      >
        Registrate
      </Text>{" "}
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  registerBtn: {
    color: "#00a680",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40,
  },
});
