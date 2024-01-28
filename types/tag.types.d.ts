export type GetTopInteractedTagsParams = {
  userId: string
  limit?: number
}

export type GetAllTagsParams = {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}