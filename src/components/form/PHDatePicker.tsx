import { DatePicker, Form } from "antd";

type TDatePickerProps = {
  name: string;
  label: string;
};

const PHDatePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <Form.Item label={label}>
      <DatePicker name={name} style={{width: '100%'}} size="large" />
    </Form.Item>
  );
};

export default PHDatePicker;
