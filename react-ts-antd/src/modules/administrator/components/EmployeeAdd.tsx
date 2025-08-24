import { Modal, Form, Input, Select, DatePicker, Switch } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { Employee } from '../types/employee';
import React from 'react';
import type { FormProps } from 'antd';
import dayjs from 'dayjs';

type EmployeeAddProps = {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    form: FormInstance;
    onFinish: (values: Record<string, unknown>) => void;
    onFinishFailed: FormProps<Record<string, unknown>>['onFinishFailed'];
};

const EmployeeAdd: React.FC<EmployeeAddProps> = ({
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
        } as Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>;
        onFinish(formattedValues);
    };

    return (
        <Modal
            title="Create new Employee"
            width="60%"
            open={visible}
            onOk={onOk}
            okText="Lưu thông tin"
            onCancel={onCancel}
        >
            <Form
                form={form}
                name="add-employee-form"
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
                        { required: true, message: 'Please enter password' },
                        { min: 6, message: 'Password must be at least 6 characters' }
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Active"
                    name="active"
                    valuePropName="checked"
                    initialValue={true}
                >
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EmployeeAdd;
