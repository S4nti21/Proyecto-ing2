import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

export default function InputField({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={colors.muted}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: colors.text,
    borderRadius: 25,
    padding: 12,
    marginVertical: 8,
  },
});
