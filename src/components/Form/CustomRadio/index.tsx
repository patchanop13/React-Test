import { Flex, Radio, RadioChangeEvent, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { IErrors } from "../../../store/formSlice";

type TCustomRadioProps = {
  options: { label: string; key: string }[];
  onChange?: (e: RadioChangeEvent) => void;
  label?: string;
  isRequired?: boolean;
  value: string;
  dropdownWidth?: string;
  name: keyof IErrors;
};

const CustomRadio = (props: TCustomRadioProps) => {
  const { options, onChange, value, label, isRequired, name } = props;
  const { Text } = Typography;
  const errors = useSelector((state: RootState) => state.form.errors);

  const labelStyle: React.CSSProperties = {
    whiteSpace: "nowrap",
  };

  const starStyle: React.CSSProperties = {
    color: "red",
  };

  const errorStyle: React.CSSProperties = {
    color: "red",
  };

  return (
    <Flex gap="small">
      {isRequired && <Text style={starStyle}>*</Text>}
      {label && <Text style={labelStyle}>{label}: </Text>}
      <Flex vertical>
        <Radio.Group onChange={onChange} value={value} name={name}>
          {options?.map((option, index) => (
            <Radio key={index} value={option.key}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
        {errors?.[name] && <Text style={errorStyle}>{errors?.[name]}</Text>}
      </Flex>
    </Flex>
  );
};

export default CustomRadio;
