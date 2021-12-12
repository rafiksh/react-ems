import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Avatar, Dropdown, Menu, Row, Space } from "antd";
import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/lib/table";
import { usePromiseTracker } from "react-promise-tracker";

import { EmployeeRecord } from "./index.d";
import { RootState } from "&store/store";
import { employeesActions } from "./employees.slice";
import { EmployeeModalComponent } from "./employeeModal.component";
import { TableComponent, TableWrapper } from "&styled/table/table.styled";
import { H2 } from "&styled/typography/typography.styled";
import { PrimaryButton } from "&styled/button/button.styled";
import { TableSearchBar } from "&styled/search/search.styled";
import { filterEmployeesOnChange } from "&utils/filter";

import { ReactComponent as Options } from "&assets/images/ic-more.svg";
import { ReactComponent as Plus } from "&assets/images/ic-plus-white.svg";

type ReduxProps = ConnectedProps<typeof connector>;

const EmployeesComponent = (props: ReduxProps) => {
  const { t } = useTranslation(["employees", "common"]); // Make sure namespace is added to locales
  const { promiseInProgress } = usePromiseTracker();

  const { data, getEmployees, deleteEmployee, setFormValues, setModalVisible } =
    props;

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  useEffect(() => {
    setSearchableList(data);
  }, [data]);

  const [searchableList, setSearchableList] = useState(data);

  const columns: ColumnsType<EmployeeRecord> = [
    {
      title: t("PHOTO").toUpperCase(),
      dataIndex: "photoURL",
      key: "photoURL",
      align: "center",
    },
    {
      title: t("FIRST_NAME").toUpperCase(),
      dataIndex: "firstName",
      key: "firstName",
      align: "left",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: t("LAST_NAME").toUpperCase(),
      dataIndex: "lastName",
      key: "lastName",
      align: "left",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: t("JOB_TITLE").toUpperCase(),
      dataIndex: "jobTitle",
      key: "jobTitle",
      align: "left",
      sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
    },
    {
      title: t("PHONE_NUMBER").toUpperCase(),
      dataIndex: "phone",
      key: "phone",
      align: "right",
      sorter: (
        { phone: { code: c1, number: n1 } },
        { phone: { code: c2, number: n2 } }
      ) => `${c1}${n1}`.localeCompare(`${c2}${n2}`),
    },

    {
      title: "",
      dataIndex: "options",
      key: "options",
      align: "center",
      width: 50,
    },
  ];

  const onEditEmployee = (id: string) => {
    setFormValues(data?.find((item) => item.id === id));
    setModalVisible(true);
  };

  const renderOptions = (id: string) => (
    <Menu>
      <Menu.Item key="1" onClick={() => onEditEmployee(id)}>
        {t("common:EDIT")}
      </Menu.Item>
      <Menu.Item key="2" onClick={() => deleteEmployee(id)}>
        {t("common:DELETE")}
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row justify="space-between">
        <H2>{t("common:EMPLOYEES")}</H2>
        <Space align="start">
          <PrimaryButton
            disabled={promiseInProgress}
            size="middle"
            block={false}
            icon={<Plus />}
            onClick={() => setModalVisible(true)}
          >
            {t("common:NEW")}
          </PrimaryButton>
        </Space>
      </Row>
      <TableWrapper>
        <TableSearchBar
          disabled={data?.length <= 0}
          onChange={(e) => setSearchableList(filterEmployeesOnChange(e, data))}
          placeholder={t("SEARCH_PLACEHOLDER")}
        />
        <TableComponent
          loading={promiseInProgress}
          columns={columns}
          dataSource={searchableList?.map(
            ({ id, phone: { code, number }, photoURL, ...item }) => ({
              key: id,
              phone: `${code}${number}`,
              ...item,
              photoURL: <Avatar src={photoURL} />,
              options: (
                <Dropdown overlay={renderOptions(id)}>
                  <Options />
                </Dropdown>
              ),
            })
          )}
        />
      </TableWrapper>
      <EmployeeModalComponent />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  data: state.employees.data,
});

const mapDispatchToProps = {
  getEmployees: employeesActions.getEmployees,

  deleteEmployee: employeesActions.deleteEmployee,
  setFormValues: employeesActions.setFormValues,
  setModalVisible: employeesActions.setModalVisible,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const EmployeesComponentRedux = connector(EmployeesComponent);

export { EmployeesComponentRedux as EmployeesComponent };
