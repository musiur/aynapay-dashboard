# FROM node:20.9

# WORKDIR /app

# COPY package.json .
# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 3000

# CMD ["npm", "start"]

FROM node:20.9

WORKDIR /app

# Accept build arguments
ARG BASEURL
ARG NEXT_PUBLIC_FF
ARG NEXT_PUBLIC_SOCKET


# Set environment variables from build arguments
ENV BASEURL=$BASEURL
ENV NEXT_PUBLIC_FF=$NEXT_PUBLIC_FF
ENV NEXT_PUBLIC_SOCKET=$NEXT_PUBLIC_SOCKET

COPY package.json .
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

