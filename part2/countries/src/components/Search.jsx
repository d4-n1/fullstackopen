const Search = ({ value, onChange }) => {
  return (
    <>
      <label>
        find countries <input type="text" name="findCountries" value={value} onChange={onChange}></input>
      </label>
    </>
  )
}

export default Search