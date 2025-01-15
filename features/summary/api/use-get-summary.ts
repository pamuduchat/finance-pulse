import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { client } from "@/lib/hono";
import { convertMilliunitsToAmount } from "@/lib/utils";

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: { from, to, accountId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      const { data } = await response.json();
      return {
        ...data,
        income: convertMilliunitsToAmount(data.incomeAmount),
        expenses: convertMilliunitsToAmount(data.expensesAmount),
        remaining: convertMilliunitsToAmount(data.remainingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertMilliunitsToAmount(category.value),
        })),
        days: data.days.map((day) => ({
          ...day,
          income: convertMilliunitsToAmount(day.income),
          expenses: convertMilliunitsToAmount(day.expenses),
        })),
      };
    },
  });
  return query;
};
