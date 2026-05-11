export interface Intro {
  headline: string
  subhead: string
}

export interface Suggestion {
  id: string
  title: string
  description: string
  icon: string
}

export interface TakeActionProps {
  intro: Intro
  suggestions: Suggestion[]
}
