import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Stethoscope, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { adminLoginSchema } from "../schema/authSchema"
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate()
  const { loginLoading, handleLogin } = useAuth()
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit
    , formState: { errors },
  } = useForm({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      const response = await handleLogin({
        email: data.email,
        password: data.password
      })
      console.log(response)
      toast.success(response.message)
      navigate("admin/")



    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)

    }
  };
  const onInvalid = (formErrors) => {
    console.log("Login form validation errors:", formErrors);
    toast.error("Please fix the highlighted fields before submitting");
  };


  return (
    <div className="fixed inset-0 bg-slate-50 text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_28%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-full overflow-hidden lg:block">
        <div className="absolute right-10 top-1/4 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute right-0 bottom-24 h-60 w-60 rounded-full bg-teal-400/10 blur-3xl" />
      </div>

      <div className="flex h-screen w-screen items-center justify-center">
        <div className="grid h-screen w-screen grid-cols-1 overflow-hidden bg-transparent lg:grid-cols-[0.55fr_0.45fr]">
          <div className="relative hidden overflow-hidden bg-[linear-gradient(160deg,_#0f172a_0%,_#134e4a_58%,_#34d399_100%)] p-10 text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
            <div className="absolute left-8 top-8 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-10 right-10 h-36 w-36 rounded-full bg-teal-300/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-white/15 bg-white/10">
                  <Stethoscope className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-emerald-200">Prescripto+</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.35em] text-emerald-100/75">
                    Admin Portal
                  </p>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-4 text-sm text-white/90 backdrop-blur">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure Healthcare Administration</span>
                </div>
              </div>

              <div className="max-w-xl space-y-5">
                <h1 className="font-serif text-5xl font-semibold leading-tight tracking-[-0.04em]">
                  Healthcare Administration,
                  <br />
                  Made Simple.
                </h1>
                <p className="max-w-md text-base leading-7 text-emerald-100/85">
                  Manage doctors, patients, appointments and payments in one elegant admin platform built for modern healthcare teams.
                </p>
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              {[
                "Doctor & Patient Management",
                "Appointment & Payment Monitoring",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/90"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-200/10 text-emerald-100">
                    ✓
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex h-full items-center justify-center overflow-hidden p-6 md:p-8">
            <Card className="w-full max-w-[440px] rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-5">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.75rem] bg-emerald-50 text-emerald-700 shadow-sm">
                    <Stethoscope className="h-8 w-8" />
                  </div>

                  <div className="space-y-2 text-center">
                    <h2 className="font-serif text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                      Welcome Back
                    </h2>
                    <p className="text-sm text-slate-500">
                      Sign in to access the Prescripto Admin Portal.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmit, onInvalid)}

                    className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-slate-700">Email address</Label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <Input
                          type="email"
                          {...register("email")}
                          placeholder="admin@prescripto.com"
                          className="h-14 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 shadow-sm transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"

                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-slate-700">Password</Label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...register("password")}
                          className="h-14 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-sm text-slate-900 shadow-sm transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loginLoading}
                      className="inline-flex h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-6 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(16,185,129,0.18)] transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(16,185,129,0.22)] active:translate-y-0 active:shadow-[0_14px_40px_rgba(16,185,129,0.16)]"
                    >
                      {loginLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>

                      ) : (
                        <span>Sign in</span>
                      )}
                    </Button>
                  </form>

                  <div className="rounded-2xl border border-emerald-100/70 bg-emerald-50/70 p-4 text-sm text-slate-600">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                      <p>Protected access with modern authentication standards for healthcare teams.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-200/80 pt-4 text-center text-xs text-slate-400">
                  © 2026 Prescripto+. All rights reserved.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}