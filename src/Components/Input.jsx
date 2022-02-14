const Input = ({value, onChange, type, label}) => {
    return <div className="input-container">
        <input required className="input" type={type} value={value} onChange={(e) => onChange(e.target.value)} />
        <label className="input-label" htmlFor={label}>{label}</label>
        
    </div>
}

export default Input