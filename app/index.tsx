import React, { useState } from "react";
import { Dices, Settings, RotateCcw, ScrollText, Droplet } from "lucide-react-native";
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  Animated,
  useWindowDimensions,
} from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import Reanimated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { styles } from "./_styles";
import { ResetGameModal } from "@/components/reset-game-modal";
import { AppTheme, AppThemeName, THEMES } from "@/constants/app-theme";

type ButtonProps = {
  label: string;
  color: string;
  onPress: (event: GestureResponderEvent) => void;
};

const ActionButton: React.FC<ButtonProps> = ({ label, color, onPress }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const ThemeBackground: React.FC<{ theme: AppTheme }> = ({ theme }) => (
  <View style={StyleSheet.absoluteFillObject}>
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFillObject}>
      <Defs>
        <LinearGradient id={`sky-${theme.name}`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={theme.backgroundGradient[0]} />
          <Stop offset="100%" stopColor={theme.backgroundGradient[1]} />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill={`url(#sky-${theme.name})`} />
    </Svg>

    <View style={[styles.sunGlow, { backgroundColor: theme.sunGlow, shadowColor: theme.sunColor }]} />
    <View style={[styles.sunCore, { backgroundColor: theme.sunColor }]} />
  </View>
);

const LifeCounter: React.FC = () => {
  const { width, height } = useWindowDimensions();

  const [player1, setPlayer1] = useState<number>(20);
  const [player2, setPlayer2] = useState<number>(20);
  const [poison1, setPoison1] = useState<number>(0);
  const [poison2, setPoison2] = useState<number>(0);

  const [flash1] = useState(new Animated.Value(0));
  const [flash2] = useState(new Animated.Value(0));
  const [flashColor1, setFlashColor1] = useState("transparent");
  const [flashColor2, setFlashColor2] = useState("transparent");
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);

  const [currentThemeName, setCurrentThemeName] = useState<AppThemeName>("night");
  const [nextThemeName, setNextThemeName] = useState<AppThemeName | null>(null);
  const [wipeDirection, setWipeDirection] = useState<1 | -1>(1);

  const transitionProgress = useSharedValue(0);

  const currentTheme = THEMES[currentThemeName];
  const previewTheme = nextThemeName ? THEMES[nextThemeName] : currentTheme;

  const resetGame = () => {
    setPlayer1(20);
    setPlayer2(20);
    setPoison1(0);
    setPoison2(0);
    setFlashColor1("transparent");
    setFlashColor2("transparent");
    flash1.setValue(0);
    flash2.setValue(0);
    setIsResetModalVisible(false);
  };

  const triggerFlash = (
    flash: Animated.Value,
    setColor: (c: string) => void,
    isDamage: boolean
  ) => {
    setColor(isDamage ? "rgba(255,0,0,0.5)" : "rgba(0,255,0,0.5)");
    flash.setValue(0);

    Animated.sequence([
      Animated.timing(flash, { toValue: 1, duration: 120, useNativeDriver: true }),
      Animated.timing(flash, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start();
  };

  const triggerPoisonFlash = (flash: Animated.Value, setColor: (c: string) => void) => {
    setColor("rgba(34,255,0,0.35)");
    flash.setValue(0);

    Animated.sequence([
      Animated.timing(flash, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.timing(flash, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const finishThemeTransition = (themeName: AppThemeName) => {
    setCurrentThemeName(themeName);
    setNextThemeName(null);
    transitionProgress.value = 0;
  };

  const toggleTheme = () => {
    if (nextThemeName) return;

    const targetTheme: AppThemeName = currentThemeName === "night" ? "day" : "night";
    const direction = wipeDirection === 1 ? -1 : 1;

    setWipeDirection(direction);
    setNextThemeName(targetTheme);
    transitionProgress.value = 0;
    transitionProgress.value = withTiming(
      1,
      { duration: 520, easing: Easing.inOut(Easing.cubic) },
      (finished) => {
        if (finished) {
          runOnJS(finishThemeTransition)(targetTheme);
        }
      }
    );
  };

  const topLayerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: nextThemeName
      ? interpolate(transitionProgress.value, [0, 0.92, 1], [1, 1, 0])
      : 1,
  }));

  const curvedWipeStyle = useAnimatedStyle(() => {
    const direction = wipeDirection;
    const travel = width * 1.7;

    return {
      transform: [
        {
          translateX: interpolate(
            transitionProgress.value,
            [0, 1],
            [-travel * direction, travel * direction * 0.1]
          ),
        },
        {
          rotate: `${interpolate(
            transitionProgress.value,
            [0, 1],
            [-120 * direction, 120 * direction]
          )}deg`,
        },
      ],
      opacity: nextThemeName
        ? interpolate(transitionProgress.value, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
        : 0,
    };
  });

  const wipeSize = Math.max(width, height) * 1.7;

  const triggerPoisonFlash = (
    flash: Animated.Value,
    setColor: (c: string) => void
  ) => {
    setColor("rgba(34,255,0,0.35)");
    flash.setValue(0);

    Animated.sequence([
      Animated.timing(flash, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(flash, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <ThemeBackground theme={previewTheme} />

      <Reanimated.View pointerEvents="none" style={[StyleSheet.absoluteFillObject, topLayerAnimatedStyle]}>
        <ThemeBackground theme={currentTheme} />
      </Reanimated.View>

      {nextThemeName && (
        <Reanimated.View
          pointerEvents="none"
          style={[
            styles.wipeShape,
            {
              width: wipeSize,
              height: wipeSize,
              borderRadius: wipeSize,
              backgroundColor: THEMES[nextThemeName].panel,
            },
            curvedWipeStyle,
          ]}
        />
      )}

      <View style={[styles.playerContainer, styles.rotated]}>
        <Animated.View
          pointerEvents="none"
          style={[styles.flashOverlay, { opacity: flash1, backgroundColor: flashColor1 }]}
        />

        {poison1 > 0 && <Text style={[styles.poison, { color: currentTheme.poison }]}>{poison1}</Text>}
        <Text style={[styles.life, { color: currentTheme.textPrimary }]}>{player1}</Text>

        <View style={styles.sideButtonsRight}>
          <ActionButton
            label="+1"
            color={currentTheme.positive}
            onPress={() => {
              setPlayer1((prev) => prev + 1);
              triggerFlash(flash1, setFlashColor1, false);
            }}
          />
          <ActionButton
            label="+5"
            color={currentTheme.positive}
            onPress={() => {
              setPlayer1((prev) => prev + 5);
              triggerFlash(flash1, setFlashColor1, false);
            }}
          />
        </View>

        <View style={styles.sideButtonsLeft}>
          <ActionButton
            label="-1"
            color={currentTheme.negative}
            onPress={() => {
              setPlayer1((prev) => prev - 1);
              triggerFlash(flash1, setFlashColor1, true);
            }}
          />
          <ActionButton
            label="-5"
            color={currentTheme.negative}
            onPress={() => {
              setPlayer1((prev) => prev - 5);
              triggerFlash(flash1, setFlashColor1, true);
            }}
          />
        </View>

        <TouchableOpacity
          style={[styles.poisonButton, { backgroundColor: currentTheme.poisonButtonBg }]}
          onPress={() => {
            setPoison1((prev) => Math.min(10, prev + 1));
            triggerPoisonFlash(flash1, setFlashColor1);
          }}
        >
          <Text style={[styles.poisonButtonText, { color: currentTheme.poison }]}>+ </Text>
          <Droplet size={20} color={currentTheme.poison} fill={currentTheme.poison} />
        </TouchableOpacity>
      </View>

      <View style={[styles.divider, { backgroundColor: currentTheme.divider }]} />

      <View style={styles.playerContainer}>
        <Animated.View
          pointerEvents="none"
          style={[styles.flashOverlay, { opacity: flash2, backgroundColor: flashColor2 }]}
        />
        {poison2 > 0 && <Text style={styles.poison}>{poison2}</Text>}

        {poison2 > 0 && <Text style={[styles.poison, { color: currentTheme.poison }]}>{poison2}</Text>}
        <Text style={[styles.life, { color: currentTheme.textPrimary }]}>{player2}</Text>

        <View style={styles.sideButtonsRight}>
          <ActionButton
            label="+1"
            color={currentTheme.positive}
            onPress={() => {
              setPlayer2((prev) => prev + 1);
              triggerFlash(flash2, setFlashColor2, false);
            }}
          />
          <ActionButton
            label="+5"
            color={currentTheme.positive}
            onPress={() => {
              setPlayer2((prev) => prev + 5);
              triggerFlash(flash2, setFlashColor2, false);
            }}
          />
        </View>

        <View style={styles.sideButtonsLeft}>
          <ActionButton
            label="-1"
            color={currentTheme.negative}
            onPress={() => {
              setPlayer2((prev) => prev - 1);
              triggerFlash(flash2, setFlashColor2, true);
            }}
          />
          <ActionButton
            label="-5"
            color={currentTheme.negative}
            onPress={() => {
              setPlayer2((prev) => prev - 5);
              triggerFlash(flash2, setFlashColor2, true);
            }}
          />
        </View>

        <TouchableOpacity
          style={[styles.poisonButton, { backgroundColor: currentTheme.poisonButtonBg }]}
          onPress={() => {
            setPoison2((prev) => Math.min(10, prev + 1));
            triggerPoisonFlash(flash2, setFlashColor2);
          }}
        >
          <Text style={[styles.poisonButtonText, { color: currentTheme.poison }]}>+ </Text>
          <Droplet size={20} color={currentTheme.poison} fill={currentTheme.poison} />
        </TouchableOpacity>
      </View>

      <View style={styles.centerMenu}>
        <View
          style={[
            styles.menuContainer,
            { backgroundColor: currentTheme.panel, borderColor: currentTheme.panelBorder },
          ]}
        >
          <TouchableOpacity style={styles.menuIconButton} onPress={() => console.log("dice")}>
            <Dices size={22} color={currentTheme.menuIcon} />
          </TouchableOpacity>

          <View style={[styles.separator, { backgroundColor: currentTheme.menuSeparator }]} />

          <TouchableOpacity
            style={styles.menuIconButton}
            onPress={() => setIsResetModalVisible(true)}>
            <RotateCcw size={22} color="#e2e8f0" />
          </TouchableOpacity>

          <View style={[styles.separator, { backgroundColor: currentTheme.menuSeparator }]} />

          <TouchableOpacity style={styles.menuIconButton} onPress={() => console.log("log")}>
            <ScrollText size={22} color={currentTheme.menuIcon} />
          </TouchableOpacity>

          <View style={[styles.separator, { backgroundColor: currentTheme.menuSeparator }]} />

          <TouchableOpacity style={styles.menuIconButton} onPress={toggleTheme}>
            <Settings size={22} color={currentTheme.menuIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <ResetGameModal
        visible={isResetModalVisible}
        onCancel={() => setIsResetModalVisible(false)}
        onConfirm={resetGame}
        theme={currentTheme}
      />
    </View>
  );
};

export default LifeCounter;
