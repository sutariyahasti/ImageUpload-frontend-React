import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OptVerification({ formData, image, closeDialog, isDialogOpen }) {
  const history = useNavigate();
  console.log(formData, "fromdata");
  const [formotpData, setFormotpData] = useState({});

  useEffect(() => {
    setFormotpData({ ...formData });
  }, [formData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormotpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleotpSubmit = async () => {
    const formDataToSend = new FormData();

    formDataToSend.append("image", image); // Assuming 'image' is the file you want to upload
    formDataToSend.append("name", formotpData.name);
    formDataToSend.append("email", formotpData.email);
    formDataToSend.append("password", formotpData.password);
    formDataToSend.append("phone", formotpData.phone);
    formDataToSend.append("address", formotpData.address);
    formDataToSend.append("otp", formotpData.otp);

    console.log(formDataToSend, "formDataToSend-----");
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.status === 201) {
        // Handle success
        history("/data");
        alert("Login successful");
      } else {
        // Handle other status codes
        alert("An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors or other exceptions
      alert("An error occurred");
    }
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle variant="h4" align="center" gutterBottom>
          OTP verification
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="enter your otp"
              name="otp"
              type="text"
              id="otp"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={formotpData.otp}
              onChange={handleInputChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={() => {
              handleotpSubmit();
            }}
          >
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OptVerification;
