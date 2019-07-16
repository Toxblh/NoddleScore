type NoddleScoreOutput = {
  report_data: string
  updated_date: string
  score: number
}

declare function getNoddleScore(creds: { login: string; pass: string }): Promise<NoddleScoreOutput>
