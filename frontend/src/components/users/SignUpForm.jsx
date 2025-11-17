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

export default function SignUpForm() {
  const [error, setError] = useState(""); // store error message
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  
  const router = useRouter();

  const BASE_API_URL = "http://127.0.0.1:8000/users/";

  async function handleRegister() {
    if (
      !username ||
      !firstName ||
      !lastName ||
      !email ||
      !password1 ||
      !password2
    ) {
      setError("Please fill in all fields!");
      return;
    }

    const signUpFormData = new FormData();

    signUpFormData.append("username", username);
    signUpFormData.append("first_name", firstName);
    signUpFormData.append("last_name", lastName);
    signUpFormData.append("email", email);
    signUpFormData.append("password1", password1);
    signUpFormData.append("password2", password2);

    try {
      console.log("touch me bb");
      await axios.post(BASE_API_URL, {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password1,
        password2,
      });
      console.log("touch me boy");
      setError(""); // clear error on success
      alert("Registration successful!");

      router.push("/login"); 


    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  }

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
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                borderColor="gray.300"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Confirm Password</Field.Label>
              <PasswordInput
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
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
