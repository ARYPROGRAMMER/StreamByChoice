import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

//@ts-expect-error
import youtubesearchapi from "youtube-search-api";

const YT_REGEX = new RegExp(
  "https?:\\/\\/(www\\.)?youtube\\.com\\/watch\\?v=([a-zA-Z0-9_-]{11})"
);

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(), //stricter
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
    const isYoutube = YT_REGEX.test(data.url);
    if (!isYoutube) {
      console.log("INVALID URL");
      return NextResponse.json({ message: "INVALID URL" }, { status: 400 });
    }
    const extractedId = data.url.split("?v=")[1];

    const res = await youtubesearchapi.GetVideoDetails(extractedId);

    const thumbnails = res.thumbnail.thumbnails;

    thumbnails.sort((a: { width: number }, b: { width: number }) =>
      a.width < b.width ? -1 : 1
    );

    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
        title: res.title ?? "developer sucks",
        largeImg:
          thumbnails[thumbnails.length - 1].url ??
          "https://avatars.githubusercontent.com/u/75311742?v=4",
        smallImg:
          (thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 1].url) ??
          "https://avatars.githubusercontent.com/u/75311742?v=4",
      },
    });
    return NextResponse.json(
      {
        message: "Stream Added",
        id: stream.id,
      },
      {
        status: 200,
      }
    );
  } 
  //@typescript-eslint/no-unused-vars
  catch (e) {
    return NextResponse.json(
      { message: "ERROR WHILE ADDING DATA" },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  const streams = await prismaClient.stream.findMany({
    where: {
      userId: creatorId ?? "",
    },
  });

  return NextResponse.json({
    streams,
  });
}
