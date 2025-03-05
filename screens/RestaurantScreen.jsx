import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RestaurantScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const [cart, setCart] = useState({});
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem("cart");
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const updateQuantity = (dishId, change) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[dishId] || 0) + change;
      return { ...prevQuantities, [dishId]: Math.max(newQuantity, 0) };
    });
  };

  const addToCart = async () => {
    const newCart = { ...cart };

    Object.keys(quantities).forEach((dishId) => {
      const quantity = quantities[dishId];
      if (quantity > 0) {
        const dish = restaurant.dishes.find((d) => d.id === dishId);
        newCart[dishId] = { ...dish, quantity };
      }
    });

    setCart(newCart);
    await AsyncStorage.setItem("cart", JSON.stringify(newCart));
    navigation.navigate("CartScreen");
  };

  // Sort dishes alphabetically
  const sortedDishes = [...restaurant.dishes].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{restaurant.name}</Text>

      <FlatList
        data={sortedDishes} // Using sorted dishes without grouping
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.dishCard}>
            <Image source={{ uri: item.image }} style={styles.dishImage} />
            <Text style={styles.dishName}>{item.name}</Text>
            <Text style={styles.dishPrice}>{item.price}</Text>

            <View style={styles.cartControls}>
              <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.cartButton}>
                <Text style={styles.cartButtonText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.cartQuantity}>{quantities[item.id] || 0}</Text>

              <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.cartButton}>
                <Text style={styles.cartButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Add to Cart Button (Always Visible) */}
      <TouchableOpacity onPress={addToCart} style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
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
    paddingTop:30
  },
  dishCard:
  {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  dishImage:
  {
    width: "100%",
    height: 150,
    borderRadius: 10
  },
  dishName:
  {
    fontSize: 16,
    fontWeight: "bold"
  },
  dishPrice:
  {
    color: "green",
    fontSize: 14
  },

  // Cart Controls
  cartControls:
  {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10
  },
  cartButton:
  {
    backgroundColor: "#FA4A0C",
    padding: 10,
    borderRadius: 5
  },
  cartButtonText:
  {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  cartQuantity:
  {
    fontSize: 16,
    fontWeight: "bold"
  },

  // Add to Cart Button (Always Visible)
  addToCartButton:
  {
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10
  },
  addToCartText:
  {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
});

export default RestaurantScreen;
