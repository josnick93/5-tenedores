import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";

import Loading from "../../components/Loading";
import InfoUser from "../../components/Account/InfoUser";
import AccountOptions from "../../components/Account/AccountOptions";

export default function UserLogged() {
  const [userInfo, setUserInfo] = useState(null);
  const toastRef = useRef();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [realoadUserInfo, setRealoadUserInfo] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
    })();
    setRealoadUserInfo(false);
  }, [realoadUserInfo]);

  return (
    <View style={styles.viewUserInfo}>
      {userInfo && (
        <InfoUser
          setLoading={setLoading}
          setLoadingText={setLoadingText}
          toastRef={toastRef}
          userInfo={userInfo}
        />
      )}
      <AccountOptions
        userInfo={userInfo}
        toastRef={toastRef}
        setReloadUserInfo={setRealoadUserInfo}
      />
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSession}
        onPress={() => firebase.auth().signOut()}
        titleStyle={styles.btnCloseSessionText}
      ></Button>
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading text={loadingText} isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnCloseSessionText: {
    color: "#00a680",
  },
});
