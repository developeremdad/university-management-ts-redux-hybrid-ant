import { Button, Row } from "antd";
import { useNavigate } from "react-router-dom";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { verifyToken } from "../utils/verifyToken";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

    const defaultValues = {
      userId: "A-0001",
      password: "admin123",
    };


  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in . . .");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Login successfully", { id: toastId });

      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <div>
          <PHInput
            type="text"
            name="userId"
            label="ID"
            placeholder="Enter ID"
          />
        </div>
        <div>
          <PHInput
            type="text"
            name="password"
            label="Password"
            placeholder="Enter password"
          />
        </div>
        <br />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
