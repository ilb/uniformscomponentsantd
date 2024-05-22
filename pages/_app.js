/* eslint-disable no-unused-vars -- Отключаем eslint no-unused-vars */
import "antd/dist/antd.css";

import { Layout } from "antd";
const { Content } = Layout;

/**
 * @param {Object} root0
 * @param {Component} root0.Component
 * @param {Object} root0.pageProps
 * @returns {JSX.Element}
 */
export default function MyApp({ Component, pageProps }) {
  return (
    <Content style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <Component {...pageProps} />
    </Content>
  );
}
/* eslint-enable no-unused-vars -- Возвращаем eslint no-unused-vars */
