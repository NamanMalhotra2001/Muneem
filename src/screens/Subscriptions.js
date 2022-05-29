import React, { useState } from "react";
import { Box, Text } from "@react-native-material/core";
import { TextInput, Card, Button, Title } from "react-native-paper";
import { GlobalStyles } from "../constants/styles";
import { View, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";

import { Dropdown } from "react-native-element-dropdown";
const Subscriptions = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [subValue, setSubValue] = useState("Subscription Service");
  const [subTime, setSubTime] = useState("Subscription Duration");
  const [subLogo, setSubLogo] = useState("Logo");
  const [isFocus, setIsFocus] = useState(false);

  const [modalData, setModalData] = useState([]);
  const [subAmount, setSubAmount] = React.useState("1000");
  const [subData, setSubData] = useState([
    {
      id: 1,
      name: "Netflix",
      amount: 800,
      duration: "Monthly",
      logo: "https://i.ibb.co/yXb8G4L/Netflix-Logo-Black.jpg",
    },
    {
      id: 2,
      name: "Amazon Prime",
      amount: 1400,
      duration: "Yearly",
      logo: "https://i.ibb.co/X51mSDQ/image.png",
    },
    {
      id: 3,
      name: "Disney+Hotstar",
      amount: 1200,
      duration: "Yearly",
      logo: "https://i.ibb.co/HGrFhrd/image.png",
    },
  ]);
  const duration = [
    {
      time: "Monthly",
    },
    {
      time: "Yearly",
    },
  ];
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
        <Button
          labelStyle={{ fontSize: 22 }}
          uppercase={false}
          style={{
            backgroundColor: GlobalStyles.colors.accent,
            margin: 10,
          }}
          onPress={toggleModal}
        >
          Add Subscription
        </Button>
        {subData.length > 0 ? (
          subData.map((sub, index) => {
            return (
              <Card
                style={{
                  backgroundColor: GlobalStyles.colors.accent,
                  margin: 10,
                }}
                key={sub.id}
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
              <View style={styles.container}>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  maxHeight={300}
                  labelField="name"
                  valueField="amount"
                  placeholder={subValue}
                  value={subValue}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setSubValue(item.name);
                    setSubLogo(item.logo);
                  }}
                />
              </View>
              <View style={styles.container}>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={duration}
                  maxHeight={300}
                  labelField="time"
                  valueField="time"
                  placeholder={subTime}
                  value={subTime}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setSubTime(item.time);
                    console.log(item);
                  }}
                />
              </View>

              <TextInput
                label="Amount"
                style={{
                  backgroundColor: GlobalStyles.colors.accent,
                  margin: 15,
                }}
                onChangeText={setSubAmount}
                value={subAmount}
                mode="outlined"
                keyboardType="numeric"
              />
              <Button
                labelStyle={{ fontSize: 17 }}
                style={{
                  backgroundColor: GlobalStyles.colors.accent,
                  margin: 15,
                }}
                onPress={() => {
                  console.log(subData);
                  console.log(subTime, subValue, subLogo, subAmount),
                    setSubData([
                      ...subData,
                      {
                        id: Math.random() * (1000 - 1),
                        name: subValue,
                        amount: subAmount,
                        duration: subTime,
                        logo: subLogo,
                      },
                    ]);
                  toggleModal();
                }}
              >
                Add
              </Button>
              <Button
                labelStyle={{ fontSize: 17 }}
                style={{
                  backgroundColor: GlobalStyles.colors.accent,
                  margin: 15,
                }}
                onPress={toggleModal}
              >
                Close
              </Button>
            </Box>
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
    height: 400,
    boxShadow: "grey 2px 2px 10px",
    backgroundColor: GlobalStyles.colors.lightAccent,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    margin: 20,
    width: "90%",
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    backgroundColor: GlobalStyles.colors.accent,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
