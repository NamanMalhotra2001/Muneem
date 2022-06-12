import React, { useEffect, useState } from "react";
import { Card, Button, Title } from "react-native-paper";
import { GlobalStyles } from "../constants/styles";
import { View, StyleSheet, ScrollView, FlatList, Text, Dimensions } from "react-native";
import SubscriptionItem from "../components/SubscriptionPage/SubscriptionItem";

const Subscriptions = () => {
  const {width,height} = Dimensions.get('window');
  const [subData, setSubData] = useState([
    {
      id: 1,
      name: "Netflix",
      amount: 800,
      date: "06/01/22",
      duration: "Monthly",
      logo: "https://i.ibb.co/yXb8G4L/Netflix-Logo-Black.jpg",
    },
    {
      id: 2,
      name: "Amazon Prime",
      amount: 1400,
      date: "06/01/22",
      duration: "Yearly",
      logo: "https://i.ibb.co/X51mSDQ/image.png",
    },
    {
      id: 3,
      name: "Disney+Hotstar",
      amount: 1200,
      date: "06/01/22",
      duration: "Yearly",
      logo: "https://i.ibb.co/HGrFhrd/image.png",
    },
  ]);

  function renderSubscriptionItem(subData) {
    return <SubscriptionItem {...subData.item}></SubscriptionItem>
  }
  const data = [
    {
      name: "Netflix",
      amount: 800,
      date: "06/01/22",
      duration: "Monthly",
      logo: "https://i.ibb.co/yXb8G4L/Netflix-Logo-Black.jpg",
    },
    {
      name: "Amazon Prime",
      amount: 1400,
      duration: "Yearly",
      logo: "https://i.ibb.co/X51mSDQ/image.png",
    },
    {
      name: "Disney+Hotstar",
      amount: 1200,
      duration: "Yearly",
      logo: "https://i.ibb.co/HGrFhrd/image.png",
    },
    {
      name: "Zee5",
      amount: 1000,
      duration: "Yearly",
      logo: "https://i.ibb.co/pX9kLnB/Zee5-logo.jpg",
    },
    {
      name: "Youtube Premium",
      amount: 120,
      duration: "Monthly",
      logo: "https://i.ibb.co/DKHMmSf/image.png",
    },
  ];

  return (
    <View style={{ backgroundColor: GlobalStyles.colors.lightAccent,height : '100%' }}>
      <FlatList
        data={subData}
        renderItem={renderSubscriptionItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default Subscriptions;
