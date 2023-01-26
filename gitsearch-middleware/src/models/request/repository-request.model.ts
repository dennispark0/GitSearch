import { SearchRequest } from "./search-request.model";

export interface RepositorySearchRequest extends SearchRequest {
    language? : string;
    sort? : 'stars' | 'forks' | 'help-wanted-issues' | 'updated';
    order? : 'desc' | 'asc';
}