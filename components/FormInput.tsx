import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";


type FormInputProps = TextInputProps & {
  label: string;
  error?: string;
};

export default function FormInput({ label, error, ...rest }: FormInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[
          styles.input,
     
          error ? styles.inputError : null,
        ]}
        {...rest}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "bold", marginBottom: 6, color: "#333" },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  inputError: { borderColor: "red" }, 
  errorText: { color: "red", fontSize: 12, marginTop: 4 }, 
});
