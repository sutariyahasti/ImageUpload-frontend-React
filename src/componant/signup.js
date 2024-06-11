import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OptVerification from "./opt-verification";

const Signup = () => {
  const history = useNavigate();
  const [image, setImage] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [allvalue, setAllvalue] = useState({});

  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("image", image);

      const response = await axios.post(
        "http://localhost:5000/api/send-otp",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Item added:", formDataToSend);
      console.log("Item:", response);

      if (response.status === 200) {
        setIsDialogOpen(true);
      } else {
        alert("email is alredy exist");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      // Handle error, display message, etc.
    }
    console.log(image, "img===");
    const images = image && image.name;
    const newData = {
      ...formData,
      image: images,
    };
    setAllvalue(newData);
  };
  console.log("allvalue", allvalue);
  return (
    <div className="bg-blue1">
      <Container maxWidth="sm" sx={{ padding: 3, marginTop: 10 }}>
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up===
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <TextField
              label="Name"
              name="name"
              type="text"
              id="Name"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              id="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              label="Password"
              name="password"
              id="Password"
              fullWidth
              margin="normal"
              type="password"
              variant="outlined"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
            <TextField
              label="phone"
              name="phone"
              type="number"
              id="phone"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={formData.phone}
              onChange={handleInputChange}
            />
            <TextField
              label="address"
              name="address"
              type="text"
              id="address"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={formData.address}
              onChange={handleInputChange}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Sign Up
            </Button>
          </form>
          <OptVerification
            formData={allvalue}
            image={image}
            closeDialog={closeDialog}
            isDialogOpen={isDialogOpen}
          />

          {/* {/ Already have an account link /} */}
          <div>
            already have an account?{" "}
            <Link style={{ color: "blue" }} href="/login">
              Login
            </Link>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default Signup;