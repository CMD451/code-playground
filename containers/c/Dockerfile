FROM alpine:latest
RUN apk add --no-cache gcc g++ libc-dev

COPY main.sh .

ENTRYPOINT ["sh","main.sh"]