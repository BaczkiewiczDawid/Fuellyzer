import React from 'react';
import {KeyboardTypeOptions, StyleSheet, Text, TextInput, View} from 'react-native';

type Props = {
    title: string,
    placeholder: string
    type: "string" | "number" | "email" | "password" | "date"
    value: string | number | undefined
    setValue: (val: any) => void
    error: boolean,
    badge?: "$" | "km" | "L" | "L/100km" | "$/L"
    step?: "string"
    errorType?: "required" | "mileage" | "invalid-format"
    hideLabel?: boolean
    style?: object
}

export const FormInput = ({
                              title,
                              placeholder,
                              type,
                              value,
                              setValue,
                              error,
                              badge,
                              errorType,
                              hideLabel,
                              style
                          }: Props) => {
    let keyboardType: KeyboardTypeOptions = "default"

    if (type === "number") {
        keyboardType = "numeric"
    }
    if (type === "email") {
        keyboardType = "email-address"
    }

    let errorMessage = ""

    switch (errorType) {
        case "mileage":
            errorMessage = "Mileage too low"
            break
        case "required":
            errorMessage = "This field is required"
            break
        case "invalid-format":
            errorMessage = "Please correct format to dd-mm-yyyy"
            break
        default:
            errorMessage = "This field is required"
    }

    if (errorType === "required" && value) {
        error = false
    }

    return (
        <View style={styles.container}>
            {!hideLabel && (
                <Text style={styles.label}>{title}</Text>
            )}
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder={placeholder}
                    style={[styles.input, style]}
                    keyboardType={keyboardType}
                    value={value === undefined ? '' : value.toString()}
                    secureTextEntry={type === 'password'}
                    onChangeText={(text) => setValue(text)}
                    placeholderTextColor="#9ca3af"
                />
                {badge && <Text style={styles.inputBadge}>{badge}</Text>}
            </View>
            {error && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        color: "#374151",
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 8,
        paddingHorizontal: 16,
        backgroundColor: "#ffffff",
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 16,
        color: "#374151",
        paddingVertical: 0,
    },
    inputBadge: {
        fontSize: 14,
        color: "#6b7280",
    },
    error: {
        color: "#ef4444",
        fontSize: 12,
        marginTop: 4,
    }
})

export default FormInput;