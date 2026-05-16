import {
  Box,
  Stack,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { ANIMATION } from "../utils/constants";
import { pageStyle, cardStyle, inputStyle } from "./LoginPage.styles";
import logoCircle from "../assets/logo-circle.svg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(email, password);
    if (!error) navigate("/chat");
  };

  return (
    <Box style={pageStyle}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION.duration.normal }}
        style={{ width: "100%", maxWidth: "340px" }}
      >
        <Stack align="center" mb="xl">
          <img src={logoCircle} alt="Swaddle" width={80} />
        </Stack>

        <Box style={cardStyle}>
          <Stack gap="md">
            <Text fw={700} size="xl" c="white">
              Log In
            </Text>

            <TextInput
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              styles={{ input: inputStyle }}
              leftSection={<span>@</span>}
            />

            <PasswordInput
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              styles={{ input: inputStyle }}
            />

            {error && (
              <Text size="sm" c="red.3">
                {error}
              </Text>
            )}

            <Button
              fullWidth
              radius="xl"
              color="white"
              c="violet"
              loading={isLoading}
              onClick={handleLogin}
              mt="sm"
            >
              Log In
            </Button>

            <Text size="sm" c="rgba(255,255,255,0.8)" ta="center">
              Don't have an account?{" "}
              <Anchor component={Link} to="/signup" c="white" fw={700}>
                Sign Up
              </Anchor>
            </Text>
          </Stack>
        </Box>
      </motion.div>
    </Box>
  );
};

export default LoginPage;
