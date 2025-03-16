import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Wrapper} from "@/components/wrapper";
import {Title} from "@/components/title";
import {Description} from "@/components/description";
import deleteIcon from "@/assets/images/delete-icon.png";
import {useEffect, useState} from "react";
import {useApi} from "@/hooks/useApi";
import {Car} from "@/types/car";
import {Link} from "expo-router";

export default function Cars() {
    const [userCarsList, setUserCarsList] = useState<Car[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await useApi("http://localhost:4000/user-cars-list", "GET")

            if (response) {
                setUserCarsList(response);
            }
        }

        fetchData();
    }, []);

    const handleDelete = async (carBrand: string, carName: string) => {
        const response = await useApi("http://localhost:4000/new-car", "DELETE", {
            email: "baczkiewicz.dawid22@gmail.com",
            carBrand,
            carName,
        })
    }


    return (
        <Wrapper footerContent={
            <Link href={"/new-car"} style={styles.button}>
                <Pressable>
                    <Text style={styles.text}>Add new car</Text>
                </Pressable>
            </Link>
        }>
            {!userCarsList.length && (
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
                    <Pressable onPress={() => handleDelete(car.carBrand, car.carName)}>
                        <Image style={styles.icon} source={deleteIcon}/>
                    </Pressable>
                </View>
            ))}
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
            }
            ,
            button: {
                backgroundColor: "#0F77F0",
                padding:
                    10,
                borderRadius:
                    5,
                textAlign:
                    "center",
                width:
                    "60%",
                margin:
                    "auto",
                marginTop:
                    20,
                color:
                    "#fafafa",
                fontWeight:
                    "bold",
                position:
                    "static",
                bottom:
                    20,
            }
            ,
            text: {
                color: "#fafafa",
                textAlign:
                    "center",
            }
        }
    )
;
