import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type FormProps = {
  name: string;
  email: string;
  phone_number: string;
};

export default function SignIn() {
  const [value, setValue] = React.useState<FormProps>({ name: "", email: "", phone_number: "" });
  const [error, setError] = React.useState<string>("");
  const { authMessage, setIsAuthenticated, setAuthMessage } = useAuth();

  const navigate = useNavigate();

  React.useEffect(() => {
    setError(authMessage);
  }, [authMessage]);

  const handelFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.name || !value.email || !value.phone_number) {
      setError("Please fill all the filleds");
      return;
    } else if (value.phone_number.length !== 10) {
      setError("Please enter valid phone number");
      return;
    }
    window.localStorage.setItem("user", JSON.stringify(value));
    setIsAuthenticated(true);
    setAuthMessage("");
    navigate("/");
    setError("");
    setValue({ name: "", email: "", phone_number: "" });
  };

  return (
    <>
      <form onSubmit={handelFormSubmit} id="form">
        <Stack direction="column" spacing={3} width={500} position={"relative"}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Full Name"
            variant="outlined"
            value={value.name}
            onErrorCapture={(e) => console.log(e)}
            onChange={(e) => setValue({ ...value, name: e.target.value })}
          />
          <TextField
            id="outlined-basic"
            type="email"
            label="Email"
            variant="outlined"
            value={value.email}
            onChange={(e) => setValue({ ...value, email: e.target.value })}
          />
          <TextField
            id="outlined-basic"
            type="number"
            label="Phone Number"
            variant="outlined"
            value={value.phone_number}
            onChange={(e) => setValue({ ...value, phone_number: e.target.value })}
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
