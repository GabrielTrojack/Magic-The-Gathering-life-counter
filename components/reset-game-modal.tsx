import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { styles } from "../app/_styles";

type ResetGameModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ResetGameModal: React.FC<ResetGameModalProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => (
  <Modal
    animationType="fade"
    transparent
    visible={visible}
    onRequestClose={onCancel}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalCard}>
        <Text style={styles.modalTitle}>Reiniciar jogo?</Text>
        <Text style={styles.modalDescription}>
          Deseja reiniciar a partida? Vida e poison voltarão ao valor inicial.
        </Text>

        <View style={styles.modalActions}>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.modalButtonText}>Cancelar</Text>
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
