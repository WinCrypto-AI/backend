
# FROM node:20.9.0-alpine as node_modules
# WORKDIR /tmp/
# COPY package.json yarn.lock tsconfig.json tsconfig.build.json ./
# COPY src/ src/
# ENV NODE_OPTIONS=--max_old_space_size=4096
# RUN yarn 
# RUN yarn build
# RUN mkdir /uploads
# CMD exec node --max_old_space_size=4096 dist/main.js

# FROM node_modules
# WORKDIR /usr/local/nub-api
# COPY --from=node_modules /tmp/node_modules ./node_modules
# COPY --from=node_modules /tmp/dist ./dist
# RUN mkdir /uploads
# CMD exec node --max_old_space_size=4096 dist/main.js

#----------------------------------------------------------------Code cũ------------------------------------------------------------------------------------------

FROM node:20.9.0-alpine as dist
WORKDIR /tmp/
RUN apk --no-cache add --virtual builds-deps build-base python3
COPY package.json yarn.lock tsconfig.json tsconfig.build.json ./
COPY src/ src/
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN yarn
RUN yarn build

FROM node:20.9.0-alpine as node_modules
WORKDIR /tmp/
RUN apk --no-cache add --virtual builds-deps build-base python3
COPY package.json yarn.lock ./
RUN yarn install --production

FROM node:20.9.0-alpine
WORKDIR /usr/local/nub-api
COPY --from=node_modules /tmp/node_modules ./node_modules
COPY --from=dist /tmp/dist ./dist
RUN mkdir /uploads
COPY resources/ resources/
COPY src/assets ./dist/assets/
CMD exec node --max_old_space_size=4096 dist/main.js

#-----------------------------------------------------------------Using Bun-----------------------------------------------------------------------------------------

# # use the official Bun image
# FROM oven/bun:1 as base
# WORKDIR /tmp

# # install dependencies into temp directory
# # this will cache them and speed up future builds
# FROM base AS install
# RUN mkdir -p /temp/prod
# COPY package.json bun.lockb /temp/prod/
# RUN cd /temp/prod && bun install --frozen-lockfile --production

# # copy node_modules from temp directory
# # then copy all (non-ignored) project files into the image
# FROM base AS prerelease
# COPY --from=install /temp/prod/node_modules node_modules
# COPY . .

# # [optional] tests & build
# ENV NODE_ENV=production
# # RUN bun test
# RUN bun run build

# # copy production dependencies and source code into final image
# FROM base AS release
# COPY --from=install /temp/prod/node_modules node_modules
# COPY --from=prerelease /tmp/dist ./dist
# # RUN mkdir /uploads
# # CMD exec bun run dist/main.js

# # run the app
# USER bun
# ENTRYPOINT [ "bun", "run", "dist/main.ts" ]
