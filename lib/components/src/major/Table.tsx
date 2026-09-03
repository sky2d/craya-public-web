"use client";

import { TableProps as AntTableProps, Table } from "antd";
import React from "react";

interface TableContentProps<T> {
  columns: AntTableProps<T>["columns"];
  dataSource: AntTableProps<T>["dataSource"];
  selectedRowKeys: React.Key[];
  loading?: boolean;
  totalPage?: number;
  onSelectionChange?: (selectedKeys: React.Key[]) => void;
}

const TableContent = <T extends { id?: string | number }>({
  totalPage,
  columns,
  loading,
  dataSource,
  selectedRowKeys,
  onSelectionChange,
}: TableContentProps<T>) => {
  const rowSelection: AntTableProps<T>["rowSelection"] = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => onSelectionChange?.(newSelectedRowKeys),
  };

  return (
    <Table<T>
      rowKey={(record, index) => record.id ?? String(index)}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      scroll={{ x: "max-content" }}
      pagination={
        totalPage
          ? {
              position: ["bottomRight"],
              showSizeChanger: true,
              pageSizeOptions: ["10"],
              defaultPageSize: totalPage,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }
          : false
      }
    />
  );
};

export default TableContent;
