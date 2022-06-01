import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../constants/styles";
import Input from "../components/ManageExpense/Input";
import DropdownMenu from "react-native-dropdown-menu";
import Button from "../components/UI/Button";

const AddSubscription = ({ navigation }) => {
  const subNames = [
    ["Netflix", "Amazon Prime", "Disney+Hotstar", "Zee5", "Youtube Premium"],
  ];
  const duration = [["Monthly", "Yearly"]];
  const [output, setOutput] = useState({
    subName: "Netflix",
    duration: "Monthly",
    amount: "1000",
    date: "06/01/22",
  });
  const [inputs, setInputs] = useState({
    amount: {
      value: "",
      isValid: true,
    },
    date: {
      value: "",
      isValid: true,
    },
    name: {
      value: "",
      isValid: true,
    },
    duration: {
      value: "",
      isValid: true,
    },
  });
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
        date: { value: new Date().toLocaleDateString("en-GB"), isValid: true },
      };
    });
  }

  function submitHandler() {
    setOutput(() => {
      return {
        ...output,
        subName: inputs.name.value,
        duration: inputs.duration.value,
        date: inputs.date.value,
        amount: inputs.amount.value,
      };
    });
    navigation.goBack();
    console.log("New Subscription Data", output);
  }
  return (
    <View style={{ flex: 1, backgroundColor: GlobalStyles.colors.lightAccent }}>
      <View
        style={{
          height: 64,
          zIndex: 21,
          position: "relative",
          marginTop: "5%",
          marginHorizontal: "5%",
        }}
      >
        <DropdownMenu
          bgColor={"white"}
          handler={(selection, row) =>
            setInputs(() => {
              return {
                ...inputs,
                name: { value: subNames[0][row], isValid: true },
              };
            })
          }
          data={subNames}
        />
      </View>
      <View
        style={{
          height: 64,
          zIndex: 20,
          position: "relative",
          marginHorizontal: "5%",
        }}
      >
        <DropdownMenu
          bgColor={"white"}
          handler={(selection, row) =>
            setInputs(() => {
              return {
                ...inputs,
                duration: { value: duration[0][row], isValid: true },
              };
            })
          }
          data={duration}
        />
      </View>
      <View style={styles.container}>
        <Input
          label={inputs.amount !== "" && GlobalStyles.symbols.rupee}
          textInputConfig={{
            placeholder: "Enter subscription amount",
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          valid={inputs.amount.isValid}
        />
      </View>
      <View style={{ position: "absolute", bottom: 20, left: 0, right: 0 }}>
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.button}
            mode="flat"
            onPress={() => {
              navigation.goBack();
            }}
          >
            Cancel
          </Button>
          <Button style={styles.button} onPress={submitHandler}>
            {"Add"}
          </Button>
        </View>
      </View>
    </View>
  );
};
export default AddSubscription;

const styles = StyleSheet.create({
  invalid: {
    borderWidth: 0.5,
    borderColor: "red",
    backgroundColor: "#fff3f3",
  },
  errorContainer: {
    marginHorizontal: 20,
    backgroundColor: "#fff3f3",
    borderRadius: 10,
    borderColor: "red",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "16%",
  },
  container: {
    flex: 1,
  },
  datePickerButton: {
    marginHorizontal: 20,
    marginTop: 8,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.75,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteButton: {
    backgroundColor: "white",
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowOffset: { height: 1, width: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
});
