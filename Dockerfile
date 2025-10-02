FROM oven/bun:latest
WORKDIR /app

# Copy the whole repo into the image (keeps the Dockerfile extremely simple)
COPY . /app

# Install dependencies (dev deps are needed for the build step)
RUN bun install

# Build the SvelteKit app
RUN bun run build

EXPOSE 3000
ENV PORT=3000

# Serve the built app with vite preview on 0.0.0.0:3000
CMD ["bun", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
