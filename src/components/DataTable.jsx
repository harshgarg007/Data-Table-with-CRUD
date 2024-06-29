import { useState, useEffect, useRef } from "react";

function DataTable() {
  const [formData, setFormData] = useState({ name: "", gender: "", age: "" });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", gender: "", age: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const lastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = lastItem - itemsPerPage;

  let filteredItems = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredData = filteredItems.slice(indexOfFirstItem, lastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddClick = () => {
    if (formData.name && formData.gender && formData.age) {
      const newItem = {
        id: Date.now(),
        name: formData.name,
        gender: formData.gender,
        age: formData.age,
      };
      setData([...data, newItem]);
      setFormData({ name: "", gender: "", age: "" });
    }
  };

  const handleDelete = (id) => {
    const updateList = data.filter((item) => item.id !== id);
    setData(updateList);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (item) => {
    setEditId(item.id);
    setEditValues({ name: item.name, gender: item.gender, age: item.age });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSaveClick = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, ...editValues } : item
    );
    setData(updatedData);
    setEditId(null);
  };

  return (
    <div className="container">
      <div className="add-container">
        <div className="info-container">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
          />
        </div>
        <button className="add" onClick={handleAddClick}>
          ADD
        </button>
      </div>

      <div className="search-table-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>
                  {editId === item.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editValues.name}
                      onChange={handleEditChange}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editId === item.id ? (
                    <input
                      type="text"
                      name="gender"
                      value={editValues.gender}
                      onChange={handleEditChange}
                    />
                  ) : (
                    item.gender
                  )}
                </td>
                <td>
                  {editId === item.id ? (
                    <input
                      type="number"
                      name="age"
                      value={editValues.age}
                      onChange={handleEditChange}
                    />
                  ) : (
                    item.age
                  )}
                </td>
                <td className="actions">
                  {editId === item.id ? (
                    <button onClick={() => handleSaveClick(item.id)}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick(item)}>Edit</button>
                  )}
                  <button className="delete" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              style={{
                backgroundColor: currentPage === index + 1 && "lightgreen",
              }}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DataTable;
