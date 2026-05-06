import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import S, { Colors, Spacing, Radius, Typography } from "@/app/styles/global";

const CATEGORIES = [
  "All", "Hoodies", "Pants", "T-Shirts", "Jackets",
  "Jeans", "Shorts", "Shirts", "Tops", "Sweaters", "Sweatshirts",
];

export type FilterOptions = {
  category: string;
  sortBy: "price_asc" | "price_desc" | null;
  inStockOnly: boolean;
};

const DEFAULT_FILTERS: FilterOptions = {
  category: "All",
  sortBy: null,
  inStockOnly: false,
};

type Props = {
  onFilterChange: (filters: FilterOptions) => void;
};

export default function Filter({ onFilterChange }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>(DEFAULT_FILTERS);

  const activeCount = [
    activeFilters.category !== "All",
    activeFilters.sortBy !== null,
    activeFilters.inStockOnly,
  ].filter(Boolean).length;

  const openModal = () => {
    setTempFilters(activeFilters);
    setModalVisible(true);
  };

  const applyFilters = () => {
    setActiveFilters(tempFilters);
    onFilterChange(tempFilters);
    setModalVisible(false);
  };

  const resetFilters = () => {
    setTempFilters(DEFAULT_FILTERS);
  };

  return (
    <>
      {/* Filter Button */}
      <TouchableOpacity style={[S.btnChip, { paddingHorizontal: 12, paddingVertical: 8 }]} onPress={openModal}>
        <Text style={S.btnChipText}>⚙ Filter</Text>
        {activeCount > 0 && (
          <View style={S.badge}>
            <Text style={S.badgeText}>{activeCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={S.overlay}>
          <View style={S.sheet}>

            {/* Header */}
            <View style={S.sheetHeader}>
              <Text style={S.sheetTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={S.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Category Section */}
            <Text style={S.sectionTitle}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: Spacing.lg }}>
              <View style={S.rowWrap}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[S.chip, tempFilters.category === cat && S.chipActive]}
                    onPress={() => setTempFilters((f: FilterOptions) => ({ ...f, category: cat }))}
                  >
                    <Text style={[S.chipText, tempFilters.category === cat && S.chipTextActive]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Sort Section */}
            <Text style={S.sectionTitle}>Sort by Price</Text>
            <View style={[S.rowWrap, { marginBottom: Spacing.lg }]}>
              {[
                { label: "Default", value: null },
                { label: "↑ Low to High", value: "price_asc" },
                { label: "↓ High to Low", value: "price_desc" },
              ].map((opt) => (
                <TouchableOpacity
                  key={String(opt.value)}
                  style={[S.chip, tempFilters.sortBy === opt.value && S.chipActive]}
                  onPress={() => setTempFilters((f: FilterOptions) => ({ ...f, sortBy: opt.value as FilterOptions["sortBy"] }))}
                >
                  <Text style={[S.chipText, tempFilters.sortBy === opt.value && S.chipTextActive]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Availability Section */}
            <Text style={S.sectionTitle}>Availability</Text>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: Spacing.md, paddingVertical: Spacing.sm, marginBottom: Spacing.lg }}
              onPress={() => setTempFilters((f: FilterOptions) => ({ ...f, inStockOnly: !f.inStockOnly }))}
            >
              <View style={[S.checkbox, tempFilters.inStockOnly && S.checkboxActive]}>
                {tempFilters.inStockOnly && (
                  <Text style={S.checkmark}>✓</Text>
                )}
              </View>
              <Text style={{ color: Colors.textSecondary, fontSize: Typography.base }}>In Stock Only</Text>
            </TouchableOpacity>

            {/* Footer - Buttons */}
            <View style={{ flexDirection: "row", gap: Spacing.md, paddingTop: Spacing.xl, marginTop: Spacing.sm, borderTopWidth: 1, borderColor: Colors.border }}>
              <TouchableOpacity style={[S.btnSecondary, { flex: 1 }]} onPress={resetFilters}>
                <Text style={S.btnSecondaryText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[S.btnPrimary, { flex: 2 }]} onPress={applyFilters}>
                <Text style={S.btnPrimaryText}>Apply</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </>
  );
}