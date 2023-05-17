import "./BooksContainer.scss"
import allGenres from "../../allGenres"
import NavSelect from "./NavSelect"
function BooksContainer(){
    return (
        <div className="books-container">
            <div className="books-nav">
                <NavSelect title="ז'אנר" options={allGenres}/>
                <NavSelect title="סדר לפי"
                    options={[
                        "שם הספר א-ת","שם הספר ת-א","סופר א-ת","סופר ת-א",
                        "ז'אנר א-ת","ז'אנר ת-א"
                    ]}
                />
                
            </div>
            <div>
                <img/>
            </div>
        </div>
    )
}
export default BooksContainer