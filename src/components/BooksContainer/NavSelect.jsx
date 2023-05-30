function NavSelect(props){
    return (
        <div className="select-container">
            <div>{props.title}</div>
            <select value={props.selectValue} onChange={(event)=>{
                props.setSelectValue(event.target.value)
                props.changeState(event.target.value)
            }}>
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