

const displayCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    
    return formatter.format(num);
};

export default displayCurrency