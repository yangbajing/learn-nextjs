import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      // 显示按钮文案 (e.g. "Sign in with...")
      name: "密码登录",
      // `credentials` 用于渲染登录页面表单
      credentials: {
        username: { label: "邮箱", type: "text", placeholder: "输入您的邮箱" },
        password: { label: "密码", type: "password", placeholder: "输入您的密码" },
      },
      // 处理从用户收到的认证信息
      async authorize(credentials, req) {
        console.log("authorize:", credentials);
        // 默认情况下不对用户输入进行验证，确保使用 Zod 这样的库进行验证
        let user = null;
        // 登陆信息验证
        user = await fetch("http://localhost:3000/api/sign", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });
        // 密码错误
        if (user === 1) return null;
        // 用户注册
        if (user === 0) {
          user = await fetch("http://localhost:3000/api/sign/up", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });
        }
        if (!user) {
          throw new Error("User was not found and could not be created.");
        }
        return user;
      },
    }),
    GitHub,
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      console.log("auth authorized pathname:", pathname);
      if (pathname.startsWith("/note/edit")) {
        return !!auth;
      } else {
        return true;
      }
    },
  },
});
