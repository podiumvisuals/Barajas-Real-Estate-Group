export default function SearchBar({ note }: { note?: string }) {
  return (
    <div className="searchbar">
      <div className="searchbar-inner">
        <div className="field">
          <label>Location</label>
          <input type="text" placeholder="City, ZIP, or neighborhood" />
        </div>
        <div className="field">
          <label>Price Range</label>
          <select>
            <option>Any price</option>
            <option>$400K – $800K</option>
            <option>$800K – $1.5M</option>
            <option>$1.5M+</option>
          </select>
        </div>
        <div className="field">
          <label>Beds</label>
          <select>
            <option>Any</option>
            <option>2+</option>
            <option>3+</option>
            <option>4+</option>
            <option>5+</option>
          </select>
        </div>
        <div className="go">Search Homes →</div>
      </div>
      {note && <div className="idx-note">{note}</div>}
    </div>
  )
}
