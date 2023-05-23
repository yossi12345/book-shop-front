function getActualBookPrice(book,role){
    if (role==="guest"||!book.discount||book.discount===0)
        return book.price
    const discountInShekels=(book.price*book.discount)/100
    return book.price-discountInShekels
}
export default getActualBookPrice