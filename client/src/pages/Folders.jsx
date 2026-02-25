import { useEffect, useState } from "react";
import { Card, Button, Modal, Form, Input, List } from "antd";
import { createFolder, getFolders } from "../api/folder.api";

const Folders = () => {
  const [folders, setFolders] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadFolders = async () => {
    const data = await getFolders();
    setFolders(data);
  };

  useEffect(() => {
    loadFolders();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    await createFolder(values);
    setLoading(false);
    setOpen(false);
    loadFolders();
  };

  return (
    <Card
      title="Folders"
      extra={<Button onClick={() => setOpen(true)}>Add Folder</Button>}
    >
      <List
        dataSource={folders}
        renderItem={(item) => (
          <List.Item>
            <Card style={{ width: "100%" }}>{item.name}</Card>
          </List.Item>
        )}
      />

      <Modal
        title="Create Folder"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Folder Name"
            name="name"
            rules={[{ required: true, message: "Folder name required" }]}
          >
            <Input />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            Create
          </Button>
        </Form>
      </Modal>
    </Card>
  );
};

export default Folders;