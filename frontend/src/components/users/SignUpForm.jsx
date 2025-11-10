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

export default function SignUpForm() {
  const [error, setError] = useState(""); // store error message
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !firstName || !lastName || !email || !password) {
      setError("Please fill in all fields!");
      return;
    }

    try {
      // const res = await axios.post("/api/register", { username, firstName, lastName, email, password });
      setError(""); // clear error on success
      alert("Registration successful!");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Center h="100vh">
      <Box
        p="30px"
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
          Sign Up
        </Heading>

        <Fieldset.Root size="lg" invalid={error !== ""}>
          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Username</Field.Label>
              <Input
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                borderColor="gray.300"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>First Name</Field.Label>
              <Input
                name="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                borderColor="gray.300"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Last Name</Field.Label>
              <Input
                name="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                borderColor="gray.300"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                borderColor="gray.300"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Password</Field.Label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                borderColor="gray.300"
              />
            </Field.Root>

            <Button
              marginTop="20px"
              colorPalette="blue"
              onClick={handleRegister}
            >
              Sign Up
            </Button>

            {error && <Fieldset.ErrorText mt={3}>{error}</Fieldset.ErrorText>}

            <Box fontSize="sm">
              <Link variant="underline" href="#">
                Already have an account? Log in!
              </Link>
            </Box>
          </Fieldset.Content>
        </Fieldset.Root>
      </Box>
    </Center>
  );
}
