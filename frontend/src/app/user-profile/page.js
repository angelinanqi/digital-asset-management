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
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { CgUserlane } from "react-icons/cg";
import NavBar from "../../components/NavBar";

export default function UserProfile() {
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

                <Heading>Hello, Username or Name!</Heading>

                <Text fontSize="md" color="fg.muted">
                  useremail@gmail.com
                </Text>

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
                        defaultValue="Your first name"
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="bold" mb="4px">
                        Last Name
                      </Text>
                      <Input
                        placeholder="Enter your last name"
                        defaultValue="Your last name"
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="bold" mb="4px">
                        Email
                      </Text>
                      <Input
                        placeholder="Your email"
                        defaultValue="useremail@gmail.com"
                      />
                    </Box>

                    <Button colorPalette="blue" mt="10px" width="150px">
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
                      <PasswordInput placeholder="Enter current password" />
                    </Box>

                    <Box>
                      <Text fontWeight="bold" mb="4px">
                        New Password
                      </Text>
                      <PasswordInput placeholder="Enter new password" />
                    </Box>

                    <Box>
                      <Text fontWeight="bold" mb="4px">
                        Confirm New Password
                      </Text>
                      <PasswordInput placeholder="Re-enter new password" />
                    </Box>

                    <Button colorPalette="blue" mt="10px" width="180px">
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
