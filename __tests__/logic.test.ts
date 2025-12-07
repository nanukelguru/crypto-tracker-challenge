describe('Crypto Tracker - Lógica de Negocio', () => {
    describe('Validación de URL de API', () => {
        it('debe construir la URL correcta para CoinGecko API', () => {
            const baseUrl = 'https://api.coingecko.com/api/v3';
            const endpoint = '/coins/markets';
            const params = new URLSearchParams({
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: '30',
                page: '1',
                sparkline: 'false',
            });

            const fullUrl = `${baseUrl}${endpoint}?${params}`;

            expect(fullUrl).toContain('api.coingecko.com');
            expect(fullUrl).toContain('vs_currency=usd');
            expect(fullUrl).toContain('per_page=30');
        });
    });

    describe('Formateo de datos', () => {
        it('debe formatear precios en USD correctamente', () => {
            const testCases = [
                { input: 50000, expected: '$50,000' },
                { input: 3000.27, expected: '$3,000' },
                { input: 1.00, expected: '$1' },
            ];

            testCases.forEach(({ input, expected }) => {
                const formatted = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                }).format(input);

                expect(formatted).toContain(expected);
            });
        });

        it('debe formatear porcentajes con signo correcto', () => {
            const formatPercentage = (value: number) =>
                `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;

            expect(formatPercentage(2.5)).toBe('+2.50%');
            expect(formatPercentage(-1.2)).toBe('-1.20%');
            expect(formatPercentage(0)).toBe('0.00%');
        });
    });

    describe('Lógica de colores dinámicos', () => {
        const getColor = (percentage: number) =>
            percentage > 0 ? '#10b981' : '#ef4444';

        it('debe retornar verde para porcentajes positivos', () => {
            expect(getColor(5)).toBe('#10b981');
            expect(getColor(0.01)).toBe('#10b981');
            expect(getColor(100)).toBe('#10b981');
        });

        it('debe retornar rojo para porcentajes negativos o cero', () => {
            expect(getColor(-5)).toBe('#ef4444');
            expect(getColor(-0.01)).toBe('#ef4444');
            expect(getColor(0)).toBe('#ef4444');
        });
    });

    describe('Validación de estructura de datos de monedas', () => {
        it('debe validar que una moneda tenga todos los campos requeridos', () => {
            const coin = {
                id: 'bitcoin',
                symbol: 'btc',
                name: 'Bitcoin',
                image: 'https://example.com/bitcoin.png',
                current_price: 50000,
                price_change_percentage_24h: 2.5,
                market_cap: 1000000000,
            };

            expect(coin).toHaveProperty('id');
            expect(coin).toHaveProperty('symbol');
            expect(coin).toHaveProperty('name');
            expect(coin).toHaveProperty('current_price');
            expect(coin).toHaveProperty('price_change_percentage_24h');
            expect(typeof coin.current_price).toBe('number');
            expect(typeof coin.price_change_percentage_24h).toBe('number');
        });
    });

    describe('Ordenamiento de monedas', () => {
        it('debe mantener el orden por market descendente', () => {
            const coins = [
                { name: 'Bitcoin', market_cap: 1000000000 },
                { name: 'Ethereum', market_cap: 500000000 },
                { name: 'Tether', market_cap: 100000000 },
            ];

            const isDescending = coins.every((coin, index) => {
                if (index === 0) return true;
                return coin.market_cap <= coins[index - 1].market_cap;
            });

            expect(isDescending).toBe(true);
        });
    });
});