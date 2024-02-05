import { Form, Typography } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  formTitle?: string;
} & TFormConfig;

const PHForm = ({
  onSubmit,
  children,
  formTitle,
  defaultValues,
  resolver,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    // methods.reset();
  };
  return (
    <FormProvider {...methods}>
      <Form onFinish={methods.handleSubmit(submit)} layout="vertical">
        <Typography.Title level={4}>{formTitle}</Typography.Title>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
