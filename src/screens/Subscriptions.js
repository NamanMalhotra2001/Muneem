import React, { useState } from "react";
import { Card, Button, Title } from "react-native-paper";
import { GlobalStyles } from "../constants/styles";
import { View, StyleSheet, ScrollView } from "react-native";
const Subscriptions = () => {
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
    <View style={{ backgroundColor: GlobalStyles.colors.lightAccent }}>
      <ScrollView>
        {subData.length > 0 ? (
          subData.map((sub, index) => {
            return (
              <Card
                style={{
                  margin: 10,
                }}
                key={sub.id}
              >
                <Card.Cover source={{ uri: sub.logo }} />
                <Card.Title titleStyle={{ fontSize: 27 }} title={sub.name} />
                <Card.Content>
                  <Title>
                    Rs.{sub.amount}/{sub.duration}
                  </Title>
                </Card.Content>
                <Card.Actions>
                  <Button
                    onPress={() => {
                      var arr = [...subData];
                      arr.splice(index, 1);
                      setSubData(arr);
                      console.log(arr, subData);
                    }}
                  >
                    Remove Subscription
                  </Button>
                </Card.Actions>
              </Card>
            );
          })
        ) : (
          <Card
            style={{
              backgroundColor: GlobalStyles.colors.accent,
              margin: 10,
            }}
          >
            <Card.Title
              titleStyle={{ fontSize: 27 }}
              title="No Subscriptions"
            />
          </Card>
        )}
      </ScrollView>
    </View>
  );
};
export default Subscriptions;
