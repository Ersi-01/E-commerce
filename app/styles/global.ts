/**
 * Import tokens:   import { Colors, Spacing, Radius, Typography, Shadows } from "@/app/styles/global";
 * Import styles:   import S from "@/app/styles/global";

 *** ONLY FOR DEVELOPERS

 * Manual migration to global styles
   1. Import:
   import S from "@/app/styles/global";
   import { Colors, Spacing, Radius, Typography, Shadows } from "@/app/styles/global";
   2. Delete all `StyleSheet.create` styles.
   3. Replace all hardcoded values:
   colors → `Colors.*`
   spacing → `Spacing.*`
   radius → `Radius.*`
   fonts → `Typography.*`
   shadows → `Shadows.*`
   4. Use existing shared styles first:
   style={S.card}
   5. If needed, combine:
   style={[S.card, { marginTop: Spacing.lg }]}
   6. Do not change logic, only styling.
 */
import { StyleSheet } from "react-native";

const DarkColors = {
  bg:            "#0a0a0f",
  card:          "#13131a",
  input:         "#1a1a24",
  border:        "#2a2a3a",
  textPrimary:   "#ffffff",
  textSecondary: "#aaaaaa",
  textMuted:     "#666666",
  textDim:       "#888888",
  accent:        "#f0c060",
  accentDark:    "#0a0a0f",
  success:       "#4caf50",
  danger:        "#f44336",
  dangerBg:      "#ff444422",
  dangerBorder:  "#ff4444",
  blobGold:      "#f0c06022",
  blobBlue:      "#6060f022",
};

const LightColors = {
  bg:            "#f6f7fb",
  card:          "#ffffff",
  input:         "#f1f3f9",
  border:        "#e2e6f0",
  textPrimary:   "#0f172a",
  textSecondary: "#475569",
  textMuted:     "#94a3b8",
  textDim:       "#64748b",
  accent:        "#4f46e5",
  accentDark:    "#ffffff",
  success:       "#16a34a",
  danger:        "#dc2626",
  dangerBg:      "#dc262622",
  dangerBorder:  "#dc2626",
  blobGold:      "#4f46e522",
  blobBlue:      "#3b82f622",
};


export let Colors = DarkColors;


export function applyTheme(isDark: boolean) {
  Colors = isDark ? DarkColors : LightColors;
}

export const Spacing = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  24,
  xxxl: 32,
};

export const Radius = {
  sm:   8,
  md:   10,
  lg:   12,
  xl:   14,
  xxl:  20,
  xxxl: 24,
  full: 999,
};

export const Typography = {
  xs:        11,
  sm:        12,
  base:      14,
  md:        15,
  lg:        16,
  xl:        18,
  xxl:       20,
  xxxl:      22,
  h2:        24,
  h1:        30,
  regular:   "400" as const,
  medium:    "500" as const,
  semibold:  "600" as const,
  bold:      "700" as const,
  extrabold: "800" as const,
};

export const Shadows = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 10,
  },
  accent: {
    shadowColor: DarkColors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  logo: {
    shadowColor: DarkColors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
};

// StyleSheet.create — NDRYSHOHET ASGJË KËTU
const S = StyleSheet.create({
  screen:           { flex: 1, backgroundColor: DarkColors.bg, padding: Spacing.lg },
  screenNoPad:      { flex: 1, backgroundColor: DarkColors.bg },
  centered:         { flex: 1, alignItems: "center", justifyContent: "center" },
  heading:          { color: DarkColors.textPrimary, fontSize: Typography.xxxl, fontWeight: Typography.bold, marginBottom: Spacing.lg },
  subheading:       { color: DarkColors.textPrimary, fontSize: Typography.h2, fontWeight: Typography.bold, marginBottom: Spacing.sm },
  label:            { fontSize: Typography.xs, fontWeight: Typography.semibold, color: DarkColors.textDim, marginBottom: Spacing.sm, letterSpacing: 0.8, textTransform: "uppercase" },
  body:             { color: DarkColors.textSecondary, fontSize: Typography.base, lineHeight: 20 },
  caption:          { color: DarkColors.textMuted, fontSize: Typography.sm },
  price:            { color: DarkColors.accent, fontSize: Typography.md, fontWeight: Typography.bold },
  rating:           { color: DarkColors.textSecondary, fontSize: Typography.sm },
  inStock:          { color: DarkColors.success, fontSize: Typography.sm, fontWeight: Typography.semibold },
  outOfStock:       { color: DarkColors.danger, fontSize: Typography.sm, fontWeight: Typography.semibold },
  emptyText:        { color: DarkColors.textMuted, textAlign: "center", marginTop: 40, fontSize: Typography.lg },
  card:             { backgroundColor: DarkColors.card, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: DarkColors.border },
  cardElevated:     { backgroundColor: DarkColors.card, borderRadius: Radius.xxxl, padding: Spacing.xxl + 4, borderWidth: 1, borderColor: DarkColors.border, ...Shadows.card },
  rowBetween:       { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  rowWrap:          { flexDirection: "row", flexWrap: "wrap", gap: Spacing.sm },
  screenHeader:     { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: Spacing.sm },
  btnPrimary:       { backgroundColor: DarkColors.accent, borderRadius: Radius.xl, height: 54, alignItems: "center", justifyContent: "center", ...Shadows.accent },
  btnPrimaryText:   { color: DarkColors.accentDark, fontSize: Typography.lg, fontWeight: Typography.extrabold, letterSpacing: 0.5 },
  btnSecondary:     { borderRadius: Radius.xl, height: 50, borderWidth: 1, borderColor: DarkColors.border, alignItems: "center", justifyContent: "center" },
  btnSecondaryText: { color: DarkColors.textSecondary, fontWeight: Typography.semibold, fontSize: Typography.md },
  btnDanger:        { backgroundColor: DarkColors.danger, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm + 2, borderRadius: Radius.sm },
  btnDangerText:    { color: DarkColors.textPrimary, fontWeight: Typography.semibold },
  btnDisabled:      { opacity: 0.6, backgroundColor: DarkColors.border },
  btnChip:          { flexDirection: "row", alignItems: "center", backgroundColor: DarkColors.accent, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: Radius.md, gap: Spacing.xs + 2 },
  btnChipText:      { color: DarkColors.accentDark, fontWeight: Typography.bold, fontSize: Typography.base },
  inputWrapper:     { flexDirection: "row", alignItems: "center", backgroundColor: DarkColors.input, borderRadius: Radius.lg, borderWidth: 1, borderColor: DarkColors.border, paddingHorizontal: Spacing.md, height: 52 },
  inputError:       { borderColor: DarkColors.danger },
  inputText:        { flex: 1, color: DarkColors.textPrimary, fontSize: Typography.md },
  inputIcon:        { fontSize: Typography.lg, marginRight: Spacing.sm + 2 },
  fieldError:       { color: "#ff6666", fontSize: Typography.sm, marginTop: Spacing.xs + 2 },
  errorBanner:      { backgroundColor: DarkColors.dangerBg, borderWidth: 1, borderColor: DarkColors.dangerBorder, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.lg },
  errorBannerText:  { color: "#ff6666", fontSize: Typography.sm },
  checkbox:         { width: 22, height: 22, borderRadius: Radius.sm - 2, borderWidth: 2, borderColor: DarkColors.border, alignItems: "center", justifyContent: "center" },
  checkboxActive:   { backgroundColor: DarkColors.accent, borderColor: DarkColors.accent },
  checkmark:        { color: DarkColors.accentDark, fontSize: Typography.sm, fontWeight: Typography.bold },
  chip:             { paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs + 3, borderRadius: Radius.full, borderWidth: 1, borderColor: DarkColors.border, backgroundColor: DarkColors.input },
  chipActive:       { backgroundColor: DarkColors.accent, borderColor: DarkColors.accent },
  chipText:         { color: DarkColors.textDim, fontSize: Typography.sm + 1 },
  chipTextActive:   { color: DarkColors.accentDark, fontWeight: Typography.bold },
  badge:            { backgroundColor: DarkColors.accentDark, borderRadius: Radius.full, minWidth: 18, height: 18, alignItems: "center", justifyContent: "center", paddingHorizontal: Spacing.xs },
  badgeText:        { color: DarkColors.accent, fontSize: Typography.xs, fontWeight: "800" },
  overlay:          { flex: 1, backgroundColor: "#000000aa", justifyContent: "flex-end" },
  sheet:            { backgroundColor: DarkColors.card, borderTopLeftRadius: Radius.xxl, borderTopRightRadius: Radius.xxl, padding: Spacing.xxl, borderWidth: 1, borderColor: DarkColors.border },
  sheetHeader:      { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: Spacing.xl },
  sheetTitle:       { color: DarkColors.textPrimary, fontSize: Typography.xxl, fontWeight: Typography.bold },
  closeBtn:         { color: DarkColors.textPrimary, fontSize: Typography.xxl, fontWeight: Typography.regular },
  sectionTitle:     { color: DarkColors.textDim, fontSize: Typography.xs, fontWeight: Typography.semibold, letterSpacing: 0.8, textTransform: "uppercase", marginTop: Spacing.xl, marginBottom: Spacing.sm + 2 },
  dividerRow:       { flexDirection: "row", alignItems: "center", marginVertical: Spacing.xl },
  dividerLine:      { flex: 1, height: 1, backgroundColor: DarkColors.border },
  dividerText:      { color: DarkColors.textMuted, fontSize: Typography.sm, marginHorizontal: Spacing.md },
  blobTop:          { position: "absolute", top: -80, right: -80, width: 250, height: 250, borderRadius: 125, backgroundColor: DarkColors.blobGold },
  blobBottom:       { position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: 100, backgroundColor: DarkColors.blobBlue },
  socialRow:        { flexDirection: "row", gap: Spacing.md, marginBottom: Spacing.xl },
  socialBtn:        { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: DarkColors.input, borderRadius: Radius.lg, borderWidth: 1, borderColor: DarkColors.border, height: 48, gap: Spacing.sm },
  socialIcon:       { color: DarkColors.textPrimary, fontSize: Typography.lg, fontWeight: Typography.bold },
  socialLabel:      { color: DarkColors.textSecondary, fontSize: Typography.base, fontWeight: Typography.semibold },
});

export default S;