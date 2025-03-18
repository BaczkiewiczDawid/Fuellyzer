import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    FlatList,
    SafeAreaView,
    Animated
} from 'react-native';

// Renaming the file to reflect its universal nature

type SelectOption = {
    label: string;
    value: string;
};

type CustomSelectProps = {
    value?: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    title?: string;
};

const CustomSelect = ({
                          value,
                          onChange,
                          options,
                          placeholder = 'Select an option',
                          title = 'Select an option'
                      }: CustomSelectProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [slideAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        if (modalVisible) {
            // Reset position before animation starts
            slideAnim.setValue(0);
            // Animate sliding up
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [modalVisible]);

    // Calculate translateY interpolation
    const translateY = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [300, 0], // Start from 300px below, move to final position
    });

    const selectedOption = options.find(option => option.value === value);

    const handleSelect = (option: any) => {
        onChange(option.value);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.selector}
                onPress={() => setModalVisible(true)}
            >
                <Text style={selectedOption ? styles.selectedText : styles.placeholderText}>
                    {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="none"
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <Animated.View
                        style={[
                            styles.modalContent,
                            { transform: [{ translateY }] }
                        ]}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{title}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.option,
                                        item.value === value && styles.selectedOption
                                    ]}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        item.value === value && styles.selectedOptionText
                                    ]}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </Animated.View>
                </SafeAreaView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    selector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
    selectedText: {
        fontSize: 16,
        color: '#374151',
    },
    placeholderText: {
        fontSize: 16,
        color: '#9ca3af',
    },
    arrow: {
        fontSize: 12,
        color: '#6b7280',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: '70%',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    closeButton: {
        fontSize: 20,
        color: '#6b7280',
        padding: 4,
    },
    option: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    selectedOption: {
        backgroundColor: '#f3f4f6',
    },
    optionText: {
        fontSize: 16,
        color: '#374151',
    },
    selectedOptionText: {
        fontWeight: '500',
        color: '#1f2937',
    },
});

export default CustomSelect;