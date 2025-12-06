import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Coin } from '../hooks/useCoins';

interface TableCoinsProps {
    coins: Coin[];
    loading: boolean;
    refreshing: boolean;
    onRefresh: () => void;
}

export const TableCoins: React.FC<TableCoinsProps> = ({
    coins,
    loading,
    refreshing,
    onRefresh,
}) => {
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
        }).format(price);
    };

    const formatPercentage = (percentage: number) => {
        return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
    };

    const getPercentageColor = (percentage: number) => {
        return percentage > 0 ? '#10b981' : '#ef4444';
    };

    const renderItem = ({ item }: { item: Coin }) => {
        return (
            <View style={styles.row}>
                {/*Logo*/}
                <View style={styles.logoContainer}>
                    <Image source={{ uri: item.image }} style={styles.logo} />
                </View>
                {/*Nombre*/}
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
                </View>
                {/*Precio*/}
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{formatPrice(item.current_price)}</Text>
                </View>
                {/*Porcentaje de cambio*/}
                <View style={styles.percentageContainer}>
                    <Text style={[styles.percentage, { color: getPercentageColor(item.price_change_percentage_24h) }]}>{formatPercentage(item.price_change_percentage_24h)}</Text>
                </View>
            </View>
        );
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.logoHeader}>Logo</Text>
            <Text style={styles.nameHeader}>Nombre</Text>
            <Text style={styles.priceHeader}>Precio</Text>
            <Text style={styles.percentageHeader}>24h %</Text>
        </View>
    );

    if (loading && coins.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#3b82f6" />
                <Text style={styles.loadingText}>Cargando monedas...</Text>
            </View>
        );
    }
    return (
        <FlatList
            data={coins}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={renderHeader}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#3b82f6']}
                    progressBackgroundColor="#fff"
                />
            }
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        marginTop: 10,
        color: '#6b7280',
    },
    header: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        backgroundColor: '#f9fafb',
        marginTop: 10,
    },
    headerText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#374151',
        textTransform: 'uppercase',
    },
    logoHeader: {
        width: 50,
        fontSize: 12,
        fontWeight: '700',
        color: '#374151',
        textTransform: 'uppercase',
    },
    nameHeader: {
        flex: 2,
        fontSize: 12,
        fontWeight: '700',
        color: '#374151',
        textTransform: 'uppercase',
    },
    priceHeader: {
        flex: 1.5,
        textAlign: 'right',
        fontSize: 12,
        fontWeight: '700',
        color: '#374151',
        textTransform: 'uppercase',
    },
    percentageHeader: {
        flex: 1,
        textAlign: 'right',
        fontSize: 12,
        fontWeight: '700',
        color: '#374151',
        textTransform: 'uppercase',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    logoContainer: {
        width: 50,
        alignItems: 'center',
    },
    logo: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    nameContainer: {
        flex: 2,
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    symbol: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 2,
    },
    priceContainer: {
        flex: 1.5,
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    percentageContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    percentage: {
        fontSize: 13,
        fontWeight: '700',
    },
});
