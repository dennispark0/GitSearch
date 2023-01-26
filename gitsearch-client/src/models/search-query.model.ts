
export type InQualifier = "name" | "description" | "topics" | "readme";

export interface SearchRepositoryQuery {
    in? : InQualifier[];
    repo? : string;
    user? : string;
    size? : string;

}