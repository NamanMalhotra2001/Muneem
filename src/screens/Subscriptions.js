import React, { useState } from "react";
import { Box, Text } from "@react-native-material/core";
import { TextInput, Card, Button, Title, Paragraph } from "react-native-paper";
import { GlobalStyles } from "../constants/styles";
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
//@ts-ignore
// import {
//   Card,
//   CardTitle,
//   CardAction,
//   CardButton,
//   CardImage,
// } from "react-native-material-cards";
import Modal from "react-native-modal";
// import { LogBox } from "react-native";

// LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
const Subscriptions = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [modalData, setModalData] = useState([]);
  const [text, onChangeText] = React.useState("Useless Text");
  const [subData, setSubData] = useState([
    {
      name: "Netflix",
      amount: 800,
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
  ]);
  const data = [
    {
      name: "Netflix",
      amount: 800,
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
                  backgroundColor: GlobalStyles.colors.accent,
                  margin: 10,
                }}
                key={sub.name}
              >
                <Card.Cover source={{ uri: sub.logo }} />
                <Card.Title titleStyle={{ fontSize: 27 }} title={sub.name} />
                <Card.Content
                  style={{ backgroundColor: GlobalStyles.colors.accent }}
                >
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

        <Modal isVisible={isModalVisible}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Box style={styles.paperShadow}>
              <Text
                style={{
                  textAlign: "center",
                  margin: 20,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {modalData.name}
              </Text>
              <TextInput
                label="Amount"
                onChangeText={onChangeText}
                value={text}
                mode="outlined"
                keyboardType="numeric"
              />
            </Box>

            {/* <Button title="Hide modal" onPress={toggleModal} /> */}
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};
export default Subscriptions;

const styles = StyleSheet.create({
  marginUpDown: {
    marginTop: 20,
    marginBottom: 20,
  },
  btn: {
    color: "white",
    backgroundColor: "green",
  },
  title: {
    marginLeft: 20,
    marginTop: 15,
  },
  header: {
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    borderColor: "rgb(50,50,50)",
    borderBottomWidth: 2,
  },
  paperShadow: {
    overflow: "hidden",
    height: 200,
    boxShadow: "grey 2px 2px 10px",
    backgroundColor: GlobalStyles.colors.lightAccent,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    margin: 20,
    width: "90%",
  },
});
