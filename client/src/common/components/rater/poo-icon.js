import React from "react";
import { SvgIcon } from "@material-ui/core";

const BLACK = "#000000";
const LIGHTER_BROWN = "#8b5f3c";
const WHITE = "#ffffff";

export default function PooIcon(props) {
  return (
    <SvgIcon {...props}>
      <g
        xmlns="http://www.w3.org/2000/svg"
        transform="translate(0,24) scale(0.0034,-0.0034)"
      >
        {/* BACKGROUND */}
        <path
          fill={LIGHTER_BROWN}
          d="M2605 6566 c-62 -27 -114 -118 -100 -174 3 -15 23 -56 44 -92 75 -126 92 -232 56 -339 -10 -30 -64 -123 -123 -210 -113 -169 -163 -262 -187 -356 -18 -71 -21 -228 -4 -303 6 -29 9 -55 7 -56 -1 -2 -53 -31 -115 -64 -207 -112 -338 -208 -459 -334 -127 -133 -197 -247 -249 -408 -22 -69 -28 -110 -33 -216 -2 -78 0 -159 7 -200 10 -61 50 -213 67 -258 4 -10 1 -16 -7 -16 -26 0 -223 -101 -305 -156 -375 -249 -518 -668 -404 -1181 l18 -83 -125 -65 c-334 -174 -535 -386 -636 -670 -40 -115 -52 -198 -52 -365 1 -227 43 -424 116 -546 136 -226 356 -377 627 -428 252 -48 537 -27 1126 84 116 22 281 51 367 65 l156 25 299 -40 c1335 -178 2014 -216 2654 -149 450 47 963 197 1153 337 244 180 397 453 397 710 0 407 -332 823 -791 991 l-27 10 25 68 c126 346 105 677 -59 944 -69 112 -215 258 -338 339 -79 52 -237 137 -282 152 -8 3 -6 28 7 90 25 123 17 305 -18 406 -90 254 -328 451 -667 552 -57 16 -103 30 -104 30 -1 0 0 33 2 73 10 199 -83 464 -256 726 -271 412 -760 825 -1185 1001 -233 96 -512 145 -602 106z"
        />
        {/* OUTLINE */}
        <path
          fill={BLACK}
          d="M2605 6566 c-62 -27 -114 -118 -100 -174 3 -15 23 -56 44 -92 75 -126 92 -232 56 -339 -10 -30 -64 -123 -123 -210 -113 -169 -163 -262 -187 -356 -18 -71 -21 -228 -4 -303 6 -29 9 -55 7 -56 -1 -2 -53 -31 -115 -64 -207 -112 -338 -208 -459 -334 -127 -133 -197 -247 -249 -408 -22 -69 -28 -110 -33 -216 -2 -78 0 -159 7 -200 10 -61 50 -213 67 -258 4 -10 1 -16 -7 -16 -26 0 -223 -101 -305 -156 -375 -249 -518 -668 -404 -1181 l18 -83 -125 -65 c-334 -174 -535 -386 -636 -670 -40 -115 -52 -198 -52 -365 1 -227 43 -424 116 -546 136 -226 356 -377 627 -428 252 -48 537 -27 1126 84 116 22 281 51 367 65 l156 25 299 -40 c1335 -178 2014 -216 2654 -149 450 47 963 197 1153 337 244 180 397 453 397 710 0 407 -332 823 -791 991 l-27 10 25 68 c126 346 105 677 -59 944 -69 112 -215 258 -338 339 -79 52 -237 137 -282 152 -8 3 -6 28 7 90 25 123 17 305 -18 406 -90 254 -328 451 -667 552 -57 16 -103 30 -104 30 -1 0 0 33 2 73 10 199 -83 464 -256 726 -271 412 -760 825 -1185 1001 -233 96 -512 145 -602 106z m208 -171 c272 -41 609 -211 909 -457 137 -114 356 -340 452 -469 199 -265 299 -499 300 -699 0 -148 -7 -163 -127 -262 -458 -380 -927 -651 -1379 -797 l-128 -41 -72 60 c-82 69 -183 122 -278 146 -96 24 -253 15 -344 -20 -144 -55 -275 -161 -365 -294 -23 -34 -46 -60 -51 -57 -5 3 -23 42 -40 87 -140 363 -92 660 148 919 107 117 283 239 495 345 l91 46 216 2 c230 2 260 7 430 64 115 40 200 79 200 92 0 6 -7 24 -15 40 l-15 28 -82 -34 c-200 -85 -440 -128 -598 -107 l-64 8 -19 60 c-27 87 -33 205 -13 288 21 90 61 166 173 329 106 155 146 236 163 327 19 107 -14 249 -86 362 -13 21 -24 41 -24 44 0 8 15 6 123 -10z m1828 -1915 c485 -123 711 -415 619 -798 -24 -99 -40 -133 -75 -156 -15 -10 -28 -16 -29 -14 -130 190 -239 283 -404 346 -60 24 -81 26 -202 26 -128 1 -139 -1 -211 -30 -269 -109 -452 -357 -525 -715 -19 -91 -24 -280 -11 -391 l8 -68 -78 -39 c-80 -40 -311 -143 -373 -167 -116 -44 -385 -141 -387 -140 -1 1 16 44 38 95 22 52 52 142 67 200 23 95 26 125 26 281 0 128 -5 195 -17 248 -35 153 -92 293 -159 390 -17 24 -28 45 -26 47 2 3 59 23 126 45 435 144 912 421 1357 787 55 46 109 83 120 83 11 0 72 -13 136 -30z m-2131 -679 c418 -130 647 -728 478 -1251 -70 -218 -217 -403 -387 -488 -102 -51 -172 -66 -286 -60 -307 17 -565 297 -641 697 -24 125 -22 320 5 449 74 352 286 605 562 667 79 18 183 13 269 -14z m2218 -5 c272 -93 467 -380 513 -756 54 -442 -170 -890 -507 -1012 -73 -26 -217 -35 -298 -18 -140 29 -295 140 -393 282 -63 91 -83 131 -121 238 -49 141 -65 259 -59 428 10 295 105 523 290 698 166 159 373 209 575 140z m578 -352 c328 -134 513 -281 624 -495 61 -118 82 -210 83 -359 0 -179 -33 -316 -127 -527 -56 -126 -108 -195 -261 -348 -495 -498 -1352 -880 -2685 -1200 -323 -77 -497 -114 -670 -141 -90 -14 -281 -47 -425 -74 -460 -86 -532 -94 -785 -95 -201 0 -234 2 -315 23 -193 49 -357 159 -458 309 -36 54 -52 90 -71 169 -139 553 57 953 594 1217 l105 52 150 -3 c185 -4 497 12 752 38 l191 20 74 -35 c182 -86 363 -85 546 5 63 32 105 62 175 130 91 87 96 90 192 120 206 66 570 212 733 294 107 53 106 53 121 -1 16 -62 90 -218 130 -277 81 -118 212 -231 324 -280 65 -29 188 -56 254 -56 187 1 404 118 532 286 75 99 154 268 188 399 26 103 28 122 27 305 -1 179 -3 203 -27 293 -15 54 -38 124 -51 155 -22 52 -23 59 -9 75 20 21 40 22 89 1z m-3645 -121 c-42 -123 -61 -219 -68 -349 -17 -307 85 -618 264 -805 53 -55 54 -58 32 -64 -67 -15 -365 -36 -605 -42 l-271 -6 -21 79 c-58 215 -73 453 -38 609 54 246 227 451 488 578 89 43 239 100 246 92 2 -2 -10 -43 -27 -92z m4384 -1415 c269 -88 538 -337 633 -586 97 -252 45 -492 -150 -698 -104 -109 -163 -150 -296 -204 -301 -122 -628 -195 -1042 -232 -173 -15 -753 -15 -980 1 -224 15 -640 55 -890 85 -410 50 -640 81 -640 87 0 3 46 16 103 28 477 105 1087 282 1476 428 454 170 876 390 1168 609 181 136 419 376 482 487 18 31 27 30 136 -5z"
        />
        {/* SCLERAS */}
        <path
          fill={WHITE}
          d="M2605 6566 m2038 -2080 m-2131 -679 c418 -130 647 -728 478 -1251 -70 -218 -217 -403 -387 -488 -102 -51 -172 -66 -286 -60 -307 17 -565 297 -641 697 -24 125 -22 320 5 449 74 352 286 605 562 667 79 18 183 13 269 -14z m2218 -5 c272 -93 467 -380 513 -756 54 -442 -170 -890 -507 -1012 -73 -26 -217 -35 -298 -18 -140 29 -295 140 -393 282 -63 91 -83 131 -121 238 -49 141 -65 259 -59 428 10 295 105 523 290 698 166 159 373 209 575 140z"
        />
        {/* LEFT PUPIL */}
        <path
          fill={BLACK}
          d="M2274 3390 c-72 -28 -145 -103 -188 -193 -52 -105 -67 -175 -67 -302 0 -127 15 -197 66 -302 62 -127 155 -200 265 -210 48 -5 67 -1 119 22 228 103 322 494 187 780 -85 179 -239 262 -382 205z"
        />
        {/* RIGHT PUPIL */}
        <path
          fill={BLACK}
          d="M4499 3417 c-116 -33 -220 -161 -265 -328 -23 -87 -24 -262 -1 -349 42 -159 141 -290 246 -325 231 -76 436 160 435 500 -1 129 -19 209 -72 308 -81 155 -213 230 -343 194z"
        />
        {/* MOUTH */}
        <path
          fill={WHITE}
          d="M2325 1731 c-111 -27 -161 -111 -121 -204 34 -80 249 -287 415 -398 576 -388 1264 -349 1817 102 109 89 259 252 290 316 26 53 27 57 13 97 -28 82 -131 104 -334 71 -552 -91 -1231 -90 -1859 0 -183 27 -177 26 -221 16z"
        />
      </g>
    </SvgIcon>
  );
}