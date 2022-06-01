import { Box } from "@react-native-material/core";
import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { GlobalStyles } from "../constants/styles";
import { PieChart } from "react-native-chart-kit";
import { TextInput, Card, Button, Title } from "react-native-paper";
import Modal from "react-native-modal";

const Budget = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [budgetAmount, setBudgetAmount] = useState("10000");
  const [pos, setPos] = useState(0);

  const [budget, setBudget] = useState([
    {
      name: "Housing",
      amount: 20000,
      utilized: 15000,
      logo: "https://i.ibb.co/37P8pzt/image.png",
    },
    {
      name: "Food",
      amount: 8000,
      utilized: 5000,
      logo: "https://i.ibb.co/kJ4ZYLw/image.png",
    },
    {
      name: "Utility",
      amount: 5000,
      utilized: 4000,
      logo: "https://i.ibb.co/Lk0yH9f/homeutilities01.png",
    },
    {
      name: "Savings",
      amount: 15000,
      utilized: 11000,
      logo: "https://i.ibb.co/p4Wq554/image.png",
    },
    {
      name: "Personal",
      amount: 10000,
      utilized: 7000,
      logo: "https://i.ibb.co/kMp7zbs/i01-istockphoto-487764258-612x612.jpg",
    },
  ]);

  const data = [
    {
      name: budget[0].name,
      amount: budget[0].amount,
      color: "#003f5c",
      legendFontColor: "#003f5c",
      legendFontSize: 17,
    },
    {
      name: budget[1].name,
      amount: budget[1].amount,
      color: "#ffa600",
      legendFontColor: "#003f5c",
      legendFontSize: 17,
    },
    {
      name: budget[2].name,
      amount: budget[2].amount,
      color: "#58508d",
      legendFontColor: "#58508d",
      legendFontSize: 17,
    },
    {
      name: budget[3].name,
      amount: budget[3].amount,
      color: "#bc5090",
      legendFontColor: "#bc5090",
      legendFontSize: 17,
    },
    {
      name: budget[4].name,
      amount: budget[4].amount,
      color: "#ff6361",
      legendFontColor: "#ff6361",
      legendFontSize: 17,
    },
  ];
  return (
    <View style={{ backgroundColor: GlobalStyles.colors.lightAccent }}>
      <ScrollView>
        <PieChart
          data={data}
          width={390}
          height={200}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 10,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          accessor={"amount"}
          backgroundColor={"transparent"}
          paddingLeft={"0"}
          center={[0, 0]}
          absolute
        />

        {budget.map((bud, index) => {
          return (
            <Card
              style={{
                margin: 10,
              }}
              key={bud.name}
            >
              <Card.Cover source={{ uri: bud.logo }} />
              <Card.Title titleStyle={{ fontSize: 27 }} title={bud.name} />
              <Card.Content>
                <Title>Rs.{bud.amount} Budget</Title>
                <Title>Rs.{bud.utilized} Utilized </Title>
              </Card.Content>
              <Card.Actions>
                <Button
                  onPress={() => {
                    setPos(index);
                    toggleModal();
                  }}
                >
                  Change Budget
                </Button>
              </Card.Actions>
            </Card>
          );
        })}
      </ScrollView>
      <Modal isVisible={isModalVisible}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Box style={styles.paperShadow}>
            <TextInput
              label="Amount"
              style={{
                backgroundColor: GlobalStyles.colors.accent,
                margin: 15,
              }}
              onChangeText={setBudgetAmount}
              value={budgetAmount}
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
                const temp = [...budget];
                temp[pos].amount = Number(budgetAmount);
                setBudget(temp);
                toggleModal();
              }}
            >
              Change Budget
            </Button>
            <Button
              labelStyle={{ fontSize: 17 }}
              style={{
                backgroundColor: GlobalStyles.colors.accent,
                margin: 15,
              }}
              onPress={() => {
                toggleModal();
              }}
            >
              Close
            </Button>
          </Box>
        </View>
      </Modal>
    </View>
  );
};
export default Budget;
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
    height: 240,
    boxShadow: "grey 2px 2px 10px",
    backgroundColor: GlobalStyles.colors.lightAccent,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    margin: 20,
    width: "90%",
  },
});
