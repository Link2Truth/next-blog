// 服务器端环境变量
export const dbUrl = process.env.DATABASE_URL;
export const dbName = process.env.DATABASE_NAME;
export const dbUser = process.env.DATABASE_USER;
export const dbPassword = process.env.DATABASE_PASSWORD;

export const dsApiUrl = process.env.DEEPSEEK_API_URL;
export const dsApiSecret = process.env.DEEPSEEK_API_SECRET;
export const dsDefaultModel = process.env.DEEPSEEK_DEFAULT_MODEL;

// 客户端可用的环境变量
export const websiteName = process.env.NEXT_PUBLIC_WEBSITE_NAME;
