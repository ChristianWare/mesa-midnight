import { SVGProps } from "react";

export default function CarFront(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 -55 400 400'
      fill='currentColor'
      aria-hidden='true'
      {...props}
    >
      {/* Windshield */}
      <path d='M95 6H305Q314 6 318 14L340 62Q345 74 332 74H68Q55 74 60 62L82 14Q86 6 95 6Z' />
      {/* Body, mirrors and wheels */}
      <path d='M200 160H138Q126 160 125 150V121Q125 112 116 112H58Q44 112 52 122L74 145Q79 151 88 151H112Q120 151 120 158L104 204Q101 212 92 212H26Q16 212 16 222V264Q16 276 28 276H80Q92 276 92 264V258H308V264Q308 276 320 276H372Q384 276 384 264V222Q384 212 374 212H308Q299 212 296 204L280 158Q280 151 288 151H312Q321 151 326 145L348 122Q356 112 342 112H284Q275 112 275 121V150Q274 160 262 160Z' />
    </svg>
  );
}
