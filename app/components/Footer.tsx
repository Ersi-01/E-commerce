import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Mail, Phone, MapPin } from "lucide-react-native";
import S, { Colors, Spacing, Radius, Typography } from "@/app/styles/global";

export default function Footer() {
  return (
    <View style={{ backgroundColor: Colors.bg, paddingTop: Spacing.xxxl, paddingBottom: Spacing.xl }}>
      
      {/* Top Section - Links & Info */}
      <View style={{ paddingHorizontal: Spacing.lg, marginBottom: Spacing.xxl }}>
        
        {/* Brand */}
        <Text style={[S.heading, { marginBottom: Spacing.lg }]}>ShopApp</Text>

        {/* Quick Links */}
        <View style={{ marginBottom: Spacing.xxl }}>
          <Text style={[S.label, { marginBottom: Spacing.md }]}>Quick Links</Text>
          <View style={{ gap: Spacing.sm }}>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={{ color: Colors.textSecondary, fontSize: Typography.base, marginVertical: Spacing.xs }}>
                About Us
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={{ color: Colors.textSecondary, fontSize: Typography.base, marginVertical: Spacing.xs }}>
                Shop All Products
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={{ color: Colors.textSecondary, fontSize: Typography.base, marginVertical: Spacing.xs }}>
                Track Your Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support */}
        <View style={{ marginBottom: Spacing.xxl }}>
          <Text style={[S.label, { marginBottom: Spacing.md }]}>Support</Text>
          <View style={{ gap: Spacing.sm }}>
            <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}>
              <Mail size={16} color={Colors.accent} />
              <Text style={{ color: Colors.textSecondary, fontSize: Typography.base }}>
                support@shopapp.com
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}>
              <Phone size={16} color={Colors.accent} />
              <Text style={{ color: Colors.textSecondary, fontSize: Typography.base }}>
                +1 (555) 123-4567
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}>
              <MapPin size={16} color={Colors.accent} />
              <Text style={{ color: Colors.textSecondary, fontSize: Typography.base }}>
                123 Store Street, City
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Divider */}
        <View style={{ height: 1, backgroundColor: Colors.border, marginBottom: Spacing.lg }} />

        {/* Legal Links */}
        <View style={{ marginBottom: Spacing.lg }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: Spacing.md }}>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={{ color: Colors.textMuted, fontSize: Typography.sm }}>
                Terms of Service
              </Text>
            </TouchableOpacity>
            <Text style={{ color: Colors.border }}>•</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={{ color: Colors.textMuted, fontSize: Typography.sm }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <Text style={{ color: Colors.border }}>•</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={{ color: Colors.textMuted, fontSize: Typography.sm }}>
                Cookie Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bottom Section - Copyright */}
      <View
        style={{
          paddingHorizontal: Spacing.lg,
          paddingTop: Spacing.lg,
          borderTopWidth: 1,
          borderColor: Colors.border,
          alignItems: "center",
        }}
      >
        <Text style={{ color: Colors.textMuted, fontSize: Typography.sm, marginBottom: Spacing.sm }}>
          © 2026 ShopApp. All rights reserved.
        </Text>
        <Text style={{ color: Colors.textDim, fontSize: Typography.xs }}>
          Made with ❤️ for better shopping
        </Text>
      </View>
    </View>
  );
}