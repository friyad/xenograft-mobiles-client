import bg from "@/assets/images/homeBg2.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInCredentials } from "@/types/globalTypes";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/validations/userValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { animate } from "framer-motion";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAuthFormAnimState } from "@/redux/features/global/globalSlice";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { authFormAnimState } = useAppSelector((state) => state.global);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInCredentials>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignInSubmit = (data: SignInCredentials) => {
    console.log(data);
  };

  useEffect(() => {
    if (authFormAnimState === "fromSignUp") {
      setTimeout(() => {
        animate(
          "#signInFormContent",
          { x: "0%" },
          { duration: 0.2, ease: "anticipate" }
        );
      }, 0);
    }
  }, [authFormAnimState]);

  return (
    <div
      style={{
        background: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
      className="h-screen w-full flex flex-col justify-center items-center"
    >
      <div className="-mt-[8%] w-full max-w-md px-2 xsm:px-0">
        <h3 className="text-sm mxl:text-lg 3xl:text-xl font-medium text-center">
          Welcome back!
        </h3>
        <h1 className="text-2xl mxl:text-3xl 3xl:text-4xl text-center font-black text-primary mb-5 mxl:mb-7 3xl:mb-10">
          Xeno<span className="text-cusBlack">Graft</span>
        </h1>

        <div className="flex flex-col justify-start bg-white/70 rounded-xl max-w-xs 2xl:max-w-sm w-full shadow-[0px_34px_64px_0px_#b1c8e82e] p-6 3xl:p-10 mx-auto overflow-hidden">
          <div
            id="signInFormContent"
            className={`transition-all duration-300 ease-out ${
              authFormAnimState === "fromSignUp"
                ? "translate-x-[-120%]"
                : "translate-x-0"
            }`}
          >
            <h1 className="text-xl mxl:text-2xl 3xl:text-3xl font-black text-primary text-left uppercase">
              Sign In
            </h1>

            <form
              onSubmit={handleSubmit(handleSignInSubmit)}
              className="w-full mt-4 mxl:mt-6 3xl:mt-8"
            >
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email" className="text-gray-500">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mxl:text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid w-full items-center gap-1.5 mt-5">
                <Label htmlFor="password" className="text-gray-500">
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mxl:text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-xs mxl:text-sm">Don't have any account?</p>
                <Link
                  to="/signup"
                  unstable_viewTransition
                  onClick={() => dispatch(setAuthFormAnimState("fromSignIn"))}
                  className="text-primary underline-offset-3 underline font-semibold cursor-pointer text-sm 2xl:text-base"
                >
                  Sign Up
                </Link>
              </div>

              <Button
                type="submit"
                variant="default"
                className="mt-4 mxl:mt-6 3xl:mt-8 uppercase w-full"
                size="lg"
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
