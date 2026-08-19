FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache ca-certificates

COPY media-service /app/media-service

EXPOSE 8084 50054

CMD ["/app/media-service"]
