import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem("cart");
      if (cartData) {
        const parsedCart = JSON.parse(cartData);
        setCart(parsedCart);
        calculateTotal(parsedCart);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const calculateTotal = (cartData) => {
    let total = Object.values(cartData).reduce((acc, item) => {
      return acc + parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity; // Convert price string to number
    }, 0);
    setTotalPrice(total);
  };

  const placeOrder = async () => {
    const orderNumber = Math.floor(100000 + Math.random() * 900000); // Generate a unique order number
    await AsyncStorage.removeItem("cart"); // Clear the cart after placing an order
    navigation.navigate("OrderSuccessScreen", { orderNumber, cart });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {Object.keys(cart).length === 0 ? (
        <Text style={styles.emptyCart}>Nothing in cart</Text>
      ) : (
        <>
          <FlatList
            data={Object.values(cart)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price} x {item.quantity}</Text>
                  <Text style={styles.itemTotal}>Total: ₦{(parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity).toFixed(2)}</Text>
                </View>
              </View>
            )}
          />
          <Text style={styles.totalPrice}>Total: ₦{totalPrice.toFixed(2)}</Text>

          <TouchableOpacity onPress={placeOrder} style={styles.orderButton}>
            <Text style={styles.orderButtonText}>Order Now</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#F2F2F2" },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 ,paddingTop:30},
  emptyCart: { textAlign: "center", fontSize: 18, color: "#888", marginTop: 50 },
  cartItem: { flexDirection: "row", backgroundColor: "#fff", padding: 10, borderRadius: 10, marginBottom: 10 },
  itemImage: { width: 80, height: 80, borderRadius: 10 },
  itemDetails: { marginLeft: 10, flex: 1 },
  itemName: { fontSize: 16, fontWeight: "bold" },
  itemPrice: { fontSize: 14, color: "green" },
  itemTotal: { fontSize: 14, fontWeight: "bold" },
  totalPrice: { fontSize: 20, fontWeight: "bold", textAlign: "right", marginVertical: 10 },
  orderButton: { backgroundColor: "#FA4A0C", padding: 15, borderRadius: 10, alignItems: "center", marginVertical: 10 },
  orderButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default CartScreen;
