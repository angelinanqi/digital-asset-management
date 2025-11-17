"use client";
import {
  Box,
  Field,
  Fieldset,
  Input,
  Center,
  Heading,
  Button,
  Link,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginForm() {
  const [error, setError] = useState(""); //store error msg
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const BASE_API_URL = "http://127.0.0.1:8000/api/token/";

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields!");
      return;
    }

    try {
      // send a POST request to the endpoint
      // returns access, refresh tokens with id and group
      const response = await axios.post(BASE_API_URL, {
        username: username,
        password: password,
      });
      setError(""); // clear error on success
      alert("Login successful!");

      // store the access, refresh tokens with id and group using localStorage
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("group", response.data.group);

      const group = response.data.group;

      if (group === "Viewer") {
        router.push("/editor/home");
      } else if (group === "Editor") {
        router.push("/editor/home");
      } else {
        window.location.href = "http://127.0.0.1:8000/admin/";
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Center h="100vh">
      <Box
        p={10}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        w="lg"
        textAlign="center"
      >
        <Heading
          size="2xl"
          color="blue.700"
          fontWeight="bold"
          marginBottom="50px"
        >
          Digital Asset Management System
        </Heading>

        <Fieldset.Root size="lg" invalid={error !== ""}>
          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Username</Field.Label>
              <Input
                name="username"
                type="username"
                borderColor="gray.300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>Password</Field.Label>
              <PasswordInput
                borderColor="gray.300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field.Root>

            <Button marginTop="30px" colorPalette="blue" onClick={handleLogin}>
              Login
            </Button>

            {/* Error message */}
            {error && <Fieldset.ErrorText>{error}</Fieldset.ErrorText>}

            <Box fontSize="sm">
              <Link variant="underline" href="#">
                Don’t have an account? Sign up!
              </Link>
            </Box>
          </Fieldset.Content>
        </Fieldset.Root>
      </Box>
    </Center>
  );
}
