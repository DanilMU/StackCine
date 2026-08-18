package grpc

import (
	"bytes"
	"context"

	pb "github.com/stackcine/contracts/gen/go/media"
	"github.com/DanilMU/StackCine/media-service/internal/application/dto"
	"github.com/DanilMU/StackCine/media-service/internal/application/usecases"
)

type MediaHandler struct {
	pb.UnimplementedMediaServiceServer
	uploadUC *usecases.UploadUseCase
	getUC    *usecases.GetUseCase
	deleteUC *usecases.DeleteUseCase
}

func NewMediaHandler(
	u *usecases.UploadUseCase,
	g *usecases.GetUseCase,
	d *usecases.DeleteUseCase,
) *MediaHandler {
	return &MediaHandler{
		uploadUC: u,
		getUC:    g,
		deleteUC: d,
	}
}

func (h *MediaHandler) Upload(
	ctx context.Context,
	req *pb.UploadRequest,
) (*pb.UploadResponse, error) {
	out, err := h.uploadUC.Execute(ctx, dto.UploadMediaRequest{
		FileName:     req.FileName,
		Folder:       req.Folder,
		ContentType:  req.ContentType,
		ResizeWidth:  req.GetResizeWidth(),
		ResizeHeight: req.GetResizeHeight(),
		Reader:       bytes.NewReader(req.Data),
		Size:         int64(len(req.Data)),
	})
	if err != nil {
		return nil, err
	}

	return &pb.UploadResponse{
		Key: out.Key,
	}, nil
}

func (h *MediaHandler) Get(
	ctx context.Context,
	req *pb.GetRequest,
) (*pb.GetResponse, error) {
	out, err := h.getUC.Execute(ctx, dto.GetMediaRequest{
		Key: req.Key,
	})
	if err != nil {
		return nil, err
	}
	defer out.Reader.Close()

	buf := new(bytes.Buffer)
	if _, err := buf.ReadFrom(out.Reader); err != nil {
		return nil, err
	}

	return &pb.GetResponse{
		Data:        buf.Bytes(),
		ContentType: out.ContentType,
	}, nil
}

func (h *MediaHandler) Delete(
	ctx context.Context,
	req *pb.DeleteRequest,
) (*pb.DeleteResponse, error) {
	out, err := h.deleteUC.Execute(ctx, dto.DeleteMediaRequest{
		Key: req.Key,
	})
	if err != nil {
		return nil, err
	}

	return &pb.DeleteResponse{
		Ok: out.OK,
	}, nil
}