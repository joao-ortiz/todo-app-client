import ReactDOM from 'react-dom';

const Modal = (props) => {
    const node = document.getElementById('root')
    node.classList.add("modal")
    return ReactDOM.createPortal(
        props.children,
        node
    )
}

export default Modal