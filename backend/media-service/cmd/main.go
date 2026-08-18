package main

import (
	"context"
	"fmt"
	"net"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/DanilMU/StackCine/media-service/internal/config"
	"github.com/DanilMU/StackCine/media-service/internal/infrastructure/grpc"
	httpserver "github.com/DanilMU/StackCine/media-service/internal/infrastructure/http"
	"github.com/DanilMU/StackCine/media-service/internal/infrastructure/storage"
	"github.com/DanilMU/StackCine/media-service/pkg/logger"
)

func main() {
	cfg := config.Load()

	logger.Init(cfg.Logging.Level)

	logger.Info("🚀 Starting media-service in %s mode", cfg.App.Env)

	var mediaStorage storage.Storage
	var err error

	mediaStorage, err = storage.NewS3Storage(cfg)
	if err != nil {
		logger.Fatal("failed to init S3 storage: %v", err)
	}
	logger.Info("✅ S3 storage connected (bucket: %s)", cfg.Storage.Bucket)

	grpcServer := grpc.NewServer(mediaStorage, cfg)
	grpcListener, err := net.Listen("tcp", fmt.Sprintf(":%s", cfg.GRPC.Port))
	if err != nil {
		logger.Fatal("failed to listen gRPC: %v", err)
	}

	httpSrv := httpserver.NewServer(mediaStorage, cfg)

	// Запуск gRPC сервера в фоне (горутина)
	go func() {
		logger.Info("gRPC listening on :%s", cfg.GRPC.Port)
		if err := grpcServer.Serve(grpcListener); err != nil {
			logger.Fatal("gRPC serve error: %v", err)
		}
	}()

	// Запуск HTTP сервера в фоне (горутина)
	go func() {
		logger.Info("HTTP listening on :%s", cfg.HTTP.Port)
		if err := httpSrv.Start(); err != nil {
			logger.Fatal("HTTP server error: %v", err)
		}
	}()

	// Graceful Shutdown
	waitForShutdown(func() {
		logger.Warn("🛑 Graceful shutdown started...")
		grpcServer.GracefulStop()
		mediaStorage.Close()

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		httpSrv.Stop(ctx)

		logger.Info("✅ Shutdown complete")
	})
}

func waitForShutdown(cleanup func()) {
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	cleanup()
}