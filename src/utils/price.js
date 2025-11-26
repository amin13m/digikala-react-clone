


export const getDiscountedPrice = (price, discount) =>{
    if(discount === 0 || !discount) return price;
    
    return Math.round(price - (price * discount) / 100);
}