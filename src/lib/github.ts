/** One day of the contribution calendar. `level` is 0 to 4. */
export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type Contributions = {
  /** Sum over `days`. */
  total: number;
  days: ContributionDay[];
};

const DAY = 60 * 60 * 24;

/**
 * Public GitHub contributions, refreshed once a day: a calendar year (January
 * to December, days still to come included with a count of 0), or the last
 * 12 months by default. Null when the API cannot be reached or answers with
 * something unexpected.
 */
export async function getContributions(
  username: string,
  year: number | "last" = "last",
): Promise<Contributions | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`,
      { next: { revalidate: DAY } },
    );
    if (!res.ok) return null;

    const data: { contributions?: ContributionDay[] } = await res.json();
    if (!Array.isArray(data.contributions)) return null;

    const days = data.contributions;
    return { total: days.reduce((sum, d) => sum + d.count, 0), days };
  } catch {
    return null;
  }
}
