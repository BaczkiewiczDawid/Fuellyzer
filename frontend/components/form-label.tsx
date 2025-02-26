import {View, Text, StyleSheet, TextInput, KeyboardTypeOptions} from "react-native";

type Props = {
    title: string,
    placeholder: string
    type: "string" | "number" | "email" | "password"
    value: string | number | undefined
    setValue: (val: any) => void
    error: boolean,
}

export const FormLabel = ({title, placeholder, type, value, setValue, error}: Props) => {
    let keyboardType: KeyboardTypeOptions = "default"

    if (type === "number") {
        keyboardType = "numeric"
    }
    if (type === "email") {
        keyboardType = "email-address"
    }

    return (
        <View>
            <Text style={styles.label}>{title}</Text>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                keyboardType={keyboardType}
                value={value?.toString()}
                secureTextEntry={type === 'password'}
                onChangeText={(text) => setValue(text)}
            />
            {error && !value && <Text style={styles.error}>This field is required</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        color: "#101D1E",
        fontSize: 16,
        fontWeight: "400"
    },
    input: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        borderWidth: 2,
        borderColor: "#D9D9D9",
        fontWeight: "300",
    },
    error: {
        color: "#FF3D3D",
        marginTop: 5,
    }
})