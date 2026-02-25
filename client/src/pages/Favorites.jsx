import { useEffect, useState } from "react";
import { Table, Button, Space, Modal } from "antd";
import {
  EyeOutlined,
  StarFilled,
} from "@ant-design/icons";
import { getFavorites, decryptPassword, toggleFavorite } from "../api/vault.api";

const Favorites = () => {
  const [data, setData] = useState([]);

  const loadFavorites = async () => {
    const res = await getFavorites();
    setData(res);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const onDecrypt = async (record) => {
    const res = await decryptPassword(record._id);
    Modal.info({
      title: "Password",
      content: res.password,
    });
  };

  const onUnfavorite = async (record) => {
    await toggleFavorite(record._id);
    loadFavorites();
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
            icon={<StarFilled />}
            onClick={() => onUnfavorite(record)}
          />
        </Space>
      ),
    },
  ];

  return <Table rowKey="_id" columns={columns} dataSource={data} />;
};

export default Favorites;