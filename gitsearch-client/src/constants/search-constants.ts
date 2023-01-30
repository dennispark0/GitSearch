
export type Category = 'all' | 'name' | 'description' | 'topics' | 'readme';
export const initialCategories = new Set<Category>(['all', 'name', 'description', 'topics', 'readme']);
export type Categories = typeof initialCategories;

export const extraFilters = {
    user : '',
    created: '',
    pushed: '',
    language: '',
    stars: '',
    forks: '',
    size: '',
    license: '',
}
export type ExtraFilters = typeof extraFilters & { [key : string] : string };
export type ExtraFilterLabel = 'user' | 'created' | 'pushed' | 'language' | 'stars' | 'forks' | 'license';

export const popularLanguages = [
    'C',
    'C#',
    'C++',
    'CoffeeScript',
    'CSS',
    'Dart',
    'DM',
    'Elixir',
    'Go',
    'Groovy',
    'HTML',
    'Java',
    'JavaScript',
    'Kotlin',
    'Objective-C',
    'Perl',
    'PHP',
    'PowerShell',
    'Python',
    'Ruby',
    'Rust',
    'Scala',
    'Shell',
    'Swift',
    'Typescript',
];