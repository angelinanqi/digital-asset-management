"use client";
import {
  Box,
  Field,
  Fieldset,
  Input,
  Center,
  Heading,
  Button,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState("");//store error msg
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields!");
      return;
    }

    try {
      // const res = await axios.post("/api/login", { email, password });
      setError(""); // clear error on success
      alert("Login successful!");
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
              <Field.Label>E-mail</Field.Label>
              <Input
                name="email"
                type="email"
                borderColor="gray.300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <Button
              marginTop="30px"
              colorPalette="blue"
              onClick={handleLogin}
            >
              Login
            </Button>

            {/* Error message */}
            {error && <Fieldset.ErrorText>{error}</Fieldset.ErrorText>}
          </Fieldset.Content>
        </Fieldset.Root>
      </Box>
    </Center>
  );
}
