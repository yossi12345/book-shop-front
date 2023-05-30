import { ROLE_TYPES } from "../global-constants"
function getActualBookPrice(book,role){
    if (role===ROLE_TYPES.guest||!book.discount||book.discount===0)
        return book.price
    const discountInShekels=(book.price*book.discount)/100
    return book.price-discountInShekels
}
export default getActualBookPrice