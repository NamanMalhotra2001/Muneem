import { useContext, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { styles } from "react-native-element-dropdown/src/components/TextInput/styles";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import AllExpensesHeader from "../components/AllExpensesPage/AllExpensesHeader";
import IconButton from "../components/UI/IconButton";
import { NativeBaseProvider, ScrollView } from "native-base";
import Budget from "./Budget";
import { GlobalStyles } from "../constants/styles";

const AllExpenses = ({route}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const {currentPage} = route;
  const expensesCtx = useContext(ExpensesContext);
  const scrollViewRef = useRef(null);
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const [currentExpenses,setCurrentExpenses] = useState([]);

  useEffect(() =>{
    applyFilterForMonth(new Date().getMonth());
    changeSubPage(currentPage ? -width : width);
    console.log(currentPage);
  },[]);

  const applyFilterForMonth = (month) =>
  {
    console.log(month);
    setCurrentExpenses((old) => expensesCtx.expenses.filter((expense) => expense.date.getMonth() === month));
  };

  const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    var { x } = event.nativeEvent.contentOffset;
    x = parseInt(x) + 1;
    const indexOfNextScreen = Math.floor(x / width);
    console.log(`${x}/${width}`);
    console.log(indexOfNextScreen);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };
  const changeSubPage = (scrollPoss) => {
    console.log(scrollPoss);
    scrollViewRef.current?.scrollTo({ x: scrollPoss, animated: true });
  }
  return (
    <NativeBaseProvider>
      <AllExpensesHeader applyFilterForMonth={applyFilterForMonth}> </AllExpensesHeader>
      <View style={_styles.subTabs}>
        <Pressable onPress={() => (changeSubPage(-width))} style={_styles.subTab}>
          <Text style={_styles.tabText}>Transactions</Text>
          {sliderState.currentPage === 0 ? <View style={_styles.underline} ></View> : <></>}

        </Pressable >
        <Pressable onPress={() => (changeSubPage(width))} style={_styles.subTab}>
          <Text style={_styles.tabText}>Categories</Text>
          {sliderState.currentPage === 1 ? <View style={_styles.underline} ></View> : <></>}
        </Pressable >
      </View>
      <ScrollView
        style={{ height: '100%',backgroundColor : GlobalStyles.colors.lightAccent }}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={setSliderPage}
        ref={scrollViewRef}
      >
        <ScrollView>
          <View style={{ flex: 1, width }}>
            <ExpensesOutput
              expenses={currentExpenses}
              expensesPeriod={'This month'}
              fallbackText={'No spends this month! 😇'}
              button={false}
              home={false}
            />
          </View>
        </ScrollView>
        <ScrollView   >

          <Budget></Budget>

        </ScrollView>
      </ScrollView>
    </NativeBaseProvider>

  );
};
const _styles = StyleSheet.create({
  subTabs: {
    flexDirection: 'row',
  },
  subTab: {
    width: '50%',
    padding: 10,
    justifyContent: 'center',

    backgroundColor: GlobalStyles.colors.primary,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  underline: {
    position: 'absolute',
    width: '110%',
    height: 4,
    backgroundColor: 'white',
    bottom: 0,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 17,
  },
  paginationWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#0898A0',
    marginLeft: 10,
  },
});
export default AllExpenses;
