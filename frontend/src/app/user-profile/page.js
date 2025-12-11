"use client";
import {
  Grid,
  GridItem,
  Container,
  Tabs,
  Card,
  Box,
  Heading,
  Text,
  Button,
  Input,
  CloseButton,
  Dialog,
  Portal
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { CgUserlane } from "react-icons/cg";
import NavBar from "../../components/NavBar";
import { useRouter } from "next/navigation";
import axios from 'axios';

export default function UserProfile() {
  const BASE_API_URL = "http://127.0.0.1:8000/users/";

  const router = useRouter();

  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleLogOut = () => {
    localStorage.clear();
    router.push("/login");
    alert("You have been logged out!");
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedId = localStorage.getItem("id");
    const storedGroup = localStorage.getItem("group");
    const accessToken = localStorage.getItem("accessToken");

    // If no token, redirect to login
    if (!accessToken) {
      router.push("/login");
      return;
    }

    // Update state
    setUsername(storedUsername || "");
    setId(storedId || "");
    setGroup(storedGroup || "");

    const getUserDetails = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}${storedId}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Used for debugging purposes
        console.log("response", response.data);

        // Set the user first name
        setFirstName(response.data.first_name);

        // Set the user last name
        setLastName(response.data.last_name);

        // Set the user email
        setEmail(response.data.email);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    getUserDetails();

  }, [router]);

  const saveChanges = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.patch(`${BASE_API_URL}${id}/`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      alert("Successfully Saved Profile Changes!")
    } catch (error) {
      alert("Failed to Save Profile Changes!!");
    }
  }

  const updatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    try {
      await axios.patch(
        `${BASE_API_URL}${id}/`,
        {
          current_password: currentPassword,
          password1: newPassword,
          password2: confirmPassword,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      alert("Successfully Changed Password!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.current_password || error.response?.data?.password || "Failed to Update Password!");
    }
  };

  return (
    <>
      <Container>
        <NavBar />

        <Tabs.Root defaultValue="info" orientation="vertical" variant="subtle">
          <Grid templateColumns="repeat(4,1fr)" gap="30px" p="30px">
            {/* triggers */}
            <GridItem colSpan={1}>
              <Card.Root
                w="100%"
                p="30px"
                alignItems="center"
                gap="2px"
                flexDirection="column"
              >
                <Box
                  borderRadius="70px"
                  bg="blue.700"
                  w="120px"
                  p="30px"
                  marginBottom="8px"
                >
                  <CgUserlane size="60px" color="white" />
                </Box>

                <Heading>Hello, {username}!</Heading>

                <Text fontSize="md" color="fg.muted">

                  {email}
                </Text>

                <Text fontSize="sm" color="fg.muted">
                  {group}
                </Text>

                {/* Log Out Button */}

                <Dialog.Root role="alertdialog">
                  <Dialog.Trigger asChild>
                    <Button
                      variant="outline" 
                      bg="blue.700" 
                      color="white"
                      mt="10px"
                      width="180px"
                    >
                      Log Out
                    </Button>
                  </Dialog.Trigger>
                  <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content>
                        <Dialog.Header>
                          <Dialog.Title>Are you sure?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                          <p>
                            You will be logged out. Are you sure?
                          </p>
                        </Dialog.Body>
                        <Dialog.Footer>
                          <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                          </Dialog.ActionTrigger>
                          <Button variant="outline" bg="blue.700" color="white" onClick={handleLogOut}>Log Out</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                          <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Portal>
                </Dialog.Root>

                <Box
                  borderTopWidth="1px"
                  width="100%"
                  marginTop="40px"
                  paddingTop="20px"
                >
                  <Tabs.List width="100%">
                    <Tabs.Trigger value="info" width="100%">
                      Personal Info
                    </Tabs.Trigger>

                    <Tabs.Trigger value="security" width="100%">
                      Password & Security
                    </Tabs.Trigger>
                  </Tabs.List>
                </Box>
              </Card.Root>
            </GridItem>

            {/* RIGHT COLUMN — content */}
            <GridItem colSpan={3}>
              <Card.Root p="30px">
                <Tabs.Content value="info">
                  <Heading size="2xl">Personal Info</Heading>

                  <Box
                    mt="20px"
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                  >
                    <Box>
                      <Text fontWeight="bold" mb="4px">
                        First Name
                      </Text>
                      <Input
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="bold" mb="4px">
                        Last Name
                      </Text>
                      <Input
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="bold" mb="4px">
                        Email
                      </Text>
                      <Input
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Box>

                    <Button variant="outline" bg="blue.700" color="white" mt="10px" width="150px" onClick={saveChanges}>
                      Save Changes
                    </Button>
                  </Box>
                </Tabs.Content>

                <Tabs.Content value="security">
                  <Heading size="2xl">Password & Security</Heading>

                  <Box
                    mt="20px"
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                  >
                    <Box>
                      <Text fontWeight="bold" mb="4px">
                        Current Password
                      </Text>
                      <PasswordInput
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="bold" mb="4px">
                        New Password
                      </Text>
                      <PasswordInput
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="bold" mb="4px">
                        Confirm New Password
                      </Text>
                      <PasswordInput
                        placeholder="Re-enter new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Box>

                    <Button variant="outline" bg="blue.700" color="white"mt="10px" width="180px" onClick={updatePassword}>
                      Update Password
                    </Button>
                  </Box>
                </Tabs.Content>
              </Card.Root>
            </GridItem>
          </Grid>
        </Tabs.Root>
      </Container>
    </>
  );
}
