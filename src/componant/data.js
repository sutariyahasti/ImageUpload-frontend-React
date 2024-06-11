import axios from "axios";
import React, { useEffect, useState } from "react";
import { Typography, Button, TextField } from "@mui/material";
// import EditBox from "../edit/[id]/page";
// import Signup from "../pages/page";
// import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// import EditIcon from "@mui/icons-material/Edit";
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.css";

function Data() {
  const [items, setItems] = useState([]);
  const [activePage, setActivePage] = useState(0);

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
  };
  const totalItem = items.length;
  const itemsPerPage = 12;
  const start = activePage * itemsPerPage;
  const end = start + itemsPerPage;
  console.log("items", items);

  useEffect(() => {
    // Fetch data from the Node.js API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        setItems(response.data); // Assuming the response data is an array of items
      } catch (error) {
        console.error("Error fetching items:", error);
        // Handle error, display message, etc.
      }
    };

    fetchData();
  }, []); // Empty
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <>
      <div>
        <div
          style={{
            paddingTop: "50px",
            paddingLeft: "150px",
          }}
        >
          <Typography variant="h4" align="left" color="primary" gutterBottom>
            Users
          </Typography>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
            marginRight: "100px",
          }}
        >
          <TextField
            margin="normal"
            variant="outlined"
            required
            align="right"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ margin: 2 }}
          >
            Next
          </Button>
        </div>

        <div
          style={{
            marginTop: "5px",
            marginRight: "100px",
            marginLeft: "100px",
            padding: "15px",
            textAlign: "center",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ccc",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1.5px solid #eee",
                    padding: "15px",
                    backgroundColor: "#D3D3D3",
                  }}
                >
                  No
                </th>
                <th
                  style={{
                    border: "1.5px solid #eee",
                    padding: "15px",
                    backgroundColor: "#D3D3D3",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    border: "1.5px solid #eee",
                    padding: "15px",
                    backgroundColor: "#D3D3D3",
                  }}
                >
                  Profile Picture
                </th>
                <th
                  style={{
                    border: "1.5px solid #eee",
                    padding: "15px",
                    backgroundColor: "#D3D3D3",
                  }}
                >
                  Phone
                </th>
                <th
                  style={{
                    border: "1.5px solid #eee",
                    padding: "15px",
                    backgroundColor: "#D3D3D3",
                  }}
                >
                  address
                </th>
                <th
                  style={{
                    border: "1.5px solid #eee",
                    padding: "15px",
                    backgroundColor: "#D3D3D3",
                  }}
                >
                  date
                </th>
              </tr>
            </thead>
            <tbody>
              {items.slice(start, end).map((item) => (
                <tr key={item._id}>
                  <td style={{ border: "1.5px solid #eee", padding: "15px" }}>
                    {item.name}
                  </td>
                  <td style={{ border: "1px solid #eee", padding: "15px" }}>
                    {item.email}
                  </td>
                  <td style={{ border: "1px solid #eee", padding: "15px" }}>
                    {item.image && (
                      <img
                        src={`http://localhost:5000/${item.image}`}
                        alt={item.name}
                        style={{ width: "30px", height: "30px" }}
                      />
                    )}
                  </td>
                  <td style={{ border: "1px solid #eee", padding: "15px" }}>
                    {item.phone}
                  </td>
                  <td style={{ border: "1px solid #eee", padding: "15px" }}>
                    {item.address}
                  </td>
                  <td style={{ border: "1px solid #eee", padding: "15px" }}>
                    {item.lastLogInDate ? formatDate(item.lastLogInDate) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
            marginRight: "100px",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ margin: 2 }}
          >
            Next
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={totalItem}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
    </>
  );
}

export default Data;
