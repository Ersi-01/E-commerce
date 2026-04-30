import React, { useState } from 'react';
import products from "../data/products";
import { 
  ScrollView, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  View 
} from 'react-native';

const Filter = ({ onCategoryChange }) => {
  // Listat e kategorive bazuar në produktet tuaja
const categories = ["All", ...new Set(products.map(p => p.category))];
  const [active, setActive] = useState("Të gjitha");

  const handlePress = (category) => {
    setActive(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.container}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => handlePress(cat)}
            activeOpacity={0.7}
            style={[
              styles.filterTab,
              active === cat && styles.activeTab
            ]}
          >
            <Text style={[
              styles.filterText,
              active === cat && styles.activeText
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 10,
    alignItems: 'center',
    height: 50,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#000', // Stili Streetwear (i zi)
    borderColor: '#000',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeText: {
    color: '#FFF',
  },
});

export default Filter;