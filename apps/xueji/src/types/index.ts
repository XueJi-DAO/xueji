export * from './models'

interface Person {
  name: string
  born: number
  movies: Movies
}

interface Movie {
  title: string
  tagline: string
  released: number
  actors: Actors
  directors: Directors
}

interface Film {
  title: string
  director: string
  releaseDate: string
}

export type Films = Partial<Film>[]

export type Movies = Partial<Movie>[]

export type Actors = Partial<Person>[]

export type Directors = Partial<Person>[]

export type { TypeA } from './package-1'
