import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const strokeWidth = 46;

const filmRollDots = 5;

export const SecondO: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const spr = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});
	const innerSpr = spring({
		fps,
		frame: frame - 7,
		config: {
			damping: 200,
		},
	});

	const devolve = spring({
		fps,
		frame: frame - 30,
		config: {damping: 200, mass: 0.7},
	});

	const secondR = interpolate(devolve, [0, 1], [0, 63.5 - strokeWidth / 2]);

	const dotScale = Math.max(0, 1 - devolve - 0.01);

	const toMove = 600;
	const right = interpolate(innerSpr, [0, 1], [toMove, 0]);
	const r = 86.5;
	const circumference = r * 2 * Math.PI;
	const rotations = toMove / circumference;

	const rotate = interpolate(innerSpr, [0, 1], [0, -rotations * Math.PI * 2]);

	return (
		<g
			style={{
				transformBox: 'fill-box',
				transformOrigin: 'center center',
				transform: `translateX(${right}px) rotate(${rotate}rad)`,
			}}
		>
			<circle
				cx="1642.5"
				cy="421.5"
				r={r}
				stroke="black"
				fill="black"
				style={{
					transformBox: 'fill-box',
					transformOrigin: 'center center',
				}}
			/>
			<circle
				cx="1642.5"
				cy="421.5"
				r={secondR}
				fill="white"
				style={{
					transformBox: 'fill-box',
					transformOrigin: 'center center',
				}}
			/>
			{new Array(filmRollDots).fill(true).map((f, i) => {
				return (
					<circle
						cx="1642.5"
						cy="421.5"
						r={14}
						fill="white"
						style={{
							transformBox: 'fill-box',
							transformOrigin: 'center center',
							transform: `translateX(${
								Math.sin((i / filmRollDots) * Math.PI * 2) *
								(50 + (1 - dotScale) * 100)
							}px) translateY(${
								Math.cos((i / filmRollDots) * Math.PI * 2) *
								(50 + (1 - dotScale) * 100)
							}px) `,
						}}
					/>
				);
			})}
		</g>
	);
};
