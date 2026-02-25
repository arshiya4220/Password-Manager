import { Spin } from "antd";

const Loader = ({ tip = "Loading..." }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <Spin size="large" tip={tip} />
    </div>
  );
};

export default Loader;