/**
 * 获取图片URL，自动处理base路径
 * @param path 图片路径，例如 '/image/xxx.png'
 * @returns 完整的图片URL
 */
export function getImageUrl(path: string): string {
  // 如果是完整的URL（http/https），直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // 获取base URL（生产环境是 /demo-C/，开发环境是 /）
  // @ts-ignore - Vite 的 import.meta.env 类型
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // 确保path以/开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 移除base URL末尾的/（如果有），然后拼接路径
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // 拼接完整路径并编码中文字符
  return encodeURI(`${base}${normalizedPath}`);
}

