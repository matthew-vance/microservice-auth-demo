import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import useAuth from "./useAuth";

const App = () => {
  const { auth, setToken: setAuth } = useAuth();
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchMessage = async () => {
      if (auth) {
        try {
          const response = await fetch("http://localhost:3001/message", {
            headers: { Authorization: `Bearer ${auth.token}` },
          });

          const data = await response.json();
          setMessage(data.message);
        } catch {
          setMessage(undefined);
          setAuth();
        }
      }
    };

    fetchMessage();
  }, [auth]);

  const handleSuccess = (token: string) => {
    setAuth({ token });
  };

  const handleLogout = () => {
    setAuth();
    setMessage(undefined);
  };

  return (
    <>
      <header>
        <Center>
          <Text fontSize="4xl">Auth Demo</Text>
        </Center>
      </header>
      <main>
        <Flex width="full" align="center" justifyContent="center">
          <Box p={2} my={4}>
            {auth ? (
              <>
                {message && (
                  <Text fontSize="xl" mt={4}>
                    {message}
                  </Text>
                )}
                <Button
                  variant="outline"
                  type="button"
                  width="full"
                  mt={8}
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </>
            ) : (
              <LoginForm onSuccess={handleSuccess} />
            )}
          </Box>
        </Flex>
      </main>
    </>
  );
};

export default App;
