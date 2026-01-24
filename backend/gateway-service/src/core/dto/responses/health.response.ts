import { ApiProperty } from "@nestjs/swagger";

export class HealthResponse {
  @ApiProperty({
    example: "OK",
  })
  public status: string;

  @ApiProperty({
    example: "2024-06-01T12:34:56.789Z",
  })
  public timestamp: string;

  public constructor(status: string, timestamp: string) {
    this.status = status;
    this.timestamp = timestamp;
  }
}
