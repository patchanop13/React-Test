import { Flex, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { t } = useTranslation();
  const { Paragraph } = Typography;
  const navigate = useNavigate();
  const layoutStyle: React.CSSProperties = {
    height: "100%",
  };
  const cardStyle: React.CSSProperties = {
    padding: "18px 24px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    minWidth: "300px",
    gap: "24px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const menus = [
    {
      title: t("test", { number: "1" }),
      description: t("layout_style"),
      url: "/layout",
    },
    {
      title: t("test", { number: "2" }),
      description: t("connect_api"),
      url: "/",
    },
    {
      title: t("test", { number: "3" }),
      description: t("form_table"),
      url: "/form",
    },
  ];

  return (
    <Flex justify="center" align="center" gap="middle" style={layoutStyle}>
      {menus?.map((item, index) => (
        <Flex key={index} style={cardStyle} onClick={() => navigate(item.url)}>
          <Paragraph strong>{item.title}</Paragraph>
          <Paragraph>{item.description}</Paragraph>
        </Flex>
      ))}
    </Flex>
  );
};

export default HomePage;
