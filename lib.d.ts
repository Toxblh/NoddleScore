type NoddleScoreOutput = {
  report_date: string
  updated_date: string
  score: number
}

declare function getNoddleScore(creds: { login: string; pass: string }): Promise<NoddleScoreOutput>
