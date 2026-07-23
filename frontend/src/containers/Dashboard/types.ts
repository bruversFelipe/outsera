import type { YearWithMultipleWinners } from "../../types/yearWithMultipleWinners";
import type { ProducerInterval } from "../../types/producerInterval";
import type { StudioWinCount } from "../../types/studioWinCount";
import type { WinnerByYear } from "../../types/winnerByYear";

export interface DashboardState {
  cardYearsWithMultipleWinners: {
    years: YearWithMultipleWinners[];
    loading: boolean;
    error?: string;
  };
  cardWinnersByYear: {
    winners: WinnerByYear[];
    loading: boolean;
    error?: string;
  };
  cardStudiosWithWinCount: {
    studios: StudioWinCount[];
    loading: boolean;
    error?: string;
  };
  cardIntervalForProducers: {
    min: ProducerInterval[];
    max: ProducerInterval[];
    loading: boolean;
    error?: string;
  };
}
