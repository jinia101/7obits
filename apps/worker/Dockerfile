# 1. Use Node 20 Alpine base image
FROM node:20-alpine

# 2. Install pnpm globally (Alpine doesn't include it by default)
RUN npm install -g pnpm

# 3. Set the working directory inside the container
WORKDIR /app

# 4. Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 5. Run pnpm install with frozen-lockfile for production stability
RUN pnpm install --frozen-lockfile

# 6. Copy the source code and the tsconfig.json we created earlier
COPY src/ ./src/
COPY tsconfig.json ./

# 7. Run pnpm build (this generates the /dist folder)
RUN pnpm build

# 8. Set the command to run the compiled worker
CMD ["node", "dist/index.js"]