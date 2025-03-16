import {StyleSheet} from "react-native";

type Props = {
    options: any
    value: any
    setValue: any
}

export const Select = ({options, value, setValue}: Props) => {
    return (
        <select style={styles.select} onChange={(e) => setValue(e.target.value)}>
            {options.map((option: any) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}


const styles = StyleSheet.create({
    select: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        color: "#101D1E",
        borderWidth: 2,
        borderColor: "#e5e7eb",
    },
})