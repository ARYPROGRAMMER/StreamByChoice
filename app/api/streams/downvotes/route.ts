import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DownVoteSchema = z.object({
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
    const data = DownVoteSchema.parse(await req.json());
    await prismaClient.upvote.delete({
      where: {
        userId_streamId: {
          streamId: data.streamId,
          userId: user.id,
        },
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Error while downvoting",
      },
      { status: 403 }
    );
  }
}
