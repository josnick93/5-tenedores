import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Card, Image, Icon, Rating } from "react-native-elements";

export default function ListTopRestaurants(props) {
  const { restaurants, navigation } = props;
  return (
    <FlatList
      data={restaurants}
      renderItem={(restaurant) => (
        <Restaurant restaurant={restaurant} navigation={navigation} />
      )}
      keyExtractor={(item, index) => index.toString()}
    ></FlatList>
  );
}

function Restaurant(props) {
  const { restaurant, navigation } = props;
  const { id, name, raiting, images, description } = restaurant.item;
  const [iconColor, setIconColor] = useState("#000");

  useEffect(() => {
    if (restaurant.index === 0) {
      setIconColor("#efb819");
    } else if (restaurant.index === 1) {
      setIconColor("#e3e4e5");
    } else if (restaurant.index === 2) {
      setIconColor("#cd7f32");
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("restaurants", {
          screen: "restaurant",
          params: { id },
        })
      }
    >
      <Card containerStyle={styles.containerCard}>
        <Icon
          type="material-community"
          name="chess-queen"
          size={40}
          color={iconColor}
          containerStyle={styles.containerIcon}
        />
        <Image
          style={styles.restaurantImage}
          resizeMode="cover"
          source={
            images[0] ? images[0] : require("../../../assets/img/no-image.png")
          }
        />
        <View style={styles.titleRaiting}>
          <Text stlye={styles.title}>{name}</Text>
          <Rating
            imageSize={20}
            startingValue={raiting}
            readonly
            style={styles.raiting}
          />
        </View>
        <Text style={styles.description}>{description}</Text>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    marginBottom: 30,
    borderWidth: 0,
  },
  containerIcon: {
    position: "absolute",
    top: -30,
    left: -30,
    zIndex: 1,
  },
  restaurantImage: {
    width: "100%",
    height: 200,
  },
  titleRaiting: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  raiting: {},
  description: {
    color: "grey",
    marginTop: 0,
    textAlign: "justify",
  },
});
