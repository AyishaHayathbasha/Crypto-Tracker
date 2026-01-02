import React from "react";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import { View, StyleSheet, Text } from "react-native";

export default function CoinChart({ sparkline }) {
  if (!sparkline || sparkline.length < 2) return <Text>No chart data</Text>;

  const data = sparkline.map((y, index) => ({ x: index, y }));

  return (
    <View style={styles.container}>
      <VictoryChart theme={VictoryTheme.material}>
        {/* X-axis */}
        <VictoryAxis
          style={{
            axis: { stroke: "#888" },
            tickLabels: { fill: "#ffffff", fontSize: 12 },
            grid: { stroke: "#888", strokeOpacity: 0.5 }, // reduced opacity
          }}
        />

        {/* Y-axis */}
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: "#888" },
            tickLabels: { fill: "#ffffff", fontSize: 12 },
            grid: { stroke: "#888", strokeOpacity: 0.5 }, // reduced opacity
          }}
        />

        {/* Line chart */}
        <VictoryLine
          interpolation="natural"
          data={data}
          style={{ data: { stroke: "#00ffcc", strokeWidth: 2 } }}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#0f172a", borderRadius: 12, padding: 10 },
});
