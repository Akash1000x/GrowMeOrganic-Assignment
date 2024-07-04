import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type FormProps = {
  name: string;
  email: string;
  phoneNumber: string;
};

export default function SignIn() {
  const [value, setValue] = React.useState<FormProps>({ name: "", email: "", phoneNumber: "" });
  const [error, setError] = React.useState<string>("");
  const { authMessage, setIsAuthenticated, setAuthMessage } = useAuth();

  const navigate = useNavigate();

  React.useEffect(() => {
    setError(authMessage);
  }, [authMessage]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.name || !value.email || !value.phoneNumber) {
      setError("Please fill all the fields");
      return;
    } else if (!/^[0-9]{10}$/.test(value.phoneNumber)) {
      setError("Please enter a valid phone number");
      return;
    }
    window.localStorage.setItem("user", JSON.stringify(value));
    setIsAuthenticated(true);
    setAuthMessage("");
    navigate("/");
    setError("");
    setValue({ name: "", email: "", phoneNumber: "" });
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} id="form">
        <Stack direction="column" spacing={3} width={500} position={"relative"}>
          <TextField
            id="name-input"
            type="text"
            label="Full Name"
            name="name"
            variant="outlined"
            value={value.name}
            onChange={(e) => setValue({ ...value, name: e.target.value })}
          />
          <TextField
            id="email-input"
            type="email"
            label="Email"
            name="email"
            variant="outlined"
            value={value.email}
            onChange={(e) => setValue({ ...value, email: e.target.value })}
          />
          <TextField
            id="phoneNumber-input"
            type="tel"
            label="Phone Number"
            name="phoneNumber"
            variant="outlined"
            value={value.phoneNumber}
            onChange={(e) => setValue({ ...value, phoneNumber: e.target.value })}
          />
          <Button variant="contained" type="submit">
            Sign-in
          </Button>
          {!!error && <div id="error">{error}</div>}
        </Stack>
      </form>
    </>
  );
}
