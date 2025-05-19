import clsx from "clsx";

import { Lumon } from "@/components/lumon";

export function RefinementHeader() {
	return (
		<section class="row-span-2">
			<div
				class={clsx(
					"relative flex h-full w-full min-w-0 items-center justify-center px-15 pr-30",

					"max-lg:px-5 max-lg:pr-15",
				)}
			>
				<div class="flex w-full min-w-0 items-center justify-between border-[2.5px] border-r-0 border-[#beeeff] px-2 py-1">
					<h1 class="font-poppins text-5xl leading-none font-semibold select-none">Dranesville</h1>

					<div
						class={clsx(
							"absolute top-1/2 right-15 flex -translate-y-1/2 items-center justify-end gap-4",

							"max-lg:right-5",
						)}
					>
						<p
							class={clsx(
								"text-shadow-outline font-poppins text-[38px] leading-none tracking-wider text-[#051124] select-none",

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
	);
}
