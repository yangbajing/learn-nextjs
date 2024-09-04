import { addUser } from "@/lib/prisma";
import { NextResponse } from "next/server";

/// 注册用户
export async function POST(request) {
  const { username, password } = await request.json();
  console.log("/api/sign/up", username, password);
  const user = await addUser(username, password);
  return NextResponse.json(user);
}
