export interface DeleteReceiveRequest {
  item_id: string;
  user_id: string;
}

export interface DeleteReceiveResponse {
  status: string;
  message: string;
}
