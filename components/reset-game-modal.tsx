import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { styles } from "../app/_styles";
import { AppTheme } from "@/constants/app-theme";

type ResetGameModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  theme: AppTheme;
};

export const ResetGameModal: React.FC<ResetGameModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  theme,
}) => (
  <Modal
    animationType="fade"
    transparent
    visible={visible}
    onRequestClose={onCancel}
  >
    <View style={[styles.modalOverlay, { backgroundColor: theme.modalBackdrop }]}>
      <View
        style={[
          styles.modalCard,
          { backgroundColor: theme.panel, borderColor: theme.panelBorder },
        ]}
      >
        <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>Reiniciar jogo?</Text>
        <Text style={[styles.modalDescription, { color: theme.textSecondary }]}>
          Deseja reiniciar a partida? Vida e poison voltarão ao valor inicial.
        </Text>

        <View style={styles.modalActions}>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={[styles.modalButtonText, { color: theme.textPrimary }]}>
              Cancelar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalButton, styles.resetButton]}
            onPress={onConfirm}
          >
            <Text style={styles.modalButtonText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);
