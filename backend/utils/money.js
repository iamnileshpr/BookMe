export const PLATFORM_FEE_RATE = 0.1;
export const calculatePlatformSplit = (amount) => {
    const safeAmount = Number.isFinite(amount) ? Math.max(0, Math.round(amount)) : 0;
    const platformFeeAmount = Math.round(safeAmount * PLATFORM_FEE_RATE);
    const providerPayout = Math.max(0, safeAmount - platformFeeAmount);

    return {
        platformFeeAmount,
        providerPayout,
    };
}

export const formatMinorMoney = (amount, currency = 'inr') => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency.toUpperCase()

    }).format((amount || 0) / 100);
}