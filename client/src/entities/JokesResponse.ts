export interface JokeResponse {
    current_page:  number;
    limit:         number;
    next_page:     number;
    previous_page: number;
    results:       Result[];
    search_term:   string;
    status:        number;
    total_jokes:   number;
    total_pages:   number;
}

export interface Result {
    id:   string;
    joke: string;
}