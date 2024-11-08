# 安装依赖
RUN npm install

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产环境
FROM node:18-alpine AS runner

WORKDIR /app

# 设置环境变量
ENV NODE_ENV production

# 复制必要文件
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# 只安装生产依赖
RUN npm install --production

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]
