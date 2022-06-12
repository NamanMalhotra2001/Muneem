import { Box } from "@react-native-material/core";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { GlobalStyles } from "../constants/styles";
import { PieChart } from "react-native-chart-kit";
import { TextInput, Card, Button, Title } from "react-native-paper";
import Modal from "react-native-modal";
import { exp } from "react-native-reanimated";
import { fetchAllBudget, updateBudget } from "../util/http";

const Budget = ({ expenses }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [reRender,setReRender] = useState(false);
  const [editBudgetForm, setEditBudgetForm] = useState({
    name: "",
    amount: "",
  });
  const [budgetCategories, setBudgetAmount] = useState({});
  const [pos, setPos] = useState(0);
  const images = [
    {
      name: "health",
      logo: require('../../assets/categories/health.png')
    },
    {
      name: "food",
      logo: require('../../assets/categories/food.png')
    },
    {
      name: "shopping",
      logo: require('../../assets/categories/shopping.png')
    },
    {
      name: "groceries",
      logo: require('../../assets/categories/groceries.png')
    },
    {
      name: "bills",
      logo: require('../../assets/categories/bills.png')
    },
    {
      name: "entertainment",
      logo: require('../../assets/categories/entertainment.png')
    },
    {
      name: "others",
      logo: require('../../assets/categories/others.png')
    },
    {
      name: "travel",
      logo: require('../../assets/categories/travel.png')
    },
    {
      name: "transfer",
      logo: require('../../assets/categories/transfer.png')
    },
  ]
  const [budget, setBudget] = useState([
    //   {
    //     name: "Housing",
    //     amount: 20000,
    //     utilized: 15000,
    //     logo: "https://i.ibb.co/37P8pzt/image.png",
    //   },
    //   {
    //     name: "Food",
    //     amount: 8000,
    //     utilized: 5000,
    //     logo: "https://i.ibb.co/kJ4ZYLw/image.png",
    //   },
    //   {
    //     name: "Utility",
    //     amount: 5000,
    //     utilized: 4000,
    //     logo: "https://i.ibb.co/Lk0yH9f/homeutilities01.png",
    //   },
    //   {
    //     name: "Savings",
    //     amount: 15000,
    //     utilized: 11000,
    //     logo: "https://i.ibb.co/p4Wq554/image.png",
    //   },
    //   {
    //     name: "Personal",
    //     amount: 10000,
    //     utilized: 7000,
    //     logo: "https://i.ibb.co/kMp7zbs/i01-istockphoto-487764258-612x612.jpg",
    //   },
  ]);
  useEffect(() => {
    fetchAllBudget().then((res) => {
      //console.log('budget',res);
      setBudgetAmount(() => res);
      const categories = getCategoriesArray(expenses);
      setBudget((old) => {
        return [
          ...categories,
        ];
      });

    });

  }, [expenses,reRender]);
  const getBudgetForThisCategory = (category) => {
    //console.log('budgetCategories', budgetCategories);
    return budgetCategories[category] !== undefined ? budgetCategories[category].budget : 0;
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const getCategoriesArray = (expenses) => {
    const categories = [];
    expenses.map((expense) => {
      if (!categories.find((category) => category.name === expense.category)) {
        categories.push({
          name: expense.category,
          amount: expense.amount,
          budget: getBudgetForThisCategory(expense.category),
        });
      }
      else {
        categories.forEach((category) => {
          if (category.name === expense.category) {
            category.amount = expense.amount + category.amount;
          }
        }
        )
      }
    });
    //console.log(categories);
    categories.forEach((category) => {
      var temp = images.find((image) => image.name === category.name);
      if (temp) {
        category.logo = temp.logo;
      }
    })
    return categories;
  };
  return (
    <View style={{ backgroundColor: GlobalStyles.colors.lightAccent }}>
      <ScrollView>
        {/* <PieChart
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
        /> */}
        <View style={styles.cardContainer}>
          {budget.length > 0 ? budget.map((bud, index) => {
            //console.log("test", bud);
            return (
              <Card
                style={{
                  margin: 10,
                  width: 170,
                  height: 300,

                }}
                key={bud.name}
              >
                <Card.Cover resizeMode="contain" style={{padding : 15,  height: '45%',elevation : 2}} source={bud.logo} />
                <Card.Title titleStyle={{ fontSize: 15 }} title={capitalizeFirstLetter(bud.name)} />
                <Card.Content style={{}} >
                  <Title style={{ fontSize: 15, margin: 0, padding: 0 }}>Rs.{getBudgetForThisCategory(bud.name).toFixed(2)} Budget</Title>
                  <Title style={{ fontSize: 15 }}>Rs.{bud.amount.toFixed(1)} Utilized </Title>
                </Card.Content>
                <Card.Actions>
                  <Button
                    style={{
                    }}
                    onPress={() => {
                      //setPos(index);
                      setEditBudgetForm((old) => ({ name: bud.name, amount: getBudgetForThisCategory(bud.name) }));
                      toggleModal();
                    }}
                  >
                    Change Budget
                  </Button>
                </Card.Actions>
              </Card>
            )
          }) : <></>}
        </View>

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
              onChangeText={(value) => (setEditBudgetForm((old) => ({ ...old, amount: value })))}
              value={String(editBudgetForm.amount)}
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
                //console.log('edit', editBudgetForm);
                updateBudget(editBudgetForm.name, { budget: +(+editBudgetForm.amount).toFixed(2) });
                setReRender((old) => !old);
                //console.log();
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
  cardContainer: {
    width: Dimensions.get('window').width,
    flex: 1, flexDirection: 'row', flexWrap: 'wrap'
  },
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
