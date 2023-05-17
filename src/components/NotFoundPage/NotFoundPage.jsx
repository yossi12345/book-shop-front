import "./NotFoundPage.scss"
import bookWorm from "../../images/book-worm.png"
function NotFoundPage(){
    return (
        <div className="not-found-element">
            <div className="not-found-title">
                <h1>nothing to see here</h1>
            </div>
            <img src={bookWorm} alt="book worn in an apple"/>
        </div>
    )
}
export default NotFoundPage