import React, { useState } from "react";
import { Box, Text } from "@react-native-material/core";
import { TextInput } from "react-native-paper";
import { View, StyleSheet, ScrollView, StatusBar, Button } from "react-native";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-material-cards";
import Modal from "react-native";

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
    <View>
      <ScrollView>
        <Card>
          <CardImage
            source={{
              uri: subData[0].logo,
            }}
          />
          <CardTitle
            title={
              <View>
                <Text style={{ fontSize: 25 }}>
                  {subData[0].name}
                  {"\n"}
                </Text>
                <Text style={{ fontSize: 20 }}>
                  Rs.{subData[0].amount}/{subData[0].duration}
                </Text>
              </View>
            }
          />
          <CardAction separator={true} inColumn={false}>
            <CardButton
              title="Edit"
              color="blue"
              onPress={() => {
                toggleModal();
                setModalData(subData[0]);
                console.log(subData);
              }}
            />
            <CardButton
              title="Delete"
              color="blue"
              onPress={() => {
                var arr = [...subData];
                arr.splice(0, 1);
                setSubData(arr);
                console.log(arr, subData);
              }}
            />
          </CardAction>
        </Card>
        <Card>
          <CardImage
            source={{
              uri: subData[1].logo,
            }}
          />
          <CardTitle
            title={
              <View>
                <Text style={{ fontSize: 25 }}>
                  {subData[1].name}
                  {"\n"}
                </Text>
                <Text style={{ fontSize: 20 }}>
                  Rs.{subData[1].amount}/{subData[1].duration}
                </Text>
              </View>
            }
          />
          <CardAction separator={true} inColumn={false}>
            <CardButton onPress={() => {}} title="Edit" color="blue" />
          </CardAction>
        </Card>
        <Card>
          <CardImage
            source={{
              uri: subData[2].logo,
            }}
          />
          <CardTitle
            title={
              <View>
                <Text style={{ fontSize: 25 }}>
                  {subData[2].name}
                  {"\n"}
                </Text>
                <Text style={{ fontSize: 20 }}>
                  Rs.{subData[2].amount}/{subData[2].duration}
                </Text>
              </View>
            }
          />
          <CardAction separator={true} inColumn={false}>
            <CardButton onPress={() => {}} title="Edit" color="blue" />
          </CardAction>
        </Card>
        <Modal isVisible={isModalVisible}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Box style={styles.paperShadow}>
              <Text>{modalData.name}</Text>
              <TextInput
                label="Amount"
                onChangeText={onChangeText}
                value={text}
                mode="outlined"
                keyboardType="numeric"
              />
            </Box>

            <Button title="Hide modal" onPress={toggleModal} />
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
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    margin: 20,
    width: "90%",
  },
});
