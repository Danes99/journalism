FROM node:15.8.0-alpine3.10

WORKDIR /usr/src/app

COPY ./ /usr/src/app/

RUN npm install
RUN npm run build

EXPOSE 3001

# Disables Next.js telemetry
# We do not want to be tracked
# https://nextjs.org/telemetry
# https://github.com/vercel/next.js/issues/10713
ENV NEXT_TELEMETRY_DISABLED 1