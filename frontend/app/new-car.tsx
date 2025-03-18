import {StyleSheet, View} from "react-native";
import {Wrapper} from "@/components/wrapper";
import {Title} from "@/components/title";
import {Select} from "@/components/select";
import {useState} from "react";
import {Button} from "@/components/button";
import FormInput from "@/components/form-input";
import {useApi} from "@/hooks/useApi";
import {router} from "expo-router";

const carBrands = ["Audi", "BMW", "Volkswagen"];
const carModels = [{
    brand: "Audi",
    models: ["A3", "A4", "A5"]
}, {
    brand: "BMW",
    models: ["3", "5", "7"]
}, {
    brand: "Volkswagen",
    models: ["Golf", "Passat", "Tiguan"]
}];

export default function NewCar() {
    const [selectedBrand, setSelectedBrand] = useState("Audi");
    const [selectedModel, setSelectedModel] = useState("A3");
    const [selectedYear, setSelectedYear] = useState(undefined);
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

        const response = await useApi("http://localhost:4000/new-car", "POST", {
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
                <Select options={carBrands} value={selectedBrand} setValue={setSelectedBrand}/>
                <Select options={carModels.filter((car) => car.brand === selectedBrand)[0].models} value={selectedModel}
                        setValue={setSelectedModel}/>
                <Select options={["2010", "2011", "2012"]} value={selectedYear} setValue={setSelectedYear}/>
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