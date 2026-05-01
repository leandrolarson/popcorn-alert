import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";


type FormButtonProps = TouchableOpacityProps & {
  title: string;
};

export default function FormButton({
  title,
  disabled,
  ...rest
}: FormButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.buttonDisabled : null]}
      activeOpacity={0.8}
      disabled={disabled}
      {...rest}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4A90E2",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonDisabled: { backgroundColor: "#A0A0A0" },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});
