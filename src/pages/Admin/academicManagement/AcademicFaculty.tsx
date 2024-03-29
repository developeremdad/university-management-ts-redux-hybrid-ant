import { Button, Table, TableColumnsType } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty } from "../../../types/academicManagement.types";

export type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicFaculty = () => {
  const { data: facultyData, isFetching } =
    useGetAcademicFacultiesQuery(undefined);

  const tableData = facultyData?.data.map(
    ({ _id, name }: TAcademicFaculty) => ({
      key: _id,
      name,
    })
  );

  const tableColumn: TableColumnsType<TTableData> = [
    {
      title: "Faculty",
      key: "name",
      dataIndex: "name",
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

export default AcademicFaculty;
