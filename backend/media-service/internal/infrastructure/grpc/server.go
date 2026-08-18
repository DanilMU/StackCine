package grpc

import (
	"fmt"
	"net"

	pb "github.com/stackcine/contracts/gen/go/media"
	"github.com/DanilMU/StackCine/media-service/internal/application/usecases"
	"github.com/DanilMU/StackCine/media-service/internal/config"
	"github.com/DanilMU/StackCine/media-service/internal/infrastructure/images"
	"github.com/DanilMU/StackCine/media-service/internal/infrastructure/storage"
	handler "github.com/DanilMU/StackCine/media-service/internal/interfaces/grpc"
	"github.com/DanilMU/StackCine/media-service/pkg/logger"
	"google.golang.org/grpc"
)

func NewServer(storage storage.Storage, cfg *config.Config) *grpc.Server {
	server := grpc.NewServer(
		grpc.ChainUnaryInterceptor(
			RequestLoggerInterceptor,
			TraceIDInterceptor,
		),
	)

	uploadUC := usecases.NewUploadUseCase(storage, images.NewImageProcessor())
	getUC := usecases.NewGetUseCase(storage)
	deleteUC := usecases.NewDeleteUseCase(storage)

	h := handler.NewMediaHandler(uploadUC, getUC, deleteUC)

	pb.RegisterMediaServiceServer(server, h)

	return server
}

func StartGRPC(server *grpc.Server, port string) error {
	addr := fmt.Sprintf(":%s", port)
	lis, err := net.Listen("tcp", addr)
	if err != nil {
		return err
	}

	logger.Info("gRPC server listening on %s", addr)
	return server.Serve(lis)
}