import { getUser } from "@/lib/redis";
import { NextResponse } from "next/server";

/// 用户登录
export async function POST(request) {
  const { username, password } = await request.json();
  const user = await getUser(username, password);
  return NextResponse.json(user);
}
