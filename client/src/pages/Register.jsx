import { Form, Input, Button, Card, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.api";
import { useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

const { Title } = Typography;

const Register = () => {
    const { token } = useAuth();
  
  const navigate = useNavigate();
    useEffect(() => {
      if (token) {
        navigate("/dashboard/folders");
      }
    }, [token, navigate]);

  const onFinish = async (values) => {
    try {
      await registerUser(values);
      message.success("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      message.error(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <Card style={{ width: 380 }}>
        <Title level={3}>Register</Title>

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

          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Register;