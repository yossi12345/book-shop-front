function NavSelect(props){
    return (
        <div className="select-container">
            <div>{props.title}</div>
            <select>
            {
                    props.options.map((option)=>(
                        <option key={Math.random()}>{option}</option>
                    ))
            }
            </select>
        </div>
    )
}
export default NavSelect