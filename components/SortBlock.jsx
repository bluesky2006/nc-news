import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SortBlock() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const regex = /topics/;

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  function handleSortChange(event) {
    setSearchParams({ sort_by: event.target.value, order });
  }

  function handleOrder() {
    const newOrder = order === "desc" ? "asc" : "desc";
    setSearchParams({ sort_by: sortBy, order: newOrder });
  }

  return (
    <div className="sort-section">
      <div className="drop-down-container">
        <div className="drop-down">
          <label htmlFor="sort-by-select">Sort by</label>
          <select
            id="sort-by-select"
            onChange={handleSortChange}
            value={sortBy}
          >
            <option value="created_at">Date</option>
            <option value="title">Title</option>
            {regex.test(pathname) ? null : <option value="topic">Topic</option>}
            <option value="author">User</option>
            <option value="votes">Votes</option>
          </select>
        </div>
        <div className="sort-div">
          <p>{order.charAt(0).toUpperCase() + order.slice(1)}</p>
          <div
            className="sort-arrow-span material-symbols-outlined"
            onClick={handleOrder}
            title={`Toggle order (currently ${order})`}
          >
            swap_vert
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortBlock;
