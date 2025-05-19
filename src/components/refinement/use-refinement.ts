import { createSignal, onMount } from "solid-js";

import { Datum } from "@/components/datum";

import type { UseRefinementContext } from "./use-refinement-context";

// NOTE: Allow these to be customizable
const COLUMN_LENGTH = 25;
const ROW_LENGTH = 20;
const SPACING = 60;

export function useRefinement(): UseRefinementContext {
	const [data, setData] = createSignal<Datum[]>([]);

	onMount(() => {
		// Initialize data
		const newData: Datum[] = [];
		for (let i = 0; i < ROW_LENGTH * COLUMN_LENGTH; i++) {
			newData.push(
				new Datum({
					datum: Math.round(Math.random() * 9),
					position: {
						x: 0,
						y: 0,
					},
				}),
			);
		}

		// Set data signal
		setData(newData);
	});

	return [
		{
			data,
			numOfCols: COLUMN_LENGTH,
			numOfRows: ROW_LENGTH,
			spacing: SPACING,
		},
		{},
	];
}
