function NavSelect(props){
    return (
        <div className="select-container">
            <div>{props.title}</div>
            <select value={props.state[props.fieldStateToChange]} onChange={(event)=>{
                const stateCopy={...props.state}
                stateCopy[props.fieldStateToChange]=event.target.value
                props.setState(stateCopy)
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