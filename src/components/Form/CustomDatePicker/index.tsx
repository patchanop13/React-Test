import { DatePicker, Flex, Typography } from "antd";
import * as dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { IErrors } from "../../../store/formSlice";

type TCustomDatePickerProps = {
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  value?: dayjs.Dayjs;
  onChange?: (date: dayjs.Dayjs, dateString: string | string[]) => void;
  format?: string;
  name: keyof IErrors;
};

const CustomDatePicker = (props: TCustomDatePickerProps) => {
  const { value, label, placeholder, isRequired, onChange, format, name } =
    props;
  const { Text } = Typography;
  const errors = useSelector((state: RootState) => state.form.errors);

  const starStyle: React.CSSProperties = {
    color: "red",
  };

  const labelStyle: React.CSSProperties = {
    whiteSpace: "nowrap",
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
        <DatePicker
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          format={format}
          name={name}
        />
        {errors?.[name] && <Text style={errorStyle}>{errors?.[name]}</Text>}
      </Flex>
    </Flex>
  );
};

export default CustomDatePicker;
