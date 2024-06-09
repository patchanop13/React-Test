import { Button, Flex, Typography } from "antd";
import React from "react";
import styles from "./ShapeButton.module.scss";
import classNames from "classnames";

type TShapeButtonProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  label?: string;
  onClick?: () => void;
  buttonClassName?: string;
};

const ShapeButton = (props: TShapeButtonProps) => {
  const { children, style, label, onClick, buttonClassName } = props;
  const { Paragraph } = Typography;

  const buttonStyle: React.CSSProperties = {
    minHeight: "150px",
    minWidth: "300px",
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    ...(style ? style : {}),
  };

  const labelStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "-20px",
    left: "0",
    right: "0",
    marginLeft: "auto",
    marginRight: "auto",
    width: "fit-content",
    backgroundColor: "var(--color-green)",
    color: "white",
    padding: "0px 12px",
    borderRadius: "8px",
  };

  const wrapperStyle: React.CSSProperties = {
    position: "relative",
  };

  return (
    <Flex style={wrapperStyle}>
      <Button
        style={buttonStyle}
        rootClassName={classNames(styles.button, buttonClassName)}
        onClick={onClick}
      >
        {children}
      </Button>
      {label && <Paragraph style={labelStyle}>{label}</Paragraph>}
    </Flex>
  );
};

export default ShapeButton;
