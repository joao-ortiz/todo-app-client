const CheckBox = ({value, onCheck, label}) => {
    return <div onClick={onCheck} className="checkbox-container">
        
        <input type="checkbox" checked={value} name={label}  />
        <label htmlFor={label}>{label}</label>
    </div>
}

export default CheckBox