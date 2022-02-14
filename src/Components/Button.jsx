const Button = ({value, action}) => {
    return <button className="button" onClick={action} >{value}</button>
}

export default Button