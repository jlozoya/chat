FROM public.ecr.aws/docker/library/node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000
CMD ["npm", "run", "start"]
