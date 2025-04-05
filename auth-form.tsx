import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@/lib/validations";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // ログインフォーム
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 登録フォーム
  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // ログイン処理
  const onLoginSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("メールアドレスまたはパスワードが正しくありません");
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setError("ログイン中にエラーが発生しました");
      setIsLoading(false);
    }
  };

  // 登録処理
  const onRegisterSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.message || "登録中にエラーが発生しました");
        setIsLoading(false);
        return;
      }

      // 登録成功後、自動ログイン
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("自動ログインに失敗しました。ログインページからログインしてください。");
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setError("登録中にエラーが発生しました");
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="login" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">ログイン</TabsTrigger>
        <TabsTrigger value="register">新規登録</TabsTrigger>
      </TabsList>
      
      {/* ログインフォーム */}
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>ログイン</CardTitle>
            <CardDescription>
              メールアドレスとパスワードを入力してログインしてください。
            </CardDescription>
          </CardHeader>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...loginForm.register("email")}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  {...loginForm.register("password")}
                />
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "ログイン中..." : "ログイン"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      
      {/* 登録フォーム */}
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>新規登録</CardTitle>
            <CardDescription>
              必要な情報を入力して新規アカウントを作成してください。
            </CardDescription>
          </CardHeader>
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">名前</Label>
                <Input
                  id="name"
                  placeholder="山田 太郎"
                  {...registerForm.register("name")}
                />
                {registerForm.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {registerForm.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...registerForm.register("email")}
                />
                {registerForm.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {registerForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  {...registerForm.register("password")}
                />
                {registerForm.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">パスワード（確認）</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...registerForm.register("confirmPassword")}
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {registerForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "登録中..." : "登録"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
