import { useState, useEffect, useCallback } from 'react';
import { getCoins } from '../api/Market';

export interface Coin {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
}

export const useCoins = () => {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchCoins = useCallback(async () => {
        try {
            setLoading(true);
            const coinsData = await getCoins();
            setCoins(coinsData);
        } catch (error) {
            setError('Error al obtener las monedas');
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchCoins();
        const interval = setInterval(fetchCoins, 60000);

        return () => clearInterval(interval);

    }, [fetchCoins]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchCoins();
    }, [fetchCoins]);

    return {
        coins, loading, error, refreshing, onRefresh
    };
};