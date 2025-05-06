import {StyleSheet, View} from "react-native";
import {Wrapper} from "@/components/wrapper";
import {Title} from "@/components/title";
import {useState} from "react";
import {Button} from "@/components/button";
import FormInput from "@/components/form-input";
import {useApi} from "@/hooks/useApi";
import {router} from "expo-router";
import CustomSelect from "@/components/customSelect";
import { SERVER_URL } from '../constants/env';

const carBrands = [
    {label: "Audi", value: "Audi"},
    {label: "BMW", value: "BMW"},
    {label: "Volkswagen", value: "Volkswagen"},
];
const carModels = [{
    brand: "Audi",
    models: [
        {label: "A3", value: "A3"},
        {label: "A4", value: "A4"},
        {label: "A6", value: "A6"},
    ]
}, {
    brand: "BMW",
    models: [
        {label: "3 Series", value: "3 Series"},
        {label: "5 Series", value: "5 Series"},
        {label: "7 Series", value: "7 Series"},
    ]
}, {
    brand: "Volkswagen",
    models: [
        {label: "Golf", value: "Golf"},
        {label: "Passat", value: "Passat"},
        {label: "Tiguan", value: "Tiguan"},
    ]
}];

const years = Array.from({length: 30}, (_, i) => i + 1990).map(year => ({
    label: year.toString(),
    value: year.toString(),
}));

export default function NewCar() {
    const [selectedBrand, setSelectedBrand] = useState("Audi");
    const [selectedModel, setSelectedModel] = useState("A3");
    const [selectedYear, setSelectedYear] = useState<string | undefined>(undefined);
    const [mileage, setMileage] = useState(undefined);
    const [insurance, setInsurance] = useState<string | undefined>(undefined);
    const [oilChange, setOilChange] = useState(10000);
    const [error, setError] = useState(false);

    const handleAddNewCar = async () => {
        if (insurance && !insurance.match(/(\d{2})-(\d{2})-(\d{4})/)) {
            setError(true);
            return
        } else {
            setError(false);
        }

        const response = await useApi(`${SERVER_URL}/new-car`, "POST", {
            email: "baczkiewicz.dawid22@gmail.com",
            carBrand: selectedBrand,
            carName: selectedModel,
            mileage,
            insurance,
            oilChange: 10000,
        })

        if (response) {
            router.push("/cars")
        }
    }

    return (
        <Wrapper footerContent={
            <Button onPress={() => handleAddNewCar()} text={"Save"}/>
        }>
            <Title>Add new car</Title>
            <View style={styles.form}>
                <CustomSelect value={selectedBrand} onChange={setSelectedBrand} options={carBrands}/>
                <CustomSelect value={selectedModel} onChange={setSelectedModel}
                              options={carModels.find(car => car.brand === selectedBrand)?.models || []}/>
                <CustomSelect value={selectedYear} onChange={(val) => setSelectedYear(val)}
                              options={years}/>
                <FormInput title={"Mileage"} placeholder={"Mileage..."} type={"number"} value={mileage}
                           setValue={setMileage} error={false} badge={'km'}/>
                <FormInput title={"Insurance"} placeholder={"dd-mm-yyyy"} type={"date"}
                           value={insurance}
                           setValue={setInsurance} error={error} errorType={"invalid-format"}/>
                <FormInput title={"Oil change"} placeholder={"Oil change..."} type={"number"} value={oilChange}
                           setValue={setOilChange} error={false} badge={"km"}/>
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 30,
        rowGap: 15,
    }
})