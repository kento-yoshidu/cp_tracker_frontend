// public/figures/ を S3 にアップロードし、更新したファイルの CloudFront キャッシュを削除する。
//
//   pnpm run figures:upload            # アップロード
//   pnpm run figures:upload --dryrun   # 何がアップロードされるかだけ表示
//
// 必要な環境変数（.env）:
//   FIGURES_BUCKET           例: cp-tracker-figures
//   FIGURES_DISTRIBUTION_ID  CloudFront ディストリビューションの ID
//
// S3 にだけあるファイルは削除しない（--delete は付けない）。
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

if (existsSync(".env")) {
  process.loadEnvFile(".env");
}

const bucket = process.env.FIGURES_BUCKET;
const distributionId = process.env.FIGURES_DISTRIBUTION_ID;
const dryrun = process.argv.includes("--dryrun");

if (!bucket || !distributionId) {
  console.error(
    "FIGURES_BUCKET と FIGURES_DISTRIBUTION_ID を .env に設定してください",
  );
  process.exit(1);
}

// Windows では拡張子からの推測が当てにならないため、種類ごとに Content-Type を指定して同期する
const types = [
  { pattern: "*.html", contentType: "text/html; charset=utf-8" },
  { pattern: "*.css", contentType: "text/css; charset=utf-8" },
  { pattern: "*.js", contentType: "text/javascript; charset=utf-8" },
];

const uploaded: string[] = [];

for (const { pattern, contentType } of types) {
  const args = [
    "s3",
    "sync",
    "public/figures",
    `s3://${bucket}/figures`,
    "--exclude",
    "*",
    "--include",
    pattern,
    "--content-type",
    contentType,
    "--no-progress",
  ];
  if (dryrun) args.push("--dryrun");

  const output = execFileSync("aws", args, { encoding: "utf8" });
  process.stdout.write(output);

  // 例: "upload: public\figures\abc463_c.html to s3://bucket/figures/abc463_c.html"
  for (const match of output.matchAll(/ to s3:\/\/[^/]+(\/\S+)/g)) {
    uploaded.push(match[1]);
  }
}

if (uploaded.length === 0) {
  console.log("変更はありません");
  process.exit(0);
}

if (dryrun) {
  console.log(`(dryrun) キャッシュ削除の対象: ${uploaded.join(" ")}`);
  process.exit(0);
}

execFileSync(
  "aws",
  [
    "cloudfront",
    "create-invalidation",
    "--distribution-id",
    distributionId,
    "--paths",
    ...uploaded,
  ],
  { stdio: "inherit" },
);
console.log(`${uploaded.length} 件をアップロードし、キャッシュを削除しました`);
