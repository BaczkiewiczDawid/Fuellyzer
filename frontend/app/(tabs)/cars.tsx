import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Wrapper} from "@/components/wrapper";
import {Title} from "@/components/title";
import {Description} from "@/components/description";
import deleteIcon from "@/assets/images/delete-icon.png";
import {useEffect, useState} from "react";
import {useApi} from "@/hooks/useApi";
import {Car} from "@/types/car";
import {Button} from "@/components/button";

export default function Cars() {
    const [userCarsList, setUserCarsList] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedCar, setSelectedCar] = useState<any>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const response = await useApi("http://localhost:4000/user-cars-list", "GET")

            if (response) {
                setUserCarsList(response);
            }

            setIsLoading(false);
        }

        fetchData();
    }, []);

    const handleDelete = async (carBrand: string, carName: string) => {
        const response = await useApi("http://localhost:4000/new-car", "DELETE", {
            email: "baczkiewicz.dawid22@gmail.com",
            carBrand,
            carName,
        })

        if (response) {
            setUserCarsList(userCarsList.filter((car) => car.carBrand !== carBrand && car.carName !== carName));
        }
    }


    return (
        <Wrapper footerContent={
            <Button href={"/new-car"} text={"Add new car"}/>
        }>
            {!userCarsList.length && !isLoading && (
                <View style={styles.noDataContainer}>
                    <Title centered>
                        There’s no cars
                        added yet</Title>
                </View>
            )}
            {userCarsList.map((car) => (
                <View key={car.carName} style={styles.itemContainer}>
                    <View>
                        <Title>{car.carBrand} {car.carName}</Title>
                        <Description>{car.mileage} km</Description>
                    </View>
                    <Pressable onPress={() => {
                        setShowConfirmationModal(true)
                        setSelectedCar({
                            carBrand: car.carBrand,
                            carName: car.carName
                        })
                    }}>
                        <Image style={styles.icon} source={deleteIcon}/>
                    </Pressable>
                </View>
            ))}
            {showConfirmationModal && (
                <View>
                    <Title>Are you sure you want to delete this car?</Title>
                    <Button onPress={() => setShowConfirmationModal(false)} text={"Cancel"}/>
                    <Button onPress={() => {
                        handleDelete(selectedCar.carBrand, selectedCar.carName)
                        setShowConfirmationModal(false)
                    }} text={"Delete"}/>
                </View>
            )}
        </Wrapper>
    );
}

const styles = StyleSheet.create({
            itemContainer: {
                flexDirection: 'row',
                justifyContent:
                    'space-between',
                alignItems:
                    'center',
                padding:
                    10,
                borderBottomWidth:
                    1,
                borderBottomColor:
                    '#e5e5e5',
            }
            ,
            icon: {
                width: 20,
                height:
                    20,
                cursor:
                    "pointer",
            }
            ,
            noDataContainer: {
                margin: "auto",
                marginTop:
                    30,
                width:
                    "60%",
            },
            text: {
                color: "#fafafa",
                textAlign:
                    "center",
            }
        }
    )
;
