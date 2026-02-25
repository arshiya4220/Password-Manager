import { useState } from "react";
import {
  Card,
  Slider,
  Checkbox,
  Button,
  Input,
  Space,
  message,
} from "antd";
import { CopyOutlined, ReloadOutlined } from "@ant-design/icons";
import { generatePassword } from "../api/generator.api";

const Generator = () => {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");

  const onGenerate = async () => {
    try {
      const res = await generatePassword({
        length,
        ...options,
      });
      setPassword(res.password);
    } catch {
      message.error("Failed to generate password");
    }
  };

  const onCopy = async () => {
    await navigator.clipboard.writeText(password);
    message.success("Password copied");
  };

  return (
    <Card title="Password Generator" style={{ maxWidth: 500 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div>
          <strong>Length: {length}</strong>
          <Slider min={6} max={32} value={length} onChange={setLength} />
        </div>

        <Checkbox
          checked={options.uppercase}
          onChange={(e) =>
            setOptions({ ...options, uppercase: e.target.checked })
          }
        >
          Uppercase (A-Z)
        </Checkbox>

        <Checkbox
          checked={options.lowercase}
          onChange={(e) =>
            setOptions({ ...options, lowercase: e.target.checked })
          }
        >
          Lowercase (a-z)
        </Checkbox>

        <Checkbox
          checked={options.numbers}
          onChange={(e) =>
            setOptions({ ...options, numbers: e.target.checked })
          }
        >
          Numbers (0-9)
        </Checkbox>

        <Checkbox
          checked={options.symbols}
          onChange={(e) =>
            setOptions({ ...options, symbols: e.target.checked })
          }
        >
          Symbols (!@#$)
        </Checkbox>

        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={onGenerate}
        >
          Generate
        </Button>

        <Input.Password
          value={password}
          readOnly
          addonAfter={
            <CopyOutlined onClick={onCopy} style={{ cursor: "pointer" }} />
          }
        />
      </Space>
    </Card>
  );
};

export default Generator;