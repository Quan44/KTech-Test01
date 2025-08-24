import { Table, Pagination, Card, Button, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Employee } from '../types/employee';
import React from 'react';

interface EmployeeTableProps {
    data?: Employee[];
    loading: boolean;
    columns: ColumnsType<Employee>;
    page: number;
    total: number;
    onPageChange: (page: number, pageSize: number) => void;
    onAddClick: () => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
    data,
    loading,
    columns,
    page,
    total,
    onPageChange,
    onAddClick,
}) => {
    return (
        <Card
            title="Employee List"
            extra={
                <Button type="primary" onClick={onAddClick}>
                    Thêm mới
                </Button>
            }
        >
            {loading ? (
                <Spin tip="Loading">
                    <div className="content" />
                </Spin>
            ) : (
                <>
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        scroll={{ x: 800 }}
                        size="small"
                    />
                              <div style={{ textAlign: 'right', marginTop: 30 }}>
            <Pagination
              current={page + 1} // Backend trả về 0, 1, 2... nhưng user thấy 1, 2, 3...
              pageSize={4}
              total={total} // Sử dụng total thực từ API
              showSizeChanger={false}
              onChange={onPageChange}
              showQuickJumper
              showTotal={(total) => `Total ${total} items`}
            />
          </div>
                </>
            )}
        </Card>
    );
};

export default EmployeeTable;
