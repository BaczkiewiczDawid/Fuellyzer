import {StyleSheet, Text, View, Image} from "react-native";
import ArrowIcon from "../../assets/images/arrow.png";
import {DataFormatter} from "@/helpers/data-formatter";
import {useEffect, useState} from "react";
import {useApi} from "@/hooks/useApi";
import {Car} from "@/types/car";
import {useUserStore} from "@/context/user";

type Props = {
    type: string
}

export const Summary = ({type}: Props) => {
    const [historyData, setHistoryData] = useState([])
    const carBrand = useUserStore((state) => state.carBrand)
    const carName = useUserStore((state) => state.carName)
    const [currentData, setCurrentData] = useState<number>(0)
    const [prevData, setPrevData] = useState<number>(0)
    const [currentDataText, setCurrentDataText] = useState<string>("This month")
    const [prevDataText, setPrevDataText] = useState<string>("Last month")
    const [inuranceDate, setInsuranceDate] = useState<string>("")
    const [oilChange, setOilChange] = useState<number>(0)

    const summarizeData = (data: any[]) => {
        return data.reduce((sum, item) => sum + (item.total || 0), 0)
    };

    useEffect(() => {
        const fetchData = async () => {
            const historyResponse = await useApi("http://localhost:4000/history", "GET")
            const carDetailsResponse = await useApi("http://localhost:4000/user-cars-list", "GET")

            if (carBrand && carName) {
                setHistoryData(await historyResponse.filter((item: Car) => item.carBrand === carBrand && item.carName === carName))
            }

            if (carBrand && carName) {
                const carDetails = await carDetailsResponse.find((item: Car) => item.carBrand === carBrand && item.carName === carName)
                setInsuranceDate(carDetails.insurance)
                setOilChange(carDetailsResponse.mileage - carDetails.oilChange)
            }
        }

        fetchData()
    }, []);

    const today = new Date()

    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth() + 1

    const getPreviousMonth = (year: number, month: number) => {
        if (month === 1) {
            return {year: year - 1, month: 12};
        } else {
            return {year, month: month - 1};
        }
    };

    const getPreviousYear = (year: number) => {
        return year - 1;
    };

    const calculateMonthly = () => {
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

        return {
            current: summarizeData(currentMonthData),
            previous: summarizeData(prevMonthData)
        };
    };

    const calculateYearly = () => {
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

        return {
            current: summarizeData(currentYearData),
            previous: summarizeData(prevYearData)
        };
    };

    const calculateData = () => {
        let result;

        switch (type) {
            case "monthly":
                result = calculateMonthly()

                setCurrentData(result.current)
                setPrevData(result.previous)

                setCurrentDataText("This month")
                setPrevDataText("Last month")
                break
            case "yearly":
                result = calculateYearly()

                setCurrentData(result.current)
                setPrevData(result.previous)

                setCurrentDataText("This year")
                setPrevDataText("Last year")

                break
            case "reminders":
                const insuranceDaysDiff = Math.ceil((new Date(inuranceDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

                setCurrentDataText(`Oil change in ${oilChange} km`)
                setPrevDataText(`OC/AC ends in ${insuranceDaysDiff}`)
                break
        }
    }

    useEffect(() => {
        calculateData()
    }, [historyData]);

    return (
        <View style={styles.monthlyContainer}>
            {type !== "reminders" &&
                <Image style={styles.icon} source={ArrowIcon} alt="Arrow icon"/>
            }
            <View>
                <Text style={styles.label}>{DataFormatter(currentData, "moneyRounded")}</Text>
                <Text style={styles.paragraph}>{currentDataText}</Text>
            </View>
            <View>
                <Text style={styles.label}>{DataFormatter(prevData, "moneyRounded")}</Text>
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
        color: "#7B7B7B",
    }
})