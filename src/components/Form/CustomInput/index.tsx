import { Flex, Input, InputNumber, InputRef, Typography } from "antd";
import React from "react";
import styles from "./CustomInput.module.scss";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { IErrors } from "../../../store/formSlice";

type TCustomInputProps = {
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  value?: string;
  inputWidth?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onChangeNumber?: (value: string | null) => void;
  type?: string;
  maxLength?: number;
  name: keyof IErrors;
};

const CustomInput = React.forwardRef((props: TCustomInputProps, ref) => {
  const {
    value,
    label,
    placeholder,
    isRequired,
    inputWidth,
    onChange,
    type = "text",
    onChangeNumber,
    maxLength,
    name,
  } = props;
  const { Text } = Typography;
  const errors = useSelector((state: RootState) => state.form.errors);

  const starStyle: React.CSSProperties = {
    color: "red",
  };

  const labelStyle: React.CSSProperties = {
    whiteSpace: "nowrap",
  };

  const inputStyle: React.CSSProperties = {
    width: inputWidth,
  };

  const infoStyle: React.CSSProperties = {
    marginTop: "6px",
  };

  const errorStyle: React.CSSProperties = {
    color: "red",
  };

  return (
    <Flex gap="small">
      <Flex gap="small" style={infoStyle}>
        {isRequired && <Text style={starStyle}>*</Text>}
        {label && <Text style={labelStyle}>{label}: </Text>}
      </Flex>
      {["currency"].includes(type || "") ? (
        <Flex vertical>
          <InputNumber
            placeholder={placeholder}
            value={value}
            style={inputStyle}
            onChange={onChangeNumber}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            controls={false}
            ref={ref as React.LegacyRef<HTMLInputElement>}
            name={name}
          />
          {errors?.[name] && <Text style={errorStyle}>{errors?.[name]}</Text>}
        </Flex>
      ) : (
        <Flex vertical>
          <Input
            placeholder={placeholder}
            value={value}
            style={inputStyle}
            onChange={onChange}
            type={type}
            maxLength={maxLength}
            className={styles.input}
            ref={ref as React.LegacyRef<InputRef>}
            name={name}
          />
          {errors?.[name] && <Text style={errorStyle}>{errors?.[name]}</Text>}
        </Flex>
      )}
    </Flex>
  );
});

export default CustomInput;
