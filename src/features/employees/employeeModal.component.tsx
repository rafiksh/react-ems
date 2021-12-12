import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "react-i18next";
import { Avatar, Form, Input, Row, Space } from "antd";
import { usePromiseTracker } from "react-promise-tracker";

import { RootState } from "&store/store";
import { formatPhone } from "&utils/format";
import { employeesActions } from "./employees.slice";
import { LinkButton, PrimaryButton } from "&styled/button/button.styled";
import { H2 } from "&styled/typography/typography.styled";
import { RegularModal } from "&styled/modal/modal.styled";
import { InputText } from "&styled/input/input.styled";
import { CountryCodeSelect } from "&styled/select/select.styled";

import styles from "./employees.module.css";

type ReduxProps = ConnectedProps<typeof connector>;

const EmployeeModalComponent = (props: ReduxProps) => {
  const { t } = useTranslation(["employees", "common"]); // Make sure namespace is added to locales
  const { promiseInProgress } = usePromiseTracker();

  const [form] = Form.useForm();
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const {
    isModalVisible,
    setModalVisible,
    initialValues,
    addEmployee,
    updateEmployee,
    resetFormValues,
  } = props;

  const { id } = initialValues;

  useEffect(() => {
    if (isModalVisible) form.resetFields();
  }, [form, isModalVisible]);

  const onFinish = async (values: typeof initialValues) => {
    id
      ? await updateEmployee({
          id,
          photoURL: avatars[selectedAvatar].url,
          ...values,
        })
      : await addEmployee({ photoURL: avatars[selectedAvatar].url, ...values });
    onClose();
  };

  const onClose = () => {
    resetFormValues();
    setModalVisible(false);
  };

  const avatars = [
    { key: 0, url: "https://randomuser.me/api/portraits/women/36.jpg" },
    { key: 1, url: "https://randomuser.me/api/portraits/women/16.jpg" },
    { key: 2, url: "https://randomuser.me/api/portraits/women/67.jpg" },
    { key: 3, url: "https://randomuser.me/api/portraits/men/28.jpg" },
    { key: 4, url: "https://randomuser.me/api/portraits/men/13.jpg" },
    { key: 5, url: "https://randomuser.me/api/portraits/men/52.jpg" },
  ];

  return (
    <RegularModal visible={isModalVisible}>
      <Form
        form={form}
        name="employee"
        layout="vertical"
        requiredMark={"optional"}
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <H2>{id ? t("EMPLOYEE_ID", { id }) : t("ADD_EMPLOYEE")}</H2>
        <Row justify="space-between">
          <Form.Item
            name="firstName"
            label={t("FIRST_NAME")}
            rules={[
              {
                required: true,
                message: t("common:REQUIRED_ERROR_MESSAGE", {
                  fieldName: t("FIRST_NAME").toLowerCase(),
                }),
              },
            ]}
          >
            <InputText
              maxLength={20}
              placeholder={t("FIRST_NAME_PLACEHOLDER")}
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            label={t("LAST_NAME")}
            rules={[
              {
                required: true,
                message: t("common:REQUIRED_ERROR_MESSAGE", {
                  fieldName: t("LAST_NAME").toLowerCase(),
                }),
              },
            ]}
          >
            <InputText placeholder={t("LAST_NAME_PLACEHOLDER")} />
          </Form.Item>
        </Row>
        <Form.Item
          name="email"
          label={t("EMAIL")}
          rules={[
            {
              required: true,
              message: t("common:REQUIRED_ERROR_MESSAGE", {
                fieldName: t("common:EMAIL_LABEL").toLowerCase(),
              }),
            },
            {
              type: "email",
              message: t("common:INVALID_ERROR_MESSAGE", {
                fieldName: t("common:EMAIL_LABEL").toLowerCase(),
              }),
            },
          ]}
        >
          <InputText
            autoComplete="email"
            placeholder={t("EMAIL_PLACEHOLDER")}
          />
        </Form.Item>
        <Form.Item label={t("PHONE_NUMBER")} required>
          <Input.Group compact>
            <Form.Item name={["phone", "code"]} noStyle>
              <CountryCodeSelect style={{ width: "35%" }} />
            </Form.Item>
            <Form.Item
              name={["phone", "number"]}
              validateFirst
              normalize={formatPhone}
              noStyle
              rules={[
                {
                  required: true,
                  message: t("common:REQUIRED_ERROR_MESSAGE", {
                    fieldName: t("common:MOBILE_LABEL").toLowerCase(),
                  }),
                },
                {
                  pattern: /^(\+91-|\+91|0)?\d{6,15}$/,
                  message: t("common:INVALID_ERROR_MESSAGE", {
                    fieldName: t("common:MOBILE_LABEL").toLowerCase(),
                  }),
                },
              ]}
            >
              <InputText
                maxLength={12}
                minLength={4}
                autoComplete="phone"
                placeholder={t("PHONE_NUMBER_PLACEHOLDER")}
                style={{ width: "65%" }}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item name="jobTitle" label={t("JOB_TITLE")}>
          <InputText maxLength={32} placeholder={t("JOB_TITLE_PLACEHOLDER")} />
        </Form.Item>

        <Row justify="space-between" align="middle">
          {avatars.map(({ key, url }) => (
            <LinkButton key={key} onClick={() => setSelectedAvatar(key)}>
              <Avatar
                src={url}
                className={key === selectedAvatar ? styles.selectedAvatar : ""}
              />
            </LinkButton>
          ))}
        </Row>
        <Form.Item>
          <Row justify="center" className={styles.modalFooter}>
            <Space direction="horizontal" size="middle" align="center">
              <LinkButton onClick={onClose}>{t("common:CANCEL")}</LinkButton>
              <PrimaryButton
                loading={promiseInProgress}
                size="middle"
                block={false}
                htmlType="submit"
              >
                {t(id ? "common:UPDATE" : "common:CREATE")}
              </PrimaryButton>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </RegularModal>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  isModalVisible: state.employees.isModalVisible,
  initialValues: state.employees.initialValues,
});

const mapDispatchToProps = {
  addEmployee: employeesActions.addEmployee,
  updateEmployee: employeesActions.updateEmployee,
  resetFormValues: employeesActions.resetFormValues,
  setModalVisible: employeesActions.setModalVisible,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const EmployeeModalComponentRedux = connector(EmployeeModalComponent);

export { EmployeeModalComponentRedux as EmployeeModalComponent };
