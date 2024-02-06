import { Button, Table, TableColumnsType } from "antd";
import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartment } from "../../../types/academicManagement.types";

export type TTableData = Pick<TAcademicDepartment, "name">;

const AcademicDepartment = () => {
  const { data: departmentData, isFetching } =
    useGetAcademicDepartmentQuery(undefined);

  const tableData = departmentData?.data.map(
    ({ _id, name, academicFaculty }: TAcademicDepartment) => ({
      key: _id,
      name,
      faculty: academicFaculty.name,
    })
  );

  const tableColumn: TableColumnsType<TTableData> = [
    {
      title: "Department",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Faculty",
      key: "faculty",
      dataIndex: "faculty",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  return (
    <Table loading={isFetching} columns={tableColumn} dataSource={tableData} />
  );
};

export default AcademicDepartment;
