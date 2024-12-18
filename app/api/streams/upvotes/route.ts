import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpVoteSchema = z.object({
  streamId: z.string(),
});
export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json(
      {
        message: "UNAUTHORIZED",
      },
      { status: 403 }
    );
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "USER NOT FOUND",
      },
      { status: 403 }
    );
  }

  try {
    const data = UpVoteSchema.parse(await req.json());
    await prismaClient.upvote.create({
      data: {
        streamId: data.streamId,
        userId: user.id,
      },
    });
  } 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch (e) {
    return NextResponse.json(
      {
        message: "Error while Upvoting",
      },
      { status: 403 }
    );
  }
}
