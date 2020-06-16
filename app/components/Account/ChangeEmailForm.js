import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

import { validateEmail } from "../../utils/validations";
import { reauthenticate } from "../../utils/api.js";

export default function ChangeEmailForm(props) {
  const { email, setShowModal, toastRef, setReloadUserIndo } = props;
  const [formData, setformData] = useState(defaultValue());
  const [showPassword, setshowPassword] = useState(false);
  const [error, setError] = useState(defaultErrorValue());
  const [isLoading, setisLoading] = useState(false);

  const onChange = (e, type) => {
    setformData({ ...formData, [type]: e.nativeEvent.text });
  };
  const onSubmit = () => {
    setError({});
    if (!formData.email || email === formData.email) {
      setError({ email: "El email no ha cambiado." });
    } else if (!validateEmail(formData.email)) {
      setError({ email: "Email incorrecto." });
    } else if (!passwod) {
      setError({
        passwod: "La contraseña no puede estar vacia.",
      });
    } else {
      setisLoading(true);
      reauthenticate(formData.password)
        .then((response) => {
          firebase
            .auth()
            .currentUser.updateEmail(formData.email)
            .then(() => {
              setisLoading(false);
              setReloadUserIndo(true);
              toastRef.current.show("Email actualizado correctamente.");
              setShowModal(false);
            })
            .catch((err) => {
              setError({ email: "Error al actualizar el email." });
              setisLoading(false);
            });
        })
        .catch((err) => {
          setisLoading(true);
          setError({ password: "La contraseña no es correcta." });
        });
    }
  };
  return (
    <View styles={styles.View}>
      <Input
        placeholder="Correo electronico"
        defaultValue={email || ""}
        containerStyle={styles.input}
        rightIcon={{ type: "material-community", name: "at", color: "#c2c2c2" }}
        onChange={(e) => onchange(e, "email")}
        errorMessage={error.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        passwod={true}
        secureTextEntry={!showPassword}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setshowPassword(!showPassword),
        }}
        onchange={(e) => {
          onChange(e, "password");
        }}
        errorMessage={error.passwords}
      />
      <Button
        title="Cambiar email"
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        onPress={onSubmit}
        loading={isLoading}
      />
    </View>
  );
}
function defaultValue() {
  return { email: "", password: "" };
}
function defaultErrorValue() {
  return { email: "", password: "" };
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
