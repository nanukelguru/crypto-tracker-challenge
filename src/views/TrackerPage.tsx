import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCoins } from '../hooks/useCoins';
import { TableCoins } from '../components/TableCoins';
import { SafeAreaView } from 'react-native-safe-area-context';

export const TrackerPage = () => {
    const { coins, loading, error, refreshing, onRefresh } = useCoins();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Crypto Tracker</Text>
                <Text style={styles.subtitle}>Top 30</Text>
            </View>
            {error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : (
                <TableCoins
                    coins={coins}
                    loading={loading}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        marginTop: 4,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#ef4444',
        textAlign: 'center',
    },
});
