export interface SendSmsRequest {
	sender?: string;
	destination: string;
	text: string;
}

export interface SendSmsResponse {
	message_id: string;
	tamplate_resource_id: string;
}
