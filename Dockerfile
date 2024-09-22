# Use the official Bun image as the base image
FROM oven/bun:1 as base

# Set the working directory
WORKDIR /app

# Copy package.json, bun.lockb, and turbo.json files
COPY package.json bun.lockb turbo.json ./

# Copy the entire packages directory
COPY packages ./packages

# Copy the app directory
COPY apps/app ./apps/app

# Install dependencies
RUN bun install --frozen-lockfile

# Build all packages
RUN bun run build

# Build the Next.js app
FROM base as builder
WORKDIR /app/apps/app
RUN bun run build

# Production image
FROM oven/bun:1 as runner
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/apps/app/package.json ./
COPY --from=builder /app/apps/app/.next ./.next
COPY --from=builder /app/apps/app/public ./public
COPY --from=builder /app/apps/app/next.config.mjs ./

# Copy the packages directory for workspace dependencies
COPY --from=builder /app/packages ./packages

# Install only production dependencies
RUN bun install --frozen-lockfile

# Expose the port the app runs on
EXPOSE 3000

# Set the command to run the app
CMD ["bun", "run", "start"]