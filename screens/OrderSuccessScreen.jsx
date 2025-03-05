import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderSuccessScreen = ({ route, navigation }) => {
  const { orderNumber, cart } = route.params;

  useEffect(() => {
    saveOrder();
  }, []);

  const saveOrder = async () => {
    try {
      const storedOrders = await AsyncStorage.getItem("orderList");
      const existingOrders = storedOrders ? JSON.parse(storedOrders) : [];

      const totalPrice = Object.values(cart).reduce(
        (acc, item) => acc + parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity,
        0
      );

      const newOrder = {
        orderNumber,
        date: new Date().toLocaleString(),
        cart: Object.values(cart),
        totalPrice,
      };

      const updatedOrders = [newOrder, ...existingOrders]; // Add new order at the top
      await AsyncStorage.setItem("orderList", JSON.stringify(updatedOrders));
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>
        Order #{orderNumber} Placed Successfully!
      </Text>

      {/* 🔥 FIXED: Corrected Navigation Name */}
      <TouchableOpacity onPress={() => navigation.navigate("OrderListScreen")} style={styles.button}>
        <Text style={styles.buttonText}>View Order List</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")} style={styles.button}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F2F2F2" },
  successText: { fontSize: 20, fontWeight: "bold", color: "Black", marginBottom: 20 },
  button: { backgroundColor: "#FA4A0C", padding: 15, borderRadius: 10, marginTop: 10, width: 200, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default OrderSuccessScreen;
