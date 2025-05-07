import { StyleSheet, Text, View, Image } from "react-native";
import ArrowIconUp from "../../assets/images/arrow-up.png";
import ArrowIconDown from "../../assets/images/arrow-down.png";
import { DataFormatter } from "@/helpers/data-formatter";
import { useEffect, useState, useCallback } from "react";
import { useApi } from "@/hooks/useApi";
import { Car } from "@/types/car";
import { useUserStore } from "@/context/user";
import { SERVER_URL } from '../../constants/Config';
import { useHistoryStore } from "@/context/history";

type Props = {
    type: string
}

export const Summary = ({ type }: Props) => {
    const [historyData, setHistoryData] = useState([])
    const carBrand = useUserStore((state) => state.carBrand)
    const carName = useUserStore((state) => state.carName)
    const [currentData, setCurrentData] = useState<number>(0)
    const [prevData, setPrevData] = useState<number>(0)
    const [currentDataText, setCurrentDataText] = useState<string>("This month")
    const [prevDataText, setPrevDataText] = useState<string>("Last month")
    const [insuranceDate, setInsuranceDate] = useState<string>("")
    const [oilChange, setOilChange] = useState<number>(0)
    const refetchCounter = useHistoryStore((state) => state.refetchCounter)

    const summarizeData = (data: any[]) => {
        return data.reduce((sum, item) => sum + (item.total || 0), 0)
    };

    const today = new Date()

    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth() + 1

    const getPreviousMonth = (year: number, month: number) => {
        if (month === 1) {
            return { year: year - 1, month: 12 };
        } else {
            return { year, month: month - 1 };
        }
    };

    const getPreviousYear = (year: number) => {
        return year - 1;
    };

    const calculateData = useCallback(() => {
        let result;

        switch (type) {
            case "monthly": {
                const currentMonthData = historyData.filter((item: any) => {
                    const dateParts = item.date.split("-");
                    const itemYear = parseInt(dateParts[0]);
                    const itemMonth = parseInt(dateParts[1]);
                    return itemYear === currentYear && itemMonth === currentMonth;
                });

                const prevMonth = getPreviousMonth(currentYear, currentMonth);
                const prevMonthData = historyData.filter((item: any) => {
                    const dateParts = item.date.split("-");
                    const itemYear = parseInt(dateParts[0]);
                    const itemMonth = parseInt(dateParts[1]);
                    return itemYear === prevMonth.year && itemMonth === prevMonth.month;
                });

                const currentTotal = summarizeData(currentMonthData);
                const prevTotal = summarizeData(prevMonthData);

                setCurrentData(currentTotal);
                setPrevData(prevTotal);
                setCurrentDataText("This month");
                setPrevDataText("Last month");
                break;
            }
            case "yearly": {
                const currentYearData = historyData.filter((item: any) => {
                    const dateParts = item.date.split("-");
                    const itemYear = parseInt(dateParts[0]);
                    return itemYear === currentYear;
                });

                const prevYear = getPreviousYear(currentYear);
                const prevYearData = historyData.filter((item: any) => {
                    const dateParts = item.date.split("-");
                    const itemYear = parseInt(dateParts[0]);
                    return itemYear === prevYear;
                });

                setCurrentData(summarizeData(currentYearData));
                setPrevData(summarizeData(prevYearData));
                setCurrentDataText("This year");
                setPrevDataText("Last year");
                break;
            }
            case "reminders": {
                const insuranceDaysDiff = Math.ceil((new Date(insuranceDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                setCurrentDataText(`Oil change in ${oilChange} km`);
                setPrevDataText(`OC/AC ends in ${insuranceDaysDiff}`);
                break;
            }
        }
    }, [type, historyData, currentYear, currentMonth, insuranceDate, oilChange, today]);

    useEffect(() => {
        calculateData();
    }, [calculateData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const historyResponse = await useApi(`${SERVER_URL}/history`, "GET");
                const carDetailsResponse = await useApi(`${SERVER_URL}/user-cars-list`, "GET");

                if (carBrand && carName) {
                    const filteredData = await historyResponse.filter((item: Car) =>
                        item.carBrand === carBrand && item.carName === carName
                    );
                    setHistoryData(filteredData);
                }

                if (carBrand && carName) {
                    const carDetails = await carDetailsResponse.find((item: Car) =>
                        item.carBrand === carBrand && item.carName === carName
                    );
                    setInsuranceDate(carDetails.insurance);

                    const oilChangeMileage = carDetails.mileage - carDetails.lastOilChange

                    setOilChange(carDetails.oilChange - oilChangeMileage);
                }
            } catch (error) {
                console.error("Error fetching summary data:", error);
            }
        };

        fetchData();
    }, [refetchCounter, carBrand, carName]);

    return (
        <View style={styles.monthlyContainer}>
            {type !== "reminders" &&
                currentData > prevData ?
                <Image style={styles.icon} source={ArrowIconUp} /> :
                <Image style={styles.icon} source={ArrowIconDown} />
            }
            <View>
                {type !== "reminders" && <Text style={styles.label}>{DataFormatter(currentData, "moneyRounded")}</Text>}
                <Text style={styles.paragraph}>{currentDataText}</Text>
            </View>
            <View>
                {type !== "reminders" &&
                    <Text style={styles.label}>{DataFormatter(prevData, "moneyRounded")}</Text>
                }
                <Text style={styles.paragraph}>{prevDataText}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    monthlyContainer: {
        flexDirection: 'row',
        columnGap: 20,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#101D1E",
    },
    paragraph: {
        color: "#7B7B7B",
    },
    icon: {
        width: 20,
        height: 20,
    },
})