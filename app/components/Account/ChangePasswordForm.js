import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { size } from "lodash";
import * as firebase from "firebase";
import { reauthenticate } from "../../utils/api";

export default function ChangePasswordForm(props) {
  const { setshowModal, toastRef } = props;
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setformData] = useState(defaulFormValue());
  const [errors, seterrors] = useState();
  const [isLoading, setisLoading] = useState(false);

  const onChange = (e, type) => {
    setformData({ ...formData, [type]: e.nativeEvent.text });
  };
  const onSubmit = async () => {
    let isSetError = true;
    let errorsTemp = {};
    seterrors({});
    if (
      !formData.password ||
      !formData.newPassword ||
      !formData.repeatNewPassword
    ) {
      errorsTemp = {
        password: !formData.password
          ? "La contraseña no puede estar vacia."
          : "",
        newPassword: !formData.newPassword
          ? "La constraseña no puede estar vacia"
          : "",
        repeatNewPassword: !formData.repeatNewPassword
          ? "La contraseña no puede estar vacia"
          : "",
      };
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      errorsTemp = {
        newPassword: "Las contraseñas no son iguales",
        repeatNewPassword: "Las contraseñas no son iguales",
      };
    } else if (size(formData.newPassword) < 6) {
      errorsTemp = {
        newPassword: "La contraseña tiene que ser mayor a 6 caracteres.",
        repeatNewPassword: "La contraseña tiene que ser mayor  a 6 caracteres.",
      };
    } else {
      setisLoading(true);
      await reauthenticate(formData.password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updatePassword(formData.newPassword)
            .then(() => {
              isSetError(false);
              setisLoading(false);
              setshowModal(false);
              firebase.auth().signOut();
            })
            .catch((err) => {
              errorsTemp = {
                other: "Error al actualizar la contraseña",
              };
              setisLoading(false);
            });
        })
        .catch((err) => {
          errorsTemp = {
            password: "La contraseña no es correcta",
          };
        });
    }

    if (isSetError) seterrors(errorsTemp);
    setisLoading(false);
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={!showPassword}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setshowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errors.password}
      />
      <Input
        placeholder="Nueva contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={!showPassword}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setshowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "newPassword")}
        errorMessage={errors.newPassword}
      />
      <Input
        placeholder="Repetir la nueva contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={!showPassword}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setshowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "repeatNewPassword")}
        errorMessage={errors.repeatNewPassword}
      />
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
      <Text>{errors.other}</Text>
    </View>
  );
}
function defaulFormValue() {
  return { password: "", newPassword: "", repeatNewPassword: "" };
}
const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
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
