import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      userId: "A-0001",
      password: "admin123",
    },
  });

  const onSubmit = async (data: { userId: string; password: string }) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.accessToken);
    dispatch(setUser({ user: user, token: res.data.accessToken }));
    navigate(`/${user.role}/dashboard`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <br />
      <br />
      <div>
        <label htmlFor="userId">ID: </label>
        <input
          type="text"
          id="userId"
          placeholder="Enter ID"
          {...register("userId")}
        />
      </div>
      <br />
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="text"
          id="password"
          placeholder="Enter ID"
          {...register("password")}
        />
      </div>
      <br />
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
