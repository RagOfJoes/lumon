import { createSignal } from "solid-js";
import type { ComponentProps } from "solid-js";

export type DatumProps = ComponentProps<"span">;

export function Datum(props: DatumProps) {
	const [movement, _] = createSignal({
		axis: Math.round(Math.random() * 1) ? "x" : "y",
		duration: Math.random() * 4 + 1,
		offset: Math.random(),
	});

	return (
		<span
			class="datum font-poppins text-2xl will-change-transform"
			data-axis={movement().axis}
			style={{
				"--movement-axis": movement().axis,
				"--movement-duration": `${movement().duration}s`,
				"--movement-offset": `${movement().offset}rem`,
			}}
		>
			{props.children}
		</span>
	);
}
