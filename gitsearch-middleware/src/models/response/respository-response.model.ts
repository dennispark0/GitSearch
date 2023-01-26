export interface RepositoryResponse {
    total_count? : number;
    incomplete_results? : boolean;
    items? : Repository[];
}

export interface Repository {
    id? : number;
    node_id? : number;
}