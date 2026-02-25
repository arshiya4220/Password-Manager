import { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Progress } from "antd";
import { SafetyOutlined } from "@ant-design/icons";
import { getSecurityHealth } from "../api/security.api";

const Security = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getSecurityHealth().then(setData);
  }, []);

  if (!data) return null;

  const reusedPercent = Math.round(
    (data.reused / data.total) * 100 || 0
  );
  const weakPercent = Math.round(
    (data.weak / data.total) * 100 || 0
  );

  return (
    <>
      <Card
        title="Security Health"
        icon={<SafetyOutlined />}
        style={{ marginBottom: 16 }}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Statistic title="Total Passwords" value={data.total} />
          </Col>
          <Col span={8}>
            <Statistic
              title="Reused Passwords"
              value={data.reused}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Weak Passwords"
              value={data.weak}
            />
          </Col>
        </Row>
      </Card>

      <Card title="Risk Indicators">
        <p>Reused Password Risk</p>
        <Progress
          percent={reusedPercent}
          status={reusedPercent > 50 ? "exception" : "active"}
        />

        <p>Weak Password Risk</p>
        <Progress
          percent={weakPercent}
          status={weakPercent > 50 ? "exception" : "active"}
        />
      </Card>
    </>
  );
};

export default Security;