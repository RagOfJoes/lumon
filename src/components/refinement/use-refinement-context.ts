import type { Accessor } from "solid-js";

import type { Datum } from "@/components/datum";
import { createContext } from "@/lib/create-context";

export type UseRefinementContext = [
	state: {
		data: Accessor<Datum[]>;
		numOfCols: number;
		numOfRows: number;
		spacing: number;
	},
	actions: {},
];

export const [RefinementProvider, useRefinementContext] = createContext<UseRefinementContext>({
	name: "Refinement",
	strict: true,
});
