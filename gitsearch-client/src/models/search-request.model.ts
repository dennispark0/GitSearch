export interface SearchRequest {
    q: string;
    per_page?: number;
    page?: number;
}

export interface SortableSearchRequest extends SearchRequest {
    sort?: string;
    order?: string;
}

export interface SearchTopicsRequest extends SearchRequest { }

export interface SearchCodeRequest extends SortableSearchRequest { }
export interface SearchCommitsRequest extends SortableSearchRequest { }
export interface SearchIssuesRequest extends SortableSearchRequest { }
export interface SearchRepositoryRequest extends SortableSearchRequest { }
export interface SearchLabelsRequest extends SortableSearchRequest {
    repository_id: number;
}



