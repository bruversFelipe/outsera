import { useCallback, useEffect, useState } from "react";

import { getMaxMinWinIntervalForProducers } from "../../services/getMaxMinWinIntervalForProducers";
import { getYearsWithMultipleWinners } from "../../services/getYearsWithMultipleWinners";
import { getStudiosWithWinCount } from "../../services/getStudiosWithWinCount";
import { getWinnersByYear } from "../../services/getWinnersByYear";
import { getErrorMessage } from "../../utils/getErrorMessage";

import type { DashboardState } from "./types";

const useDashboardHook = () => {
  const [state, setState] = useState<DashboardState>({
    cardYearsWithMultipleWinners: {
      years: [],
      loading: true,
      error: undefined,
    },
    cardWinnersByYear: {
      winners: [],
      loading: false,
      error: undefined,
    },
    cardStudiosWithWinCount: {
      studios: [],
      loading: true,
      error: undefined,
    },
    cardIntervalForProducers: {
      min: [],
      max: [],
      loading: true,
      error: undefined,
    },
  });

  const loadYearsWithMultipleWinners = useCallback(async () => {
    try {
      const { years } = await getYearsWithMultipleWinners();
      setState((prev) => ({
        ...prev,
        cardYearsWithMultipleWinners: {
          ...prev.cardYearsWithMultipleWinners,
          years,
          loading: false,
        },
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        cardYearsWithMultipleWinners: {
          ...prev.cardYearsWithMultipleWinners,
          loading: false,
          error: getErrorMessage(error, "Erro ao carregar anos com múltiplos vencedores"),
        },
      }));
    }
  }, []);

  const loadStudiosWithWinCount = useCallback(async () => {
    try {
      const { studios } = await getStudiosWithWinCount();
      const top3 = [...studios].sort((a, b) => b.winCount - a.winCount).slice(0, 3);

      setState((prev) => ({
        ...prev,
        cardStudiosWithWinCount: {
          ...prev.cardStudiosWithWinCount,
          studios: top3,
          loading: false,
        },
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        cardStudiosWithWinCount: {
          ...prev.cardStudiosWithWinCount,
          loading: false,
          error: getErrorMessage(error, "Erro ao carregar a contagem de estúdios vencedores"),
        },
      }));
    }
  }, []);

  const loadIntervalProducers = useCallback(async () => {
    try {
      const { max, min } = await getMaxMinWinIntervalForProducers();

      setState((prev) => ({
        ...prev,
        cardIntervalForProducers: {
          ...prev.cardIntervalForProducers,
          min,
          max,
          loading: false,
        },
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        cardIntervalForProducers: {
          ...prev.cardIntervalForProducers,
          loading: false,
          error: getErrorMessage(error, "Erro ao carregar o intervalo de produtores"),
        },
      }));
    }
  }, []);

  const loadWinnersByYear = useCallback(async (_year: number) => {
    try {
      const winners = await getWinnersByYear(_year);
      setState((prev) => ({
        ...prev,
        cardWinnersByYear: { ...prev.cardWinnersByYear, loading: false, winners },
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        cardWinnersByYear: {
          ...prev.cardWinnersByYear,
          loading: false,
          error: getErrorMessage(error, "Erro ao carregar vencedores por ano"),
        },
      }));
    }
  }, []);

  useEffect(() => {
    loadYearsWithMultipleWinners();
    loadStudiosWithWinCount();
    loadIntervalProducers();
  }, [loadYearsWithMultipleWinners, loadStudiosWithWinCount, loadIntervalProducers]);

  return { state, loadWinnersByYear };
};

export default useDashboardHook;
