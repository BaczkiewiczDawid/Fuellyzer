import {StyleSheet, View} from "react-native";
import {Wrapper} from "@/components/wrapper";
import {Title} from "@/components/title";
import {Select} from "@/components/select";
import {useState} from "react";
import {Button} from "@/components/button";
import FormInput from "@/components/form-input";
import {useApi} from "@/hooks/useApi";

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
    const [insurance, setInsurance] = useState(undefined);

    const handleAddNewCar = async () => {
        await useApi("http://localhost:4000/new-car", "POST", {
            email: "baczkiewicz.dawid22@gmail.com",
            carBrand: selectedBrand,
            carName: selectedModel,
            mileage,
            insurance,
            oilChange: 10000,
        })
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
                           setValue={setMileage} error={false}/>
                <FormInput title={"Insurance"} placeholder={"Insurance expiration date..."} type={"date"}
                           value={insurance}
                           setValue={setInsurance} error={false}/>
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