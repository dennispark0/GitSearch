
export type Category = "all" | "name" | "description" | "topics" | "readme";
export const initialCategories = new Set<Category>(["all", "name", "description", "topics", "readme"]);
export type Categories = typeof initialCategories;


export const categoryReducer = (state: Categories, action: Category) => {
    if (action === "all") {
        return state.has("all") ? new Set<Category>() : new Set(initialCategories);
    }
    const newState = new Set(state);
    //if any flag is toggled, we no longer need the 'all' flag
    newState.delete("all");
    if (!newState.delete(action)) {
        newState.add(action);
    }
    return newState;
};

export const extraFilters = {
    repo: "",
    user: "",
    size: "",
    followers: "",
    forks: "",
    stars: "",
    created: "",
    pushed: "",
    language: "",
    topic: "",
    license: "",
};