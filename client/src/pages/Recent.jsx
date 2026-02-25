import { useEffect, useState } from "react";
import { Table, Button, Space, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { getRecent, decryptPassword } from "../api/vault.api";

const Recent = () => {
  const [data, setData] = useState([]);

  const loadRecent = async () => {
    const res = await getRecent();
    setData(res);
  };

  useEffect(() => {
    loadRecent();
  }, []);

  const onDecrypt = async (record) => {
    const res = await decryptPassword(record._id);
    Modal.info({
      title: "Password",
      content: res.password,
    });
  };

  const columns = [
    { title: "Website", dataIndex: "website" },
    { title: "Username", dataIndex: "username" },
    {
      title: "Last Accessed",
      dataIndex: "lastAccessedAt",
      render: (date) =>
        date ? new Date(date).toLocaleString() : "—",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => onDecrypt(record)} />
        </Space>
      ),
    },
  ];

  return <Table rowKey="_id" columns={columns} dataSource={data} />;
};

export default Recent;