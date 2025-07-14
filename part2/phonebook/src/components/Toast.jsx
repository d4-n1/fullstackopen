const Toast = (props) => {
  if (props.message === null) {
    return null
  }

  return <div className="toast">{props.message}</div>
}

export default Toast