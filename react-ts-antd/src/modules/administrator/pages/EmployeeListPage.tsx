import { Button, Popconfirm, Space, Tag, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import type { PaginationProps } from 'antd';
import { useAppMessage } from '../../../stores/useAppMessage';
import type { Employee } from '../types/employee';
import { fetchEmployees, deleteEmployee, updateEmployee, createEmployee } from '../services/employee.service';
import EmployeeAdd from '../components/EmployeeAdd';
import EmployeeEdit from '../components/EmployeeEdit';
import EmployeeTable from '../components/EmployeeTable';
import dayjs from 'dayjs';

const EmployeeListPage = () => {
    const [params] = useSearchParams();
    const page = params.get('page');
    const size = params.get('size');
    const int_page = page ? parseInt(page) : 0; // Backend bắt đầu từ 0
    const int_size = size ? parseInt(size) : 4;

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [editFormVisible, setEditFormVisible] = React.useState(false);
    const [createFormVisible, setCreateFormVisible] = React.useState(false);

    const [updateForm] = Form.useForm();
    const [createForm] = Form.useForm();
    const { sendMessage } = useAppMessage();

    const msgSuccess = (msg: string) => {
        sendMessage({
            msg,
            type: 'success',
        });
    };

    const msgError = (msg: string) => {
        sendMessage({
            msg,
            type: 'error',
        });
    };

    //=========================== PHÂN TRANG =================================//
    const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
        // pageNumber từ Ant Design bắt đầu từ 1, nhưng backend cần 0-based
        const backendPage = pageNumber - 1;
        const newUrl = `/administrators/employees?page=${backendPage}&size=${pageSize}`;
        navigate(newUrl, { replace: true });
    };

    //=========================== FETCH DELETE =================================//
    const deleteMutation = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: (_, deletedId) => {
            msgSuccess('Xóa Employee thành công !');
            // Optimistic update: xóa item khỏi cache mà không refetch
            queryClient.setQueryData(['employees', int_page], (oldData: unknown) => {
                if (!oldData || typeof oldData !== 'object') return oldData;
                const data = oldData as { data: Employee[]; pagination: { totalElements: number; [key: string]: unknown } };
                return {
                    ...data,
                    data: data.data.filter((employee: Employee) => employee.id !== deletedId),
                    pagination: {
                        ...data.pagination,
                        totalElements: data.pagination.totalElements - 1
                    }
                };
            });
        },
        onError: (err) => {
            console.log('Xóa có lỗi !', err);
            msgError('Xóa Employee không thành công !');
        },
    });

    // Hàm refresh dữ liệu
    const handleRefresh = () => {
        queryClient.invalidateQueries({ queryKey: ['employees', int_page] });
        msgSuccess('Đã refresh dữ liệu !');
    };

    //=========================== FETCH UPDATE =================================//
    const updateMutation = useMutation({
        mutationFn: updateEmployee,
        onSuccess: () => {
            msgSuccess('Cập nhật thành công !');
            // Invalidate tất cả các trang employees để đảm bảo data đồng bộ
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            setEditFormVisible(false);
        },
        onError: (err) => {
            console.log('Cập nhật có lỗi !', err);
            msgError('Cập nhật không thành công !');
            setEditFormVisible(false);
        },
    });

    const onUpdateFinish = (values: Employee) => {
        console.log('onUpdateFinish', values);
        updateMutation.mutate(values);
    };

    const onUpdateFinishFailed = (errors: unknown) => {
        console.log('🐣', errors);
    };

    //=========================== FETCH THÊM MỚI =================================//
    const addMutation = useMutation({
        mutationFn: createEmployee,
        onSuccess: (data) => {
            console.log('addMutation onSuccess', data);
            setCreateFormVisible(false);
            msgSuccess('Thêm mới thành công !');
            // Invalidate tất cả các trang employees để đảm bảo data đồng bộ
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            createForm.resetFields();
        },
        onError: (err) => {
            console.log('Thêm mới có lỗi !', err);
            msgError('Thêm mới có lỗi !');
        },
    });

    const onAddFinish = (values: Record<string, unknown>) => {
        addMutation.mutate(values as Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>);
    };

    const onAddFinishFailed = (errors: unknown) => {
        console.log('🐣', errors);
    };

    //=========================== FETCH LẤY DANH SÁCH =================================//
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['employees', int_page],
        queryFn: () => fetchEmployees(int_page, int_size),
    });

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const columns: ColumnsType<Employee> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60,
            responsive: ['md'],
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text) => <a>{text}</a>,
            width: 150,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 200,
            responsive: ['lg'],
            ellipsis: true,
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: (text) => new Date(text).toLocaleDateString('vi-VN'),
            width: 120,
            responsive: ['md'],
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) => (
                <Tag color={gender === 'MALE' ? 'blue' : gender === 'FEMALE' ? 'pink' : 'default'}>
                    {gender}
                </Tag>
            ),
            width: 100,
            responsive: ['md'],
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 130,
            responsive: ['lg'],
        },
        {
            title: 'Status',
            dataIndex: 'active',
            key: 'active',
            render: (active) => (
                <Tag color={active ? 'green' : 'red'}>
                    {active ? 'Active' : 'Inactive'}
                </Tag>
            ),
            width: 100,
            responsive: ['md'],
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleDateString('vi-VN'),
            width: 120,
            responsive: ['xl'],
        },
        {
            title: 'Action',
            key: 'action',
            width: 120,
            fixed: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="dashed"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => {
                            console.log('EDIT clicked', record);
                            console.log('Current editFormVisible:', editFormVisible);
                            // Reset form trước khi set giá trị mới
                            updateForm.resetFields();
                            // Set giá trị cho form
                            updateForm.setFieldsValue({
                                ...record,
                                dateOfBirth: record.dateOfBirth ? dayjs(record.dateOfBirth) : undefined,
                            });
                            console.log('Setting editFormVisible to true');
                            setEditFormVisible(true);
                        }}
                    />
                    <Popconfirm
                        title="Are you sure to delete?"
                        onConfirm={() => {
                            console.log('DELETE', record);
                            deleteMutation.mutate(record.id);
                        }}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onCancel={() => { }}
                        okText="Đồng ý"
                        okType="danger"
                        cancelText="Đóng"
                    >
                        <Button danger type="dashed" size="small" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <EmployeeTable
                data={data?.data}
                loading={isLoading}
                columns={columns}
                page={int_page}
                total={data?.pagination?.totalElements || 0}
                onPageChange={onChange}
                onAddClick={() => setCreateFormVisible(true)}
                onRefresh={handleRefresh}
            />
            <EmployeeEdit
                visible={editFormVisible}
                onOk={() => updateForm.submit()}
                onCancel={() => setEditFormVisible(false)}
                form={updateForm}
                onFinish={onUpdateFinish}
                onFinishFailed={onUpdateFinishFailed}
            />

            <EmployeeAdd
                visible={createFormVisible}
                onOk={() => createForm.submit()}
                onCancel={() => {
                    setCreateFormVisible(false);
                    createForm.resetFields();
                }}
                form={createForm}
                onFinish={onAddFinish}
                onFinishFailed={onAddFinishFailed}
            />
        </div>
    );
};

export default EmployeeListPage;
