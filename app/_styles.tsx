import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },

  playerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingVertical: 16,
  },

  life: {
    fontSize: 80,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    zIndex: 2,
  },

  poison: {
    position: "absolute",
    top: 56,
    alignSelf: "center",
    fontSize: 36,
    color: "#22ff00",
    fontWeight: "bold",
    zIndex: 2,
  },

  divider: {
    height: 2,
    backgroundColor: "#1e293b",
    zIndex: 1,
  },

  sideButtonsLeft: {
    position: "absolute",
    left: 20,
    top: "50%",
    transform: [{ translateY: -70 }],
    zIndex: 2,
  },

  sideButtonsRight: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -70 }],
    zIndex: 2,
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

  sunGlow: {
    position: "absolute",
    top: 40,
    right: 40,
    width: 170,
    height: 170,
    borderRadius: 999,
    opacity: 0.65,
    shadowOpacity: 0.6,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  sunCore: {
    position: "absolute",
    top: 80,
    right: 85,
    width: 82,
    height: 82,
    borderRadius: 999,
    opacity: 0.9,
  },

  wipeShape: {
    position: "absolute",
    top: -220,
    left: -220,
    zIndex: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
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
    bottom: 36,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#000000",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    zIndex: 2,
  },

  poisonButtonText: {
    color: "#22ff00",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 24,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  modalCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#111827",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    padding: 20,
  },

  modalTitle: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },

  modalDescription: {
    color: "#cbd5e1",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 18,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  modalButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },

  cancelButton: {
    backgroundColor: "#475569",
  },

  resetButton: {
    backgroundColor: "#dc2626",
  },

  modalButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
