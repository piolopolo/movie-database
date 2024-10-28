export interface Movie {
    [x: string]: any;
    id: number;              
    title: string;            
    image: string;           
    score: number;       
    synopsis?: string;         
    trailerUrl?: string;       
    year?: string;              
  }
  