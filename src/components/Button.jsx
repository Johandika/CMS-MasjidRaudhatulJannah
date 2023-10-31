import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";

const App = () => (
  <Upload>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
);
export default App;
