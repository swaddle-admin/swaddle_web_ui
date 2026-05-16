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
import { pageStyle, cardStyle, inputStyle } from "./SignUpPage.styles";
import logoCircle from "../assets/logo-circle.svg";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    await signUp(email, password);
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
              Sign Up
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

            <Text size="xs" c="rgba(255,255,255,0.7)">
              Make it strong — at least 8 characters!
            </Text>

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
              onClick={handleSignUp}
              mt="sm"
            >
              Sign Me Up
            </Button>

            <Text size="sm" c="rgba(255,255,255,0.8)" ta="center">
              Already part of the family?{" "}
              <Anchor component={Link} to="/login" c="white" fw={700}>
                Sign In
              </Anchor>
            </Text>
          </Stack>
        </Box>
      </motion.div>
    </Box>
  );
};

export default SignUpPage;
