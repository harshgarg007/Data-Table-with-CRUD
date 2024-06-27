function DataTable() {
  return (
    <div className="container">
      <div className="add-container">
        <div className="info-container">
            {/* name input */}
          <input
            type="text"
            placeholder="Name"
            // value={""}
            onChange={() => {}}
          />
          {/* gender */}
          <input
            type="text"
            placeholder="Gender"
            // value={""}
            onChange={() => {}}
          />
          {/* age */}
          <input
            type="number"
            placeholder="Age"
            // value={""}
            onChange={() => {}}
          />
        </div>

        <button className="add">ADD</button>
      </div>

      {/* search table */}

      <div className="search-table-container">
        {/* search input */}
          {/* gender */}
          <input
            type="text"
            placeholder="Search by name..."
            // value={""}
            onChange={() => {}}
            className="search-input"
          />

          {/* table */}
          <table>
            {/* table header */}
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Action</th>  {/* edit delete action */}
                </tr>
            </thead>

            {/* table body */}
            <tbody>
                <tr>
                    <td>John</td>
                    <td>Male</td>
                    <td>23</td>
                    <td className="actions">
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                    </td>
                </tr>
            </tbody>
            {/* pagination */}
            <div className="pagination"></div>
          </table>
      </div>
    </div>
  );
}

export default DataTable;
