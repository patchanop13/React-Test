import { Dropdown, Flex, Layout, Space, Typography } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { MenuInfo } from "rc-menu/lib/interface";
import i18n from "../../i18n";

const layoutStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundImage: "linear-gradient(to right, #90ee90, #ffa500)",
  padding: "6px 6px",
};

const dropdownStyle: React.CSSProperties = {
  backgroundColor: "white",
  color: "black",
  fontSize: "16px",
  padding: "4px 8px",
  borderRadius: "8px",
};

type TLanguageList = {
  label: string;
  key: string;
};

const languageList: TLanguageList[] = [
  {
    label: "TH",
    key: "th",
  },
  {
    label: "EN",
    key: "en",
  },
];

const LayoutComponent = () => {
  const [lang, setLang] = React.useState(i18n.language);
  const handleChangeLang = (e: MenuInfo) => {
    setLang(e.key);
    i18n.changeLanguage(e.key);
  };

  return (
    <Layout style={layoutStyle}>
      <Flex vertical gap="middle">
        <Flex justify="flex-end">
          <Dropdown
            menu={{ items: languageList, onClick: handleChangeLang }}
            trigger={["click"]}
          >
            <Typography.Link style={dropdownStyle}>
              <Space>
                {languageList?.find((item) => item?.key === lang)?.label}
                <DownOutlined />
              </Space>
            </Typography.Link>
          </Dropdown>
        </Flex>
      </Flex>
      <Outlet />
    </Layout>
  );
};

export default LayoutComponent;
