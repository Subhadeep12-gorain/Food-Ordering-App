import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderListScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const storedOrders = await AsyncStorage.getItem("orderList");
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  const clearOrders = async () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to clear all orders?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Clear",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("orderList");
              setOrders([]); // Clear state
            } catch (error) {
              console.error("Error clearing orders:", error);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order List</Text>

      {orders.length === 0 ? (
        <Text style={styles.emptyMessage}>No orders have been placed yet.</Text>
      ) : (
        <>
          <FlatList
            data={orders}
            keyExtractor={(item) => item.orderNumber.toString()}
            renderItem={({ item }) => (
              <View style={styles.orderCard}>
                <Text style={styles.orderNumber}>Order #: {item.orderNumber}</Text>
                <Text style={styles.date}>Date: {item.date}</Text>

                {item.cart.map((dish) => (
                  <View key={dish.id} style={styles.dishItem}>
                    <Text style={styles.dishName}>{dish.name} x {dish.quantity}</Text>
                    <Text style={styles.dishPrice}>₦{(parseFloat(dish.price.replace(/[^0-9.]/g, "")) * dish.quantity).toFixed(2)}</Text>
                  </View>
                ))}

                <Text style={styles.totalPrice}>Total: ₦{item.totalPrice.toFixed(2)}</Text>
              </View>
            )}
          />

          {/* Buttons: Clear Orders & Home Side-by-Side */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.Home_clearButton} onPress={clearOrders}>
              <Text style={styles.clearButtonText}>Clear Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Home_clearButton} onPress={() => navigation.navigate("HomeScreen")}>
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    padding: 15,
    backgroundColor: "#F2F2F2"
  },
  header:
  {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    paddingTop: 30
  },
  emptyMessage:
  {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
    marginTop: 50
  },
  orderCard:
  {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  orderNumber:
  {
    fontSize: 16,
    fontWeight: "bold"
  },
  date:
  {
    fontSize: 14,
    color: "gray",
    marginBottom: 5
  },
  dishItem:
  {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2
  },
  dishName:
  {
    fontSize: 14,
    fontWeight: "bold"
  },
  dishPrice:
  {
    fontSize: 14,
    color: "green"
  },
  totalPrice:
  {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  Home_clearButton:
  {
    flex: 1,
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  clearButtonText:
  {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default OrderListScreen;
