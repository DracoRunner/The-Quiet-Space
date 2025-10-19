import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

import { readDb } from "##/lib/blogDb";

// GET /api/blogs - list posts
export async function GET(req: Request) {
  const startTime = Date.now();
  console.log("📥 [API] GET /api/blogs - Request received");

  try {
    const items = await readDb();
    const duration = Date.now() - startTime;

    console.log(
      `✅ [API] GET /api/blogs - Success (${items.length} blogs, ${duration}ms)`,
    );

    return NextResponse.json(items);
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ [API] GET /api/blogs - Error (${duration}ms):`, error);

    return NextResponse.json(
      { message: "Failed to fetch blogs", error: String(error) },
      { status: 500 },
    );
  }
}

// // POST /api/blogs - create a post
// // Accepts one of: content | markdown | markdownBase64 | markdownPath
// export async function POST(req: NextRequest) {
//   try {
//     const body = (await req.json()) as unknown;

//     if (!body || typeof body !== "object")
//       return NextResponse.json({ message: "Invalid body" }, { status: 400 });

//     const payload = body as Record<string, unknown>;
//     const {
//       title: rawTitle,
//       slug,
//       content: rawContent,
//       excerpt: rawExcerpt,
//       author,
//       format,
//       markdown,
//       markdownBase64,
//       markdownPath,
//     } = payload as Partial<Record<string, string>>;

//     if (!slug || typeof slug !== "string")
//       return NextResponse.json(
//         { message: "Missing required field: slug" },
//         { status: 400 },
//       );

//     let content: string | undefined =
//       typeof rawContent === "string"
//         ? rawContent
//         : typeof markdown === "string"
//           ? markdown
//           : undefined;

//     if (!content && typeof markdownBase64 === "string") {
//       try {
//         content = Buffer.from(markdownBase64, "base64").toString("utf8");
//       } catch {
//         return NextResponse.json(
//           { message: "Invalid base64 in markdownBase64" },
//           { status: 400 },
//         );
//       }
//     }

//     if (!content && typeof markdownPath === "string") {
//       try {
//         const mod = await import("../../../lib/markdownUtil.js");
//         const maybe = mod as unknown as {
//           readMarkdownAsString?: unknown;
//           default?: { readMarkdownAsString?: unknown };
//         };
//         const readMarkdownAsString =
//           maybe.readMarkdownAsString ?? maybe.default?.readMarkdownAsString;
//         if (typeof readMarkdownAsString !== "function")
//           throw new Error("markdown util unavailable");
//         content = await (
//           readMarkdownAsString as (p: string) => Promise<string>
//         )(markdownPath);
//       } catch (err) {
//         return NextResponse.json(
//           { message: `Could not read markdownPath: ${String(err)}` },
//           { status: 400 },
//         );
//       }
//     }

//     if (!content)
//       return NextResponse.json(
//         {
//           message:
//             "Missing required content (provide content | markdown | markdownBase64 | markdownPath)",
//         },
//         { status: 400 },
//       );

//     content = content.replace(/\r\n?/g, "\n").trim();

//     const extractTitleAndExcerpt = (md: string) => {
//       const lines = md.split(/\r?\n/).map((l) => l.trim());
//       let title = "";
//       for (const line of lines) {
//         if (line.startsWith("# ")) {
//           title = line.replace(/^#\s+/, "").trim();
//           break;
//         }
//       }
//       const para: string[] = [];
//       for (const l of lines) {
//         if (l === "") {
//           if (para.length) break;
//           continue;
//         }
//         if (/^#{1,6}\s+/.test(l)) continue;
//         para.push(l);
//       }
//       let excerpt = "";
//       if (para.length) {
//         excerpt = para.join(" ");
//         if (excerpt.length > 240) excerpt = excerpt.slice(0, 237) + "...";
//       }
//       return { title, excerpt };
//     };

//     const extracted = extractTitleAndExcerpt(content);
//     const title =
//       (typeof rawTitle === "string" ? rawTitle : extracted.title) || "Untitled";
//     const excerpt =
//       typeof rawExcerpt === "string"
//         ? rawExcerpt
//         : extracted.excerpt || undefined;

//     const finalFormat =
//       format === "html" || format === "text" || format === "markdown"
//         ? (format as "markdown" | "html" | "text")
//         : "markdown";

//     const created = await addBlog({
//       title,
//       slug: slug as string,
//       content,
//       excerpt,
//       author,
//       format: finalFormat,
//     });
//     return NextResponse.json(created, { status: 201 });
//   } catch (err) {
//     return NextResponse.json(
//       { message: "Server error", error: String(err) },
//       { status: 500 },
//     );
//   }
// }
