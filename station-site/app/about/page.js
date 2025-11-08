import fs from "fs";
import path from "path";

export default function AboutPage() {
  const htmlPath = path.join(process.cwd(), "public/html/about.html");
  const html = fs.readFileSync(htmlPath, "utf-8");

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
