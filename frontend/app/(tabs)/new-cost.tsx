import {Wrapper} from "@/components/wrapper";
import {Title} from "@/components/title";
import {Description} from "@/components/description";
import {Navigation} from "@/components/navigation";
import {useEffect, useState} from "react";
import {Pressable, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {useApi} from "@/hooks/useApi";
import {Car} from "@/types/car";
import {FormInput} from "@/components/form-input";
import Svg, {Circle, Path} from "react-native-svg";
import {router} from "expo-router";
import {DataFormatter} from "@/helpers/data-formatter";
import CustomSelect from "@/components/customSelect";

export default function NewCost() {
    const [activeView, setActiveView] = useState("Refuel");
    const views = ["Refuel", "Maintance", "Tuning"];
    const [availableCars, setAvailableCars] = useState<Car[]>([])
    const [mileage, setMileage] = useState<number | undefined>(undefined)
    const [fuelAmount, setFuelAmount] = useState<number | undefined>(undefined)
    const [price, setPrice] = useState<number | undefined>(undefined)
    const [totalCost, setTotalCost] = useState<number | undefined>(undefined)
    const [fullRefuel, setFullRefuel] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [selectedCar, setSelectedCar] = useState<{
        carBrand: string,
        carName: string,
        mileage?: number
    } | undefined>(undefined)
    const [partName, setPartName] = useState<string | undefined>(undefined)
    const [details, setDetails] = useState<string | undefined>(undefined)

    const mainColor = '#1E88E5'
    const trackColor = '#BBDEFB'

    const fuelOptions = [
        {label: 'PB95', value: 'PB95'},
        {label: 'PB98', value: 'PB98'},
        {label: 'ON', value: 'ON'},
        {label: 'LPG', value: 'LPG'},
    ];

    useEffect(() => {
        const fetchData = async () => {
            const response = await useApi("http://localhost:4000/user-cars-list", "GET")

            setAvailableCars(response.map((car: Car) => ({
                carBrand: car.carBrand,
                carName: car.carName,
                defaultSelected: car.defaultSelected,
                mileage: car.mileage
            } as Car)));
        }

        fetchData()
    }, [])

    const defaultSelectedCar = availableCars.find((car: Car) => car.defaultSelected)

    useEffect(() => {
        if (defaultSelectedCar) {
            setSelectedCar({
                carBrand: defaultSelectedCar.carBrand,
                carName: defaultSelectedCar.carName,
                mileage: defaultSelectedCar.mileage
            })
        }
    }, [defaultSelectedCar]);

    const handleNewCost = async () => {
        let data = {}

        if (activeView === "Refuel") {
            if (!mileage || !fuelAmount || !price || !totalCost || !selectedCar) {
                setError(true)
                return
            }

            if (selectedCar.mileage && mileage && mileage < selectedCar?.mileage) {
                setError(true)
                return
            }

            data = {
                carBrand: selectedCar.carBrand,
                carName: selectedCar.carName,
                mileage,
                fuelAmount,
                details,
                price,
                totalCost,
                email: "baczkiewicz.dawid22@gmail.com",
                type: activeView,
                date: new Date().toISOString().split("T")[0],
                fullRefuel,
            }
        } else {
            if (selectedCar) {
                data = {
                    carBrand: selectedCar.carBrand,
                    carName: selectedCar.carName,
                    totalCost,
                    email: "baczkiewicz.dawid22@gmail.com",
                    type: activeView,
                    date: new Date().toISOString().split("T")[0],
                    partName,
                    details,
                }

            }
        }

        const response = await useApi("http://localhost:4000/new-expense", "POST", data)

        if (response) {
            setMileage(undefined)
            setTotalCost(undefined)
            setPrice(undefined)
            setFuelAmount(undefined)
            setDetails(undefined)
            setPartName(undefined)
            setActiveView("Refuel")
            setError(false)
            router.push("/")
        }
    }

    useEffect(() => {
        if (price && fuelAmount) {
            setTotalCost(price * fuelAmount)
        } else if (price && !fuelAmount) {
            setTotalCost(price)
        } else {
            setTotalCost(undefined)
        }
    }, [price, fuelAmount])

    return (
        <Wrapper>
            <Title>New cost</Title>
            <Description>Fill in the form below to add a new cost</Description>
            <View style={styles.formWrapper}>
                <Navigation activeView={activeView} setActiveView={setActiveView} views={views}/>
                <View style={styles.vehicleContainer}>
                    {availableCars.map((car) => (
                        <TouchableOpacity
                            key={car.id}
                            style={[styles.carOption, selectedCar?.carName === car.carName && styles.selected]}
                            onPress={() => setSelectedCar({
                                carBrand: car.carBrand,
                                carName: car.carName,
                                mileage: car.mileage
                            })}
                        >
                            <View style={styles.carIcon}>
                                <Svg width={20} height={20} viewBox="0 0 24 24" stroke="black" strokeWidth={2}
                                     fill="none">
                                    <Path
                                        d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.4 1 12.3 1 13.2V16c0 .6.4 1 1 1h2"/>
                                    <Circle cx={7} cy={17} r={2}/>
                                    <Path d="M9 17h6"/>
                                    <Circle cx={17} cy={17} r={2}/>
                                </Svg>
                            </View>
                            <View style={styles.carDetails}>
                                <Text
                                    style={styles.carName}>{car.carBrand} {car.carName}</Text>
                            </View>
                            {selectedCar?.carName === car.carName && (
                                <Svg width={20} height={20} viewBox="0 0 24 24" stroke="black" strokeWidth={2}
                                     fill="none">
                                    <Path d="M20 6L9 17l-5-5"/>
                                </Svg>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
                {activeView === "Refuel" && (
                    <View style={styles.form}>
                        <View style={styles.inputsContainer}>
                            <View style={styles.inputWrapper}>
                                <FormInput title={"Fuel price"} placeholder={"Fuel price..."} type={"number"}
                                           value={DataFormatter(price, "rounded")}
                                           setValue={setPrice} error={error} badge={"$/L"}/>
                            </View>
                            <View style={styles.inputWrapper}>
                                <FormInput title={"Liters Fueled"} placeholder={"Liters Fueled..."} type={"number"}
                                           value={DataFormatter(fuelAmount, "rounded")}
                                           setValue={setFuelAmount} error={error} badge={"L"}/>
                            </View>
                        </View>
                        <FormInput title={"Total price"} placeholder={"Total price"} type={"number"}
                                   value={DataFormatter(totalCost, "rounded")}
                                   setValue={setTotalCost} error={error} badge={"$"}/>
                        <CustomSelect
                            value={details}
                            onChange={setDetails}
                            options={fuelOptions}
                            placeholder="Select fuel type"
                            title="Select Fuel Type"
                        />
                        <FormInput title={"Odometer Reading"} placeholder={"Odometer Reading..."} type={"number"}
                                   value={mileage} setValue={setMileage} error={error} badge={"km"}
                                   errorType={(selectedCar?.mileage && mileage && mileage < selectedCar?.mileage) ? "mileage" : "required"}/>
                        <View style={styles.inputsContainer}>
                            <Text style={styles.labelText}>Full refuel</Text>
                            <Switch value={fullRefuel} onValueChange={() => setFullRefuel(!fullRefuel)}
                                    trackColor={{false: '#D8D8D8', true: trackColor}}
                                    thumbColor={fullRefuel ? mainColor : '#F4F3F4'}
                                    ios_backgroundColor="#3e3e3e"
                            />
                        </View>
                    </View>
                )}
                {(activeView === "Maintance" || activeView === "Tuning") && (
                    <View style={styles.form}>
                        <FormInput title={"Part name"} placeholder={"Part name..."} type={"string"} value={partName}
                                   setValue={setPartName} error={false}/>
                        <FormInput title={"Details"} placeholder={"Details"} type={"string"} value={details}
                                   setValue={setDetails} error={false}/>
                        <FormInput title={"Price"} placeholder={"Price..."} type={"number"} value={price}
                                   setValue={setPrice} error={false} badge={"$"}/>
                    </View>
                )}
                <View style={styles.summaryWrapper}>
                    {activeView === "Refuel" && (
                        <View>
                            <Text>Summary</Text>
                            <View style={styles.summaryRow}>
                                <Text>Fuel amount</Text>
                                <Text>{fuelAmount}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text>Price per Liter</Text>
                                <Text>{DataFormatter(price, "moneyRounded")}</Text>
                            </View>
                        </View>
                    )}
                    <View style={[styles.summaryRow, styles.lastRow]}>
                        <Text style={styles.textBold}>Total</Text>
                        <Text style={styles.textBold}>{DataFormatter(totalCost, "moneyRounded")}</Text>
                    </View>
                </View>
                <Pressable onPress={() => handleNewCost()} style={styles.button}><Text
                    style={styles.buttonText}>Save Expense</Text></Pressable>
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    formWrapper: {
        marginTop: 20,
    },
    select: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        marginTop: 30,
        color: "#101D1E",
        borderWidth: 2,
        borderColor: "#e5e7eb",
    },
    form: {
        marginTop: 30,
        width: "100%",
        flexDirection: "column",
        rowGap: 20,
    },
    button: {
        backgroundColor: "#0F77F0",
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 30
    },
    buttonText: {
        color: "#fafafa",
        textAlign: "center",
    },
    vehicleSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1E88E5',
        padding: 14,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 4,
    },
    vehicleSelectorText: {
        color: 'white',
        fontWeight: '500',
    },
    carOption: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    selected: {
        borderColor: "#0F77F0",
        borderWidth: 1,
    },
    carIcon: {
        marginRight: 10
    },
    carDetails: {
        flex: 1
    },
    carName: {
        fontSize: 16, fontWeight: "bold"
    },
    carInfo: {
        fontSize: 14, color: "gray"
    },
    vehicleContainer: {
        marginTop: 30,
    },
    inputsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        gap: 10,
    },
    inputWrapper: {
        width: "48%",
    },
    summaryWrapper: {
        marginTop: 30,
        padding: 10,
        width: "100%",
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
    textBold: {
        fontWeight: "700",
    },
    lastRow: {
        borderTopWidth: 1,
        marginTop: 10,
        paddingTop: 10,
    },
    labelText: {
        color: "#374151",
        fontSize: 14,
        fontWeight: "500",
    }
})