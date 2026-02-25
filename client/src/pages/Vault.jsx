import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Table, Button, Modal, Form, Input, Space } from "antd";
import {
  EyeOutlined,
  StarOutlined,
  StarFilled,
  PlusOutlined,
} from "@ant-design/icons";
import {
  getVault,
  addPassword,
  decryptPassword,
  toggleFavorite,
} from "../api/vault.api";

const Vault = () => {
  const { id: folderId } = useParams();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const loadVault = useCallback(async () => {
    const res = await getVault(folderId);
    setData(res);
  }, [folderId]);
  useEffect(() => {
    loadVault();
  }, [loadVault]);

  const onAdd = async (values) => {
    await addPassword({ ...values, folderId });
    setOpen(false);
    loadVault();
  };

  const onDecrypt = async (record) => {
    const res = await decryptPassword(record._id);
    Modal.info({
      title: "Password",
      content: res.password,
    });
  };

  const onFavorite = async (record) => {
    await toggleFavorite(record._id);
    loadVault();
  };

  const columns = [
    { title: "Website", dataIndex: "website" },
    { title: "Username", dataIndex: "username" },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => onDecrypt(record)} />
          <Button
            icon={record.isFavorite ? <StarFilled /> : <StarOutlined />}
            onClick={() => onFavorite(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
        style={{ marginBottom: 16 }}
      >
        Add Password
      </Button>

      <Table rowKey="_id" columns={columns} dataSource={data} />

      <Modal
        title="Add Password"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={onAdd}>
          <Form.Item name="website" label="Website" required>
            <Input />
          </Form.Item>
          <Form.Item name="username" label="Username" required>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" required>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default Vault;
