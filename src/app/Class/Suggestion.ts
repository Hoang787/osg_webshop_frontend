

export class Suggestion {

  category: string;
  suggestions: string[];

  constructor(category: string, listSuggestions: string[]) {
    this.category = category;
    this.suggestions = listSuggestions;
  };


}
