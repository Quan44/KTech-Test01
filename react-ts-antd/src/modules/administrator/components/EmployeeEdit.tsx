import { Modal, Form, Input, Select, DatePicker, Switch } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { Employee } from '../types/employee';
import React from 'react';
import dayjs from 'dayjs';

type EmployeeEditProps = {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: FormInstance;
  onFinish: (values: Employee) => void;
  onFinishFailed: (errors: unknown) => void;
};

const EmployeeEdit: React.FC<EmployeeEditProps> = ({
  visible,
  onOk,
  onCancel,
  form,
  onFinish,
  onFinishFailed,
}) => {
  const handleFinish = (values: Record<string, unknown>) => {
    const formattedValues = {
      ...values,
      dateOfBirth: values.dateOfBirth && typeof values.dateOfBirth === 'object' && 'format' in values.dateOfBirth
        ? dayjs(values.dateOfBirth as unknown as string).format('YYYY-MM-DD')
        : values.dateOfBirth,
    } as Employee;
    onFinish(formattedValues);
  };

  return (
    <Modal
      title="Edit Employee"
      width="60%"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form
        form={form}
        name="edit-employee-form"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={handleFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: 'Please enter full name' }]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter valid email' }
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[{ required: true, message: 'Please select date of birth' }]}
          hasFeedback
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select gender' }]}
          hasFeedback
        >
          <Select
            options={[
              { value: 'MALE', label: 'Male' },
              { value: 'FEMALE', label: 'Female' },
              { value: 'OTHER', label: 'Other' }
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: 'Please enter phone number' },
            { pattern: /^[0-9]{10,11}$/, message: 'Please enter valid phone number' }
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="hashPassword"
          rules={[
            { min: 6, message: 'Password must be at least 6 characters' }
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Leave empty to keep current password" />
        </Form.Item>

        <Form.Item
          label="Active"
          name="active"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item hidden label="Id" name="id" hasFeedback>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeEdit;
