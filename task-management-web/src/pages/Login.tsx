import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginSchema, LoginFormData } from "../validators/login.schema";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { useLoginMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();

      dispatch(
        setCredentials({
          user: response.user,
          token: response.token,
        })
      );

      toast.success(response.message);

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">

      {/* Left */}

      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-12">

        <div className="max-w-md">

          <h1 className="text-5xl font-bold leading-tight">
            Task Manager
          </h1>

          <p className="mt-6 text-lg text-blue-100">
            Organize your work, manage your daily tasks and
            stay productive with a beautiful task management
            experience.
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center justify-center p-6">

        <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-8">

          <div className="mb-8">

            <h2 className="text-3xl font-bold text-slate-900">
              Welcome Back 👋
            </h2>

            <p className="mt-2 text-slate-500">
              Sign in to continue
            </p>

          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="relative">

              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password")}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-[45px] text-slate-500"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

            <Button
              loading={isLoading}
              type="submit"
            >
              Sign In
            </Button>

          </form>

          <p className="mt-8 text-center text-slate-600">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;