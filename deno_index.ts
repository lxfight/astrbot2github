async function handler(req: Request): Promise<Response> {
  const incomingUrl = new URL(req.url);
  if (incomingUrl.pathname === "/") {
    return new Response(
      "此地址只用于为astrbot提供更快速的github访问服务",
      {
        status: 200, // OK
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }
    );
  }
  // 1. 从请求路径中提取目标 URL
  //    - incomingUrl.pathname 会是像 "/https://github.com/..." 这样的形式
  //    - slice(1) 去掉开头的 "/"
  //    - decodeURIComponent 处理路径中可能存在的 URL 编码 (例如 %2F)
  const targetUrlString = decodeURIComponent(incomingUrl.pathname.slice(1));

  // 2. 验证提取出的字符串是否看起来像一个有效的 URL
  if (!targetUrlString || (!targetUrlString.startsWith("http://") && !targetUrlString.startsWith("https://"))) {
    // 如果路径为空或者不是以 http/https 开头，则返回错误
    return new Response("Invalid or missing target URL in path. Usage: /<target_url>", {
      status: 400, // Bad Request
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  console.log(`Proxying request to: ${targetUrlString}`); // 打印日志，方便调试

  try {
    // 3. 使用提取出的目标 URL 发起 fetch 请求
    //    并将原始请求的方法、头信息、请求体都转发过去
    const response = await fetch(targetUrlString, {
      headers: req.headers, // 转发原始请求头
      method: req.method,   // 转发原始请求方法
      body: req.body,     // 转发原始请求体 (支持流式传输)
      redirect: 'manual', // 重要：不自动处理重定向，将 3xx 响应返回给客户端处理
                           // 或者设为 'follow' 让代理服务器处理重定向
    });

    // 4. 返回从目标服务器获取的响应
    //    为了允许跨域请求 (例如浏览器 JS 调用此代理)，添加 CORS 头
    const responseHeaders = new Headers(response.headers); // 复制响应头以便修改
    responseHeaders.set("Access-Control-Allow-Origin", "*"); // 允许任何来源访问
    responseHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // 允许的方法
    responseHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization, *"); // 允许的请求头
    // 可以根据需要更精细地控制 CORS 头

    // 处理浏览器的 OPTIONS 预检请求
     if (req.method === "OPTIONS") {
        return new Response(null, {
            status: 204, // No Content
            headers: responseHeaders
        });
    }

    // 直接返回目标服务器的响应体、状态码和处理过的头信息
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });

  } catch (error) {
    // 5. 处理 fetch 过程中可能发生的错误 (例如网络问题、目标服务器无法访问)
    console.error(`Error fetching ${targetUrlString}:`, error);
    return new Response(`Failed to proxy request to ${targetUrlString}: ${error.message}`, {
      status: 502, // Bad Gateway
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

// 使用 Deno 推荐的 Deno.serve 启动服务
// 这种方式能让 Deno Deploy 自动管理端口和健康检查，避免部署失败
Deno.serve(handler);

