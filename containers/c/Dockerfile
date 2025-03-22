FROM alpine:latest
RUN apk add --no-cache gcc g++ libc-dev coreutils

COPY main.sh .

ENTRYPOINT ["sh","main.sh"]