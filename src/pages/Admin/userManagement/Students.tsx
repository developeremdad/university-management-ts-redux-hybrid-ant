import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { TStudent } from "../../../types";
import { TQueryParam } from "../../../types/global";

export type TTableData = Pick<
  TStudent,
  "fullName" | "email" | "bloogGroup" | "contactNo"
>;

const Student = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const { data: studentData, isFetching } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const metaData = studentData?.meta;

  const tableData = studentData?.data.map(
    ({ _id, fullName, email, id, contactNo }: TStudent) => ({
      key: _id,
      fullName,
      email,
      id,
      contactNo,
    })
  );

  const tableColumn: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Roll",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Contact no.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Space>
            <Link to="">
              <Button size="small" ghost type="primary">
                Details
              </Button>
            </Link>
            <Button size="small" ghost type="primary">
              Update
            </Button>
            <Button size="small" ghost danger>
              Block
            </Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);

    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={tableColumn}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        defaultCurrent={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default Student;
