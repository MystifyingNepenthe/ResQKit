import { useCallback, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useAudioPlayer } from "expo-audio";
import * as Haptics from "expo-haptics";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useLocale from "../../hooks/useLocale";
import { COLORS } from "../../design";
import styles from "./cprMetronome.styles";

const CLICK = require("../../assets/metronome-click.wav");

export default function CPRMetronome({ bpm = 110, label = "RCP" }) {
  const { pick } = useLocale();
  const player = useAudioPlayer(CLICK);
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setRunning(false);
  }, []);

  const tick = useCallback(() => {
    setCount((value) => value + 1);
    try {
      void player.seekTo(0);
      player.play();
    } catch {}
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
  }, [player]);

  const start = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    tick();
    timerRef.current = setInterval(tick, Math.round(60000 / bpm));
    setRunning(true);
  }, [bpm, tick]);

  useEffect(() => stop, [stop]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.pulse}><MaterialCommunityIcons name="heart-pulse" size={34} color={COLORS.error} /></View>
        <View style={styles.textWrap}><Text style={styles.title}>{pick("Metronom RCP", "CPR metronome")}</Text><Text style={styles.subtitle}>{bpm} BPM · {label}</Text></View>
        <Text style={styles.count}>{count || "—"}</Text>
      </View>
      <Button mode={running ? "outlined" : "contained"} onPress={running ? stop : start}>{running ? pick("Oprește metronomul", "Stop metronome") : pick("Pornește metronomul", "Start metronome")}</Button>
      <Text style={styles.note}>{pick("Click audio + vibrație la fiecare bătaie. Dacă aplicația este întreruptă pentru apelul 112, repornește metronomul când revii.", "Audio click + vibration on every beat. If the app is interrupted by the 112 call, restart the metronome when you return.")}</Text>
    </View>
  );
}
