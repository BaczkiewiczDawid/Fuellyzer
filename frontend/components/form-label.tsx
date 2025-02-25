import {View, Text, StyleSheet} from "react-native";

type Props = {
    title: string,
    placeholder: string
    type: "string" | "number" | "email" | "password"
    value: string | number | undefined
    setValue: (val: any) => void
    error: boolean,
}

export const FormLabel = ({title, placeholder, type, value, setValue, error}: Props) => {
    return (
        <View>
            <label><Text style={styles.label}>{title}</Text></label>
            <input placeholder={placeholder} style={styles.input} type={type} value={value}
                   onChange={(event) => setValue(event.target.value)}/>
            {error && !value && <Text style={styles.error}>This field is required</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        color: "#101D1E",
        fontSize: 16,
        fontWeight: "regular"
    },
    input: {
        width: "92%",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        borderWidth: 2,
        borderColor: "#D9D9D9",
        fontWeight: "light",
    },
    error: {
        color: "#FF3D3D",
        marginTop: 5,
    }
})