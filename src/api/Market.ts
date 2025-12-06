const API_URL = 'https://api.coingecko.com/api/v3';

export const getCoins = async () => {
    try {
        const response = await fetch(`${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false`,
            { method: 'GET' }
        );
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return await response.json();
    } catch (error) {
        console.error('Error en getCoins:', error);
        throw error;
    }
};
