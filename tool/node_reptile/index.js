const TurndownServices = require("turndown");
const request = require("request");
const cheerio = require("cheerio");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const rules = require('./rules')

const turndownServices = new TurndownServices();

const config = {
  cursor: 0,
  target: "user",
  userId: "",
  postId: "",
};

// 创建目录
const docsDir = path.join(__dirname, "docs");
const imgDir = path.join(__dirname, "docs/images");

if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir);
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir);

const getRequestOptions = () => ({
  url: "https://api.juejin.cn/content_api/v1/article/query_list",
  body: JSON.stringify({
    cursor: String(config.cursor),
    sort_type: 2,
    user_id: config.userId,
  }),
  headers: {
    "content-type": "application/json",
  },
});

const postList = [];

// 处理用户ID
const handleGrabUserArticles = (requestOptions) => {
  request.post(requestOptions, (error, res, body) => {
    if (!error && res.statusCode === 200) {
      const { data = [], has_more, cursor } = JSON.parse(body);
      if (data?.length) {
        postList.push(...data?.map((article) => article.article_id));
      }

      if (has_more) {
        config.cursor = cursor;
        handleGrabUserArticles(getRequestOptions());
      } else {
        postList.forEach((id) =>
          handleGrabArticles(`https://juejin.cn/post/${id}`, id)
        );
      }
    }
  });
};

// 处理文章ID
const handleGrabArticles = (url, id) => {
  request(url, async (error, res, body) => {
    if (!error && res.statusCode === 200) {
      // 解析DOM元素
      const $ = cheerio.load(body);
      // 获取文章内容
      // 图片保存本地
      const imageElements = $(".markdown-body").find("img");
      const tasks = imageElements.map((index,img) => {
        const imageUrl = $(img).attr("src");
        if (!imageUrl) return null;

        return new Promise((resolve, reject) => {
          request.head(imageUrl, (err, ret, body) => {
            if (err) return null;
            // 获取文件扩展名
            const contentType = ret?.headers["content-type"];
            let extname = contentType ? `.${contentType.split("/")[1]}` : "";
            // 获取文件名
            let filename = path.basename(imageUrl);

            if (filename.indexOf(".awebp") !== -1) {
              extname = "";
              filename = filename.replace(".awebp", ".webp");
              filename = filename.replace(".awebp?", ".webp");
              filename = filename.replace(".webp?", ".webp");
            }
            // 创建写入流
            const stream = fs.createWriteStream(
              path.join(__dirname, "docs/images", filename + extname)
            );
            // 管道流
            request(imageUrl)
              .pipe(stream)
              .on("close", () => {
                $(img).attr("src", `./images/${filename + extname}`);
                resolve();
              });
          });
        });
      });

      // 处理a链接
      const linkElements = $(".markdown-body").find("a");
      linkElements.map((index,link) => {
        const url = $(link)
          .attr("href")
          ?.replace("https://link.juejin.cn?target=", "");
        $(link).attr("href", decodeURIComponent(url));
      });

      turndownServices.addRule('code', rules.code)
      turndownServices.addRule('code', rules.style)

      const filename = $("title").text().replace(" - 掘金", "")?.trim();

      await Promise.all(tasks);
      const content = $(".markdown-body").html();
      try {
        if (!content) return;
        const description = $("meta[name=description]").attr("content");
        const keywords = $("meta[name=keywords]").attr("content");
        const datePublished = $("meta[itemprop=datePublished]").attr("content");
        // 转换为markdown
        const markdown = turndownServices.turndown(content);

        const tags = keywords?.split(",") ?? [];
        let tagstr = ``;
        tags.forEach((tag) => {
          tagstr += `\n - ${tag}`;
        });

        const contentMarkdown = `---
          title: ${filename}
          date: ${datePublished}
          tags: ${tagstr}
          head: 
            - - meta
              - name: headline
                content: ${filename}
            - - meta
              - name: description
                content: ${description}
            - - meta
              - name: keywords
               content: ${keywords}
            - - meta
              - name: datePublished
                content: ${datePublished}
            ---
            ${markdown}`;

        // 写入文件
        fs.writeFileSync(`docs/${id}.md`, contentMarkdown);
        console.log(`文件已生成：${filename} -> ${id}`);
      } catch (error) {
        console.log(error);
        console.log(`错误文章为${url}`);
      }
    }
  });
};

const main = async () => {
  const { model: target } = await inquirer.prompt({
    type: "list",
    name: "model",
    message: "请选择爬取方式",
    choices: [
      { name: "通过用户 ID 爬取", value: "user" },
      { name: "通过文章 ID 爬取文章", value: "post" },
    ],
    default: config.target,
  });

  config.target = target;

  if (target === "user") {
    const { prompt: userId } = await inquirer.prompt({
      type: "input",
      name: "prompt",
      message: "请输入用户 ID",
    });
    config.userId = userId;

    handleGrabUserArticles(getRequestOptions());
  } else {
    const { prompt: postId } = await inquirer.prompt({
      type: "input",
      name: "prompt",
      message: "请输入文章 ID",
    });
    config.postId = postId?.trim();

    handleGrabArticles(`https://juejin.cn/post/${config.postId}`, config.postId);
  }
};

main();
