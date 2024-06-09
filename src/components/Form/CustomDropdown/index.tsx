import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Flex, Typography } from "antd";
import React from "react";
import { MenuInfo } from "../../../../node_modules/rc-menu/es/interface.d";
import { IErrors } from "../../../store/formSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

type TCustomDropdownProps = {
  options: { label: string; key: string }[];
  onClick?: (e: MenuInfo) => void;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  value: { key: string; label: string };
  dropdownWidth?: string;
  name: keyof IErrors;
};

const CustomDropdown = (props: TCustomDropdownProps) => {
  const {
    options,
    onClick,
    value,
    label,
    placeholder,
    isRequired,
    dropdownWidth,
    name,
  } = props;
  const errors = useSelector((state: RootState) => state.form.errors);
  const { Text } = Typography;
  const dropdownStyle: React.CSSProperties = {
    backgroundColor: "white",
    color: "black",
    fontSize: "16px",
    padding: "4px 8px",
    borderRadius: "8px",
    minWidth: "100px",
    minHeight: "34px",
    width: dropdownWidth,
  };

  const labelStyle: React.CSSProperties = {
    whiteSpace: "nowrap",
  };

  const placeholderStyle: React.CSSProperties = {
    color: "#D3D3D3",
    alignContent: "center",
    display: "flex",
  };

  const starStyle: React.CSSProperties = {
    color: "red",
  };

  const errorStyle: React.CSSProperties = {
    color: "red",
  };

  const infoStyle: React.CSSProperties = {
    marginTop: "6px",
  };

  return (
    <Flex gap="small">
      <Flex gap="small" style={infoStyle}>
        {isRequired && <Text style={starStyle}>*</Text>}
        {label && <Text style={labelStyle}>{label}: </Text>}
      </Flex>
      <Flex vertical>
        <Dropdown menu={{ items: options, onClick }} trigger={["click"]}>
          <Flex justify="space-between" style={dropdownStyle} align="center">
            {value.label || <Text style={placeholderStyle}>{placeholder}</Text>}
            <DownOutlined />
          </Flex>
        </Dropdown>
        {errors?.[name] && <Text style={errorStyle}>{errors?.[name]}</Text>}
      </Flex>
    </Flex>
  );
};

export default CustomDropdown;
