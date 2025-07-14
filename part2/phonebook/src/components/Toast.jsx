const Toast = (props) => {
  if (props.message === null) {
    return null
  }

  // return <div className="toast {props.type}">{props.message}</div>
  return <div className={`toast toast-${props.type}`}>{props.message}</div>
}

export default Toast