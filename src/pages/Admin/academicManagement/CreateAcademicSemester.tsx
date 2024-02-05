import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constants/global";
import { semesterOptions } from "../../../constants/semester";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement";
import { TResponse } from "../../../types/global";

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const name = semesterOptions[Number(data.name - 1)].label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await addAcademicSemester(semesterData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const currentYear = new Date().getFullYear();
  const yearOption = [0, 1, 2, 3, 4, 5].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
  }));

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <PHForm onSubmit={onSubmit} formTitle="Create academic semester form">
          <PHSelect
            placeholder="Select name"
            label="Name"
            name="name"
            options={semesterOptions}
          />

          <PHSelect
            placeholder="Select year"
            label="Year"
            name="year"
            options={yearOption}
          />

          <PHSelect
            placeholder="Select start month"
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />

          <PHSelect
            placeholder="Select end month"
            label="End Month"
            name="endMonth"
            options={monthOptions}
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
