const Filter = (props) => {
  return (
    <div>
      search person: <input value={props.value} onChange={props.onChange}/>
    </div>
)}

export default Filter