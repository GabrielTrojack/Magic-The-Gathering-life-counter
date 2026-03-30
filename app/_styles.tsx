import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },

  playerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  life: {
    fontSize: 80,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center", // 👈 garante centralização perfeita
  },

  poison: {
    position: "absolute",
    top: 40,              // 👈 mais colado no topo
    alignSelf: "center",
    fontSize: 36,         // 👈 melhor proporção com life
    color: "#22ff00",
    fontWeight: "bold",
  },

  divider: {
    height: 2,
    backgroundColor: "#1e293b",
    zIndex: 1,
  },

  sideButtonsLeft: {
    position: "absolute",
    left: 20,
    top: "35%", // 👈 leve ajuste visual
  },

  sideButtonsRight: {
    position: "absolute",
    right: 20,
    top: "35%", // 👈 leve ajuste visual
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginVertical: 6,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

  rotated: {
    transform: [{ rotate: "180deg" }],
  },

  flashOverlay: {
    ...StyleSheet.absoluteFillObject,
  },

  centerMenu: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    alignItems: "center",
    transform: [{ translateY: -30 }],
    zIndex: 9999,
    elevation: 20,
  },

  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15,23,42,0.95)", // 👈 leve transparência (mais bonito)
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#334155",

    // 👇 sombra (iOS + Android)
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  menuIcon: {
    color: "#e2e8f0",
    fontSize: 20,
    marginHorizontal: 10,
  },

  separator: {
    width: 1,
    height: 20,
    backgroundColor: "#334155",
  },

  menuIconButton: {
    paddingHorizontal: 12, // 👈 área de clique melhor
    paddingVertical: 8,
  },

  poisonButton: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#000000",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  poisonButtonText: {
    color: "#22ff00",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 20,
  },
});
