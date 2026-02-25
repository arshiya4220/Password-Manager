// src/pages/Login.jsx
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import { useAuth } from "../auth/AuthContext";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

const { Title, Text } = Typography;

const Login = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/dashboard/folders");
    }
  }, [token, navigate]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const data = await loginUser(values);
      login(data.token);
      navigate("/dashboard/folders");
    } catch (err) {
      message.error(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader tip="Logging in..." />;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 350 }}>
        <Title level={3}>Login</Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password required" }]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            Login
          </Button>
        </Form>

        <Text>
          Don’t have an account? <Link to="/register">Register</Link>
        </Text>
      </Card>
    </div>
  );
};

export default Login;