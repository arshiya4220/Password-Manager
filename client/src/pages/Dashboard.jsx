import { Layout, Menu, Button } from "antd";
import {
  FolderOutlined,
  StarOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
  KeyOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const { Sider, Header, Content } = Layout;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="dark">
        <div style={{ color: "white", padding: 16, fontWeight: "bold" }}>
          Password Manager
        </div>

        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => navigate(key)}
          items={[
            { key: "/dashboard/folders", icon: <FolderOutlined />, label: "Folders" },
            { key: "/dashboard/favorites", icon: <StarOutlined />, label: "Favorites" },
            { key: "/dashboard/recent", icon: <ClockCircleOutlined />, label: "Recent" },
            { key: "/dashboard/security", icon: <SafetyOutlined />, label: "Security" },
            { key: "/dashboard/generator", icon: <KeyOutlined />, label: "Generator" },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", textAlign: "right", paddingRight: 20 }}>
          <Button
            icon={<LogoutOutlined />}
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Header>

        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;