import {AiOutlineSearch} from "react-icons/ai"
function BooksSearcher(){
    return (
        <form className="search-books-container">
            <input type="search"/>
            <button type="submit">
                <AiOutlineSearch size={40} color="#000060"/>
            </button>
        </form>
    )
}
export default BooksSearcher