import {
  Button,
  Checkbox,
  Flex,
  InputRef,
  Table,
  TableColumnsType,
  Typography,
} from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../../components/Form/CustomDropdown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  IErrors,
  addUsers,
  changeSelectedAll,
  clearUser,
  deleteRow,
  editUser,
  editUsers,
  selectRow,
  selectEditedUser,
  setDataFromLocalStorage,
  setErrors,
} from "../../store/formSlice";
import CustomInput from "../../components/Form/CustomInput";
import CustomDatePicker from "../../components/Form/CustomDatePicker";
import dayjs from "dayjs";
import CustomRadio from "../../components/Form/CustomRadio";
import { isEmpty, map, size } from "lodash";
import { TableRowSelection } from "antd/es/table/interface";

interface IUserTable {
  key: React.Key;
  name: string;
  gender: string;
  phoneNumber: string;
  nationality: string;
}

const nameTitleList = [
  { key: "mr", label: "นาย" },
  { key: "miss", label: "นางสาว" },
  { key: "mrs", label: "นาง" },
  { key: "not-specified", label: "ไม่ระบุ" },
];

const genderList = [
  { key: "male", label: "ผู้ชาย" },
  { key: "female", label: "ผู้หญิง" },
  { key: "not-specified", label: "ไม่ระบุ" },
];

const nationalityList = [
  { key: "thai", label: "ไทย" },
  { key: "chinese", label: "จีน" },
  { key: "japanese", label: "ญี่ปุ่น" },
];

const phonePrefixList = [
  { key: "64", label: "+64" },
  { key: "66", label: "+66" },
  { key: "213", label: "+213" },
];

const FormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { Text } = Typography;
  const user = useSelector((state: RootState) => state.form.user);
  const users = useSelector((state: RootState) => state.form.users);
  const isSelectedAll = useSelector(
    (state: RootState) => state.form.isSelectedAll
  );
  const selectedRowKeys = useSelector(
    (state: RootState) => state.form.selectedRowKeys
  );
  const dispatch = useDispatch();

  const nationalId1Ref = React.useRef<InputRef | null>(null);
  const nationalId2Ref = React.useRef<InputRef | null>(null);
  const nationalId3Ref = React.useRef<InputRef | null>(null);
  const nationalId4Ref = React.useRef<InputRef | null>(null);
  const nationalId5Ref = React.useRef<InputRef | null>(null);

  const titleStyle: React.CSSProperties = {
    fontSize: "32px",
  };

  const headerStyle: React.CSSProperties = {
    margin: "2px 0",
  };

  const containerStyle: React.CSSProperties = {
    padding: "40px 0",
    maxWidth: "1440px",
    margin: "auto",
  };

  const formStyle: React.CSSProperties = {
    border: "2px solid black",
    borderRadius: "4px",
    padding: "12px 24px",
  };

  const dashPhoneStyle: React.CSSProperties = {
    marginTop: "6px",
  };

  const handleChangeInput = (
    name: string,
    value: string | string[] | { key: string; label: string }
  ) => {
    dispatch(
      editUser({
        name,
        value,
      })
    );
  };

  React.useEffect(() => {
    const localStorageUsers = localStorage.getItem("users");
    const localStorageUser = localStorage.getItem("user");
    const localStorageSelectedRowKeys = localStorage.getItem("selectedRowKeys");
    const localStorageIsSelectedAll = localStorage.getItem("isSelectedAll");
    dispatch(
      setDataFromLocalStorage({
        ...(localStorageUsers && { users: JSON.parse(localStorageUsers) }),
        ...(localStorageUser && { user: JSON.parse(localStorageUser) }),
        ...(localStorageSelectedRowKeys && {
          selectedRowKeys: JSON.parse(localStorageSelectedRowKeys),
        }),
        ...(localStorageIsSelectedAll && {
          isSelectedAll: JSON.parse(localStorageIsSelectedAll),
        }),
      })
    );
  }, []);

  const columns: TableColumnsType<IUserTable> = [
    {
      title: "ชื่อ",
      dataIndex: "name",
      sorter: (a, b) => b.name.localeCompare(a.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "เพศ",
      dataIndex: "gender",
      sorter: (a, b) => b.gender.localeCompare(a.gender),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "หมายเลขโทรศัพท์มือถือ",
      dataIndex: "phoneNumber",
      sorter: (a, b) => b.phoneNumber.localeCompare(a.phoneNumber),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "สัญชาติ",
      dataIndex: "nationality",
      sorter: (a, b) => b.nationality.localeCompare(a.nationality),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "จัดการ",
      dataIndex: "",
      key: "x",
      render: (value) => {
        return (
          <Button onClick={() => dispatch(selectEditedUser({ id: value.key }))}>
            แก้ไข
          </Button>
        );
      },
    },
  ];

  const rowSelection: TableRowSelection<IUserTable> = {
    selectedRowKeys,
    onChange: (data) => dispatch(selectRow(data)),
  };

  const onValidate = ({ callback }: { callback: () => void }) => {
    const errors: IErrors = {};
    if (!user.firstname) errors.firstname = "กรุณากรอกข้อมูล";
    if (!user.lastname) errors.lastname = "กรุณากรอกข้อมูล";
    if (!user.nameTitle.key) errors.nameTitle = "กรุณากรอกข้อมูล";
    if (!user.dateOfBirth) errors.dateOfBirth = "กรุณากรอกข้อมูล";
    if (!user.gender) errors.gender = "กรุณากรอกข้อมูล";
    if (!user.nationality.key) errors.nationality = "กรุณากรอกข้อมูล";
    if (!user.expectedSalary) errors.expectedSalary = "กรุณากรอกข้อมูล";
    if (!user.phonePrefix.key) errors.phonePrefix = "กรุณากรอกข้อมูล";
    if (!user.phoneNumber) errors.phoneNumber = "กรุณากรอกข้อมูล";
    if (isEmpty(errors)) {
      return callback();
    }
    dispatch(setErrors(errors));
  };

  return (
    <Flex vertical>
      <Flex justify="space-between" style={headerStyle}>
        <Text style={titleStyle}>{t("form_table")}</Text>
        <Button onClick={() => navigate("/")}>{t("home_page")}</Button>
      </Flex>
      <Flex gap="40px" style={containerStyle} vertical>
        <Flex vertical gap="20px" style={formStyle}>
          <Flex gap="20px" align="flex-start">
            <CustomDropdown
              isRequired
              options={nameTitleList}
              onClick={(e) =>
                handleChangeInput("nameTitle", {
                  key: e.key,
                  label:
                    nameTitleList?.find((item) => item.key === e.key)?.label ||
                    "",
                })
              }
              value={user.nameTitle}
              placeholder="คำนำหน้า"
              label="คำนำหน้า"
              name="nameTitle"
            />
            <CustomInput
              value={user.firstname}
              label="ชื่อจริง"
              isRequired
              inputWidth="300px"
              onChange={(e) => handleChangeInput("firstname", e.target.value)}
              name="firstname"
            />
            <CustomInput
              value={user.lastname}
              label="นามสกุล"
              isRequired
              inputWidth="300px"
              onChange={(e) => handleChangeInput("lastname", e.target.value)}
              name="lastname"
            />
          </Flex>
          <Flex gap="20px">
            <CustomDatePicker
              label="วันเกิด"
              isRequired
              value={user.dateOfBirth ? dayjs(user.dateOfBirth) : undefined}
              onChange={(_, dateString) =>
                handleChangeInput("dateOfBirth", dateString)
              }
              placeholder="เดือน/วัน/ปี"
              format="MM/DD/YYYY"
              name="dateOfBirth"
            />
            <CustomDropdown
              isRequired
              options={nationalityList}
              onClick={(e) =>
                handleChangeInput("nationality", {
                  key: e.key,
                  label:
                    nationalityList?.find((item) => item.key === e.key)
                      ?.label || "",
                })
              }
              value={user.nationality}
              placeholder="--กรุณาเลือก--"
              label="สัญชาติ"
              dropdownWidth="300px"
              name="nationality"
            />
          </Flex>
          <Flex gap="20px" align="center">
            <CustomInput
              value={user.nationalId1}
              label="เลขบัตรประชาชน"
              inputWidth="50px"
              onChange={(e) => {
                size(e.target.value) === 1 && nationalId2Ref.current?.select();
                handleChangeInput(
                  "nationalId1",
                  e.target.value?.substring(0, 1)
                );
              }}
              name="nationalId1"
              type="number"
              ref={nationalId1Ref}
            />
            <Text>-</Text>
            <CustomInput
              value={user.nationalId2}
              inputWidth="100px"
              onChange={(e) => {
                size(e.target.value) === 0 && nationalId1Ref.current?.focus();
                size(e.target.value) > 3 && nationalId3Ref.current?.select();
                handleChangeInput(
                  "nationalId2",
                  e.target.value?.substring(0, 4)
                );
              }}
              type="number"
              ref={nationalId2Ref}
              name="nationalId2"
            />
            <Text>-</Text>
            <CustomInput
              value={user.nationalId3}
              inputWidth="100px"
              onChange={(e) => {
                size(e.target.value) === 0 && nationalId2Ref.current?.focus();
                size(e.target.value) > 4 && nationalId4Ref.current?.select();
                handleChangeInput(
                  "nationalId3",
                  e.target.value?.substring(0, 5)
                );
              }}
              type="number"
              ref={nationalId3Ref}
              name="nationalId3"
            />
            <Text>-</Text>
            <CustomInput
              value={user.nationalId4}
              inputWidth="70px"
              onChange={(e) => {
                size(e.target.value) === 0 && nationalId3Ref.current?.focus();
                size(e.target.value) > 1 && nationalId5Ref.current?.select();
                handleChangeInput(
                  "nationalId4",
                  e.target.value?.substring(0, 2)
                );
              }}
              type="number"
              ref={nationalId4Ref}
              name="nationalId4"
            />
            <Text>-</Text>
            <CustomInput
              value={user.nationalId5}
              inputWidth="50px"
              onChange={(e) => {
                size(e.target.value) === 0 && nationalId4Ref.current?.focus();
                size(e.target.value) > 0 && nationalId5Ref.current?.blur();
                handleChangeInput(
                  "nationalId5",
                  e.target.value?.substring(0, 1)
                );
              }}
              type="number"
              ref={nationalId5Ref}
              maxLength={1}
              name="nationalId5"
            />
          </Flex>
          <Flex gap="20px" align="center">
            <CustomRadio
              options={genderList}
              value={user.gender}
              isRequired
              label="เพศ"
              onChange={(e) => handleChangeInput("gender", e.target.value)}
              name="gender"
            />
          </Flex>
          <Flex gap="20px">
            <CustomDropdown
              isRequired
              options={phonePrefixList}
              onClick={(e) =>
                handleChangeInput("phonePrefix", {
                  key: e.key,
                  label:
                    phonePrefixList?.find((item) => item.key === e.key)
                      ?.label || "",
                })
              }
              value={user.phonePrefix}
              label="หมายเลขโทรศัพท์มือถือ"
              name="phonePrefix"
            />
            <Text style={dashPhoneStyle}>-</Text>
            <CustomInput
              value={user.phoneNumber}
              inputWidth="250px"
              onChange={(e) => handleChangeInput("phoneNumber", e.target.value)}
              name="phoneNumber"
              type="number"
            />
          </Flex>
          <Flex gap="20px" align="center">
            <CustomInput
              value={user.passportNo}
              label="หนังสือเดินทาง"
              inputWidth="250px"
              onChange={(e) => handleChangeInput("passportNo", e.target.value)}
              name="passportNo"
            />
          </Flex>
          <Flex gap="200px" align="center">
            <CustomInput
              type="currency"
              value={user.expectedSalary}
              label="เงินเดือนที่คาดหวัง"
              isRequired
              inputWidth="215px"
              onChangeNumber={(value) =>
                handleChangeInput("expectedSalary", value || "")
              }
              name="expectedSalary"
            />
            <Flex gap="80px">
              <Button onClick={() => dispatch(clearUser())}>ล้างข้อมูล</Button>
              <Button
                htmlType="submit"
                onClick={() => {
                  onValidate({
                    callback: user?.id
                      ? () => dispatch(editUsers({ id: user.id }))
                      : () => dispatch(addUsers()),
                  });
                }}
              >
                ส่งข้อมูล
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex gap="12px" vertical>
          <Flex gap="12px" align="center">
            <Checkbox
              onChange={() => dispatch(changeSelectedAll())}
              checked={isSelectedAll}
            >
              เลือกทั้งหมด
            </Checkbox>
            <Button onClick={() => dispatch(deleteRow())}>ลบข้อมูล</Button>
          </Flex>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={map(users, (item) => ({
              key: item?.id,
              name: `${item?.firstname} ${item?.lastname}`,
              gender:
                genderList?.find((gender) => gender.key === item?.gender)
                  ?.label || "",
              phoneNumber: `(${item.phonePrefix?.label}) ${item?.phoneNumber}`,
              nationality: item.nationality?.label,
            }))}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FormPage;
