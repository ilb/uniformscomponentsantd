import 'antd/dist/antd.css';
import { Layout } from 'antd';
const { Content } = Layout;

export default function MyApp({ Component, pageProps }) {
  return (
    <Content style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Component {...pageProps} />
    </Content>
  );
}
