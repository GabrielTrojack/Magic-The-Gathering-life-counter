import React, { useState } from "react";
import { Dices, Settings, Undo, ScrollText, Droplet } from "lucide-react-native";
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  Animated,
} from "react-native";

import { styles } from "./_styles";

type ButtonProps = {
  label: string;
  color: string;
  onPress: (event: GestureResponderEvent) => void;
};

const ActionButton: React.FC<ButtonProps> = ({ label, color, onPress }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: color }]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const LifeCounter: React.FC = () => {
  const [player1, setPlayer1] = useState<number>(20);
  const [player2, setPlayer2] = useState<number>(20);

  const [poison1, setPoison1] = useState<number>(0);
  const [poison2, setPoison2] = useState<number>(0);

  const [flash1] = useState(new Animated.Value(0));
  const [flash2] = useState(new Animated.Value(0));

  const [flashColor1, setFlashColor1] = useState("transparent");
  const [flashColor2, setFlashColor2] = useState("transparent");

  const triggerFlash = (
    flash: Animated.Value,
    setColor: (c: string) => void,
    isDamage: boolean
  ) => {
    setColor(isDamage ? "rgba(255,0,0,0.5)" : "rgba(0,255,0,0.5)");

    flash.setValue(0);

    Animated.sequence([
      Animated.timing(flash, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(flash, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.playerContainer, styles.rotated]}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.flashOverlay,
            { opacity: flash1, backgroundColor: flashColor1 },
          ]}
        />
        <Text style={styles.poison}>{poison1}</Text>

        <Text style={styles.life}>{player1}</Text>

        <View style={styles.sideButtonsRight}>
          <ActionButton
            label="+1"
            color="#16a34a"
            onPress={() => {
              setPlayer1((prev) => prev + 1);
              triggerFlash(flash1, setFlashColor1, false);
            }}
          />
          <ActionButton
            label="+5"
            color="#16a34a"
            onPress={() => {
              setPlayer1((prev) => prev + 5);
              triggerFlash(flash1, setFlashColor1, false);
            }}
          />
        </View>

        <View style={styles.sideButtonsLeft}>
          <ActionButton
            label="-1"
            color="#dc2626"
            onPress={() => {
              setPlayer1((prev) => prev - 1);
              triggerFlash(flash1, setFlashColor1, true);
            }}
          />
          <ActionButton
            label="-5"
            color="#dc2626"
            onPress={() => {
              setPlayer1((prev) => prev - 5);
              triggerFlash(flash1, setFlashColor1, true);
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.poisonButton}
          onPress={() => setPoison1((prev) => prev + 1)}
        >
          <Text style={styles.poisonButtonText}>+</Text>
          <Droplet size={16} color="#22ff00" fill="#22ff00" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={[styles.playerContainer]}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.flashOverlay,
            { opacity: flash2, backgroundColor: flashColor2 },
          ]}
        />
        <Text style={styles.poison}>{poison2}</Text>


        <Text style={styles.life}>{player2}</Text>

        <View style={styles.sideButtonsRight}>
          <ActionButton
            label="+1"
            color="#16a34a"
            onPress={() => {
              setPlayer2((prev) => prev + 1);
              triggerFlash(flash2, setFlashColor2, false);
            }}
          />
          <ActionButton
            label="+5"
            color="#16a34a"
            onPress={() => {
              setPlayer2((prev) => prev + 5);
              triggerFlash(flash2, setFlashColor2, false);
            }}
          />
        </View>

        <View style={styles.sideButtonsLeft}>
          <ActionButton
            label="-1"
            color="#dc2626"
            onPress={() => {
              setPlayer2((prev) => prev - 1);
              triggerFlash(flash2, setFlashColor2, true);
            }}
          />
          <ActionButton
            label="-5"
            color="#dc2626"
            onPress={() => {
              setPlayer2((prev) => prev - 5);
              triggerFlash(flash2, setFlashColor2, true);
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.poisonButton}
          onPress={() => setPoison2((prev) => prev + 1)}
        >
          <Text style={styles.poisonButtonText}>+</Text>
          <Droplet size={16} color="#22ff00" fill="#22ff00" />
        </TouchableOpacity>
      </View>
      <View style={styles.centerMenu}>
        <View style={styles.menuContainer}>
          
          <TouchableOpacity 
            style={styles.menuIconButton}
            onPress={() => console.log("dice")}>
            <Dices size={22} color="#e2e8f0" />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity 
            style={styles.menuIconButton}
            onPress={() => console.log("undo")}>
            <Undo size={22} color="#e2e8f0" />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity 
            style={styles.menuIconButton}
            onPress={() => console.log("log")}>
            <ScrollText size={22} color="#e2e8f0" />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity 
            style={styles.menuIconButton}
            onPress={() => console.log("settings")}>
            <Settings size={22} color="#e2e8f0" />
          </TouchableOpacity>

        </View>
      </View>      
    </View>
  );
};

export default LifeCounter;
