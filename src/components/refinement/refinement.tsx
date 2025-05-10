import { For, createSignal, onMount } from "solid-js";

import clsx from "clsx";

import { Datum } from "@/components/datum";
import { Lumon } from "@/components/lumon";

const COLUMN_LENGTH = 25;
const ROW_LENGTH = 20;

export function Refinement() {
	const [data, setData] = createSignal<number[][]>([]);

	onMount(() => {
		const newData: number[][] = [];
		for (let i = 0; i < ROW_LENGTH; i++) {
			const row = [];
			for (let j = 0; j < COLUMN_LENGTH; j++) {
				row.push(Math.round(Math.random() * 9));
			}
			newData.push(row);
		}

		setData(newData);
	});

	return (
		<main class="grid h-full w-full grid-rows-12">
			<section class="row-span-2">
				<div
					class={clsx(
						"relative flex h-full w-full items-center justify-center px-15 pr-30",

						"max-lg:px-5 max-lg:pr-15",
					)}
				>
					<div class="flex w-full items-center justify-between border-[2.5px] border-r-0 border-[#beeeff] px-2 py-1">
						<h1 class="font-poppins text-5xl leading-none font-semibold">Dranesville</h1>

						<div
							class={clsx(
								"absolute top-1/2 right-15 flex -translate-y-1/2 items-center justify-end gap-4",

								"max-lg:right-5",
							)}
						>
							<p
								class={clsx(
									"text-shadow-outline font-poppins text-[38px] leading-none tracking-wider text-[#051124]",

									"max-lg:hidden",
								)}
							>
								0% Complete
							</p>

							<Lumon
								class={clsx(
									"mt-[1px] h-24 w-auto",

									"max-lg:mt-0.75 max-lg:h-38",
								)}
							/>
						</div>
					</div>
				</div>

				<div class="mt-auto h-2 w-full border-t-2 border-b-2 border-t-[#beeeff] border-b-[#beeeff]" />
			</section>

			<section class="row-span-8 mt-2 flex flex-col">
				<div class="flex h-screen flex-col overflow-hidden">
					<For each={data()}>
						{(row) => (
							<div class="grid h-full w-full grid-cols-25">
								<For each={row}>
									{(column) => (
										<div class="flex items-center justify-center p-2">
											<Datum>{column}</Datum>
										</div>
									)}
								</For>
							</div>
						)}
					</For>
				</div>

				<div class="mt-auto h-2 w-full border-t-2 border-b-2 border-t-[#beeeff] border-b-[#beeeff]" />
			</section>

			<section class="row-span-2" />
		</main>
	);
}
