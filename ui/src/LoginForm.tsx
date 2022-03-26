import {
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
} from "@chakra-ui/react";
import { useState } from "react";
import { AuthValue } from "./useAuth";

export interface LoginFormProps {
  onSuccess: (token: string) => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const { token } = await response.json();

      onSuccess(token);
    } catch (error) {}

    setIsLoading(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          size="lg"
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </FormControl>
      <FormControl isRequired mt={6}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          size="lg"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </FormControl>
      <Button variant="outline" type="submit" width="full" mt={4}>
        {isLoading ? (
          <CircularProgress isIndeterminate size="24px" color="teal" />
        ) : (
          "Log In"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
