interface HttpResponse<C> {
  statusCode: number;
  message?: string;
  content: C;
  dateTime: string;
}
