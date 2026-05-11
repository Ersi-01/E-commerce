import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Mail, Phone, MapPin, Heart } from "lucide-react-native";
import S, { Colors, Spacing, Radius, Typography } from "@/app/styles/global";

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />

      {/* Brand block */}
      <View style={styles.brand}>
        <View style={styles.brandIcon}>
          <Text style={styles.brandIconText}>S</Text>
        </View>
        <View>
          <Text style={styles.brandName}>ShopApp</Text>
          <Text style={styles.brandTagline}>Modern shopping experience</Text>
        </View>
      </View>

      {/* Links row */}
      <View style={styles.linksRow}>
        <View style={styles.linkCol}>
          <Text style={styles.colTitle}>Explore</Text>
          {["About Us", "All Products", "Track Order"].map((l) => (
            <TouchableOpacity key={l} activeOpacity={0.7}>
              <Text style={styles.linkText}>{l}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.linkCol}>
          <Text style={styles.colTitle}>Support</Text>
          <TouchableOpacity activeOpacity={0.7} style={styles.contactRow}>
            <Mail size={13} color={Colors.accent} />
            <Text style={styles.linkText}>support@shopapp.com</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.contactRow}>
            <Phone size={13} color={Colors.accent} />
            <Text style={styles.linkText}>+1 (555) 123-4567</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.contactRow}>
            <MapPin size={13} color={Colors.accent} />
            <Text style={styles.linkText}>123 Store St, City</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.copyright}>© 2026 ShopApp. All rights reserved.</Text>
        <View style={styles.legal}>
          {["Terms", "Privacy", "Cookies"].map((item, i) => (
            <React.Fragment key={item}>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.legalLink}>{item}</Text>
              </TouchableOpacity>
              {i < 2 && <Text style={styles.dot}>·</Text>}
            </React.Fragment>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xxxl,
    paddingTop: Spacing.xl,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: Spacing.xxl,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  brandIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  brandIconText: {
    color: "#fff",
    fontSize: Typography.lg,
    fontWeight: Typography.extrabold,
  },
  brandName: {
    color: Colors.textPrimary,
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    letterSpacing: -0.3,
  },
  brandTagline: {
    color: Colors.textMuted,
    fontSize: Typography.xs,
    marginTop: 2,
  },
  linksRow: {
    flexDirection: "row",
    gap: Spacing.xxl,
    marginBottom: Spacing.xxl,
  },
  linkCol: {
    flex: 1,
    gap: Spacing.sm,
  },
  colTitle: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.textMuted,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: Spacing.xs,
  },
  linkText: {
    color: Colors.textSecondary,
    fontSize: Typography.sm,
    lineHeight: 20,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs + 2,
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.lg,
    gap: Spacing.sm,
  },
  copyright: {
    color: Colors.textMuted,
    fontSize: Typography.xs,
    textAlign: "center",
  },
  legal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm,
  },
  legalLink: {
    color: Colors.textMuted,
    fontSize: Typography.xs,
  },
  dot: {
    color: Colors.border,
    fontSize: Typography.sm,
  },
});
