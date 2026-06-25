import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import {
  registerSchema,
  RegisterFormData,
} from "../validators/register.schema";

import { useRegisterMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(data).unwrap();

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
        error?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">
      {/* Left */}

      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white p-12">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Create Your Account
          </h1>

          <p className="mt-6 text-lg text-blue-100">
            Join today and organize your work, track your
            progress and manage everything in one place.
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-8">

          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              Create Account
            </h2>

            <p className="mt-2 text-slate-500">
              Fill in your details below.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <Input
              label="Full Name"
              placeholder="John Doe"
              error={errors.name?.message}
              {...register("name")}
            />

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
                className="absolute right-4 top-[45px] text-slate-500"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
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
              Create Account
            </Button>
          </form>

          <p className="mt-8 text-center text-slate-600">
            Already have an account?

            <Link
              to="/login"
              className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;