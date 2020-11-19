import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import style from "./BalanceStyles.js";
import { ButtonGroup } from "react-native-elements";
import { LineChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";

const Balance = ({ navigation }) => {
  const {primary,secondary,text,dark,bg} = useSelector(store => store.color)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [data, setData] = useState({
    labels: ["Jun", "Jul", "Ago", "Sep", "Oct", "Nov"], //la data es lo que se va a mostrat en el grafico
    datasets: [
      {
        data: [900, 1000, 1500, 250, 799, 850],
      },
    ],
  });
  const buttons = ["Año", "Mes", "Semana"];

  //que hacer cuando se apreta cada boton
  useEffect(() => {
    if (selectedIndex == 0) {
      //cuando se apreta año
      setData({
        labels: ["Jun", "Jul", "Ago", "Sep", "Oct", "Nov"],
        datasets: [
          {
            data: [900, 1000, 1500, 250, 799, 850],
          },
        ],
      });
    }
    if (selectedIndex == 1) {
      //cuando se apreta mes
      setData({
        labels: ["1-7", "8-14", "15-21", "21-28"],
        datasets: [
          {
            data: [300, 900, 500, 250, 799, 850],
          },
        ],
      });
    }
    if (selectedIndex == 2) {
      //cuando se apreta semana
      setData({
        labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
        datasets: [
          {
            data: [800, 800, 800, 500, 500, 1000, 1000],
          },
        ],
      });
    }
  }, [selectedIndex]);

  const chartConfig = {
    //configuracion para el grafico
    backgroundGradientFrom: bg,
    backgroundGradientTo: bg,
    color: (opacity = 1) => `rgba(252, 112, 41, ${opacity})`,
    labelColor: (opacity = 1) => text,
  };
  const saldo = useSelector((store) => store.movementsReducer.saldo);
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return (
    <ScrollView style={{backgroundColor:bg}}>
      <View style={style.balance}>
        <Text style={style.tituloBalance}>Balance General</Text>
        <Text style={style.saldoBalance}>{`$ ${formatNumber(saldo)}`}</Text>
      </View>
      <View>
        <ButtonGroup
          onPress={setSelectedIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          buttonContainerStyle={{ backgroundColor: "#ba3f00" }}
          selectedButtonStyle={{ backgroundColor: "#FC7029" }}
          textStyle={{ color: "black", fontSize: 15 }}
          selectedTextStyle={{ color: "white" }}
          containerStyle={{ height: 50, borderRadius: 5, marginTop: 0 }}
        />
      </View>
      <View style={style.grafico}>
        {/* grafico */}
        <LineChart
          yAxisLabel="$"
          width={Dimensions.get("window").width}
          height={300}
          data={data}
          bezier
          chartConfig={chartConfig}
        ></LineChart>
      </View>
      <View style={style.contenedor}>
        <View style={{...style.ingresoCont,borderColor:dark ? secondary : primary}}>
          <Text style={{...style.letraButton,color:dark ? secondary : primary}}>Ingresos</Text>
          <Text style={style.ingreso}>+ $5000</Text>
        </View>
        <View style={{...style.ingresoCont,borderColor:dark ? secondary : primary}}>
          <Text style={{...style.letraButton,color:dark ? secondary : primary}}>Gastos</Text>
          <Text style={style.gasto}>- $3000</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Balance;
