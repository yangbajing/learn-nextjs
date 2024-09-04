// "use client";
// import { useEffect, useState } from "react";

export default async function SignIn() {
  // XXX 这里直接使用 async 在客户端组件里有问题，会持续刷新页面。
  const response = await fetch("http://localhost:3000/api/auth/csrf");
  const { csrfToken } = await response.json();
  console.log("csrfToken", csrfToken);

  // const [csrfToken, setCsrfToken] = useState("");
  // useEffect(() => {
  //   let ignore = false;

  //   async function f() {
  //     const response = await fetch("http://localhost:3000/api/auth/csrf");
  //     const res = await response.json();
  //     if (!ignore) {
  //       setCsrfToken(res.csrfToken);
  //     }
  //   }
  //   f();

  //   return () => (ignore = true);
  // }, [csrfToken]);

  return (
    <div>
      <form method="post" action="/api/auth/callback/credentials">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <label>
          Username
          <input name="username" type="text" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
