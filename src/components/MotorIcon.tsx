import React from "react";

interface MotorIconProps {
  speed: number; // Velocidade do motor (0 a 5000 RPM)
  direction: "CW" | "CCW"; // Direção: Horário (CW) ou Anti-Horário (CCW)
  status: "ON" | "OFF"; // Status do motor
}

const MotorIcon: React.FC<MotorIconProps> = ({ speed, direction, status }) => {
  // Definir se o ícone deve girar: apenas se o status for "ON" e speed > 0
  const shouldRotate = status === "ON" && speed > 0;

  // Calcular a duração da rotação usando uma escala não linear para maior sensibilidade em baixas velocidades
  const rotationDuration = shouldRotate
    ? Math.max(2, 12 - 10 * Math.sqrt(speed / 5000))
    : 0; // Se não deve girar, duração é 0

    return (
      <div
        style={{
          width: "70px",
          height: "70px",
          position: "relative",
          display: "inline-block", // Default display style
          animation: shouldRotate
            ? `spin ${rotationDuration}s linear infinite ${direction === "CCW" ? "reverse" : "normal"}`
            : "none", // Apply animation only if shouldRotate is true
          filter: status === "ON" ? "none" : "grayscale(100%) brightness(0.5)",
          opacity: status === "ON" ? 1 : 0.6,
          transition: "transform 0.5s ease, filter 0.3s, opacity 0.3s",
        }}
        className="hidden 2xl:block" // Hide the icon by default, show it only on xl screens and above
      >
      {/* SVG do motor */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 856 763"
        className="hidden 2xl:flex"
        width="100%"
        height="100%"
        style={{
          fill: status === "ON" ? "#5DA9E9" : "#666",
          transition: "fill 0.3s",
        }}
      >
       
        <g transform="translate(0.000000,763.000000) scale(0.100000,-0.100000)" stroke="none">
          <path d="M4785 7604 c-139 -36 -237 -113 -297 -233 l-33 -66 -3 -967 -2 -968
          -248 0 c-277 0 -322 -7 -396 -61 -52 -36 -99 -104 -115 -164 -6 -23 -11 -131
          -11 -252 l0 -213 -555 0 c-536 0 -556 -1 -610 -21 -85 -32 -158 -97 -197 -176
          l-33 -68 -3 -284 -3 -284 -242 6 c-189 4 -262 10 -332 26 -292 65 -487 169
          -680 365 -214 216 -337 449 -411 783 -14 61 -18 130 -19 312 -2 231 -2 235
          -25 253 -32 26 -76 23 -104 -7 -28 -30 -36 -92 -36 -266 0 -467 164 -875 479
          -1190 230 -229 448 -346 775 -415 102 -21 157 -26 359 -31 l237 -6 0 -374 c0
          -225 4 -382 10 -393 19 -35 64 -40 356 -40 l284 0 0 -340 0 -340 -290 0 c-304
          0 -338 -4 -354 -45 -3 -9 -6 -344 -6 -743 0 -783 0 -775 53 -858 38 -60 108
          -119 173 -145 l59 -24 2295 0 2295 0 60 24 c67 27 150 103 183 168 40 78 43
          137 40 870 l-3 702 -23 23 c-22 23 -25 23 -347 26 l-325 3 0 339 0 340 309 0
          c193 0 319 4 339 11 65 22 63 1 60 791 l-3 713 -24 58 c-35 89 -95 156 -175
          197 l-69 35 -568 3 -568 2 -3 243 c-3 269 -4 274 -77 350 -81 86 -130 97 -433
          97 l-248 0 0 926 c0 1037 2 1012 -69 1122 -75 116 -190 182 -326 188 -44 1
          -89 1 -100 -2z m181 -178 c27 -13 67 -43 87 -67 70 -81 67 -40 67 -1066 l0
          -923 -255 0 -255 0 0 931 c0 700 3 942 12 973 15 51 108 147 158 163 61 19
          130 15 186 -11z m839 -2233 c11 -6 31 -23 45 -38 l25 -27 0 -221 0 -222 -1010
          0 -1010 0 -3 195 c-3 213 0 248 26 280 38 46 36 46 999 45 659 0 913 -4 928
          -12z m1373 -702 c42 -22 63 -43 86 -88 14 -29 16 -104 16 -698 l0 -665 -337 0
          c-186 0 -463 -1 -616 -3 l-277 -2 0 263 c0 303 -4 324 -69 342 -24 8 -386 10
          -1139 8 l-1104 -3 -24 -28 -24 -28 0 -275 0 -274 -620 0 -620 0 0 665 c0 715
          -1 705 51 751 64 57 -121 53 2362 54 2216 0 2279 -1 2315 -19z m-1450 -1011
          l152 0 0 -276 c0 -160 4 -283 10 -294 19 -35 64 -40 381 -40 l309 0 0 -340 0
          -340 -320 0 c-336 0 -368 -4 -384 -45 -3 -9 -6 -140 -6 -291 l0 -274 -1015 0
          -1015 0 0 279 c0 260 -1 280 -19 302 l-19 24 -356 3 -356 3 0 339 0 339 354 3
          354 3 26 24 26 24 0 279 0 278 518 2 c284 2 672 2 862 1 190 -1 414 -2 498 -3z
          m-2046 -1739 l3 -279 24 -26 24 -26 1127 0 1127 0 24 26 24 26 3 279 3 279
          620 0 620 0 -3 -667 -3 -668 -23 -42 c-15 -30 -38 -52 -75 -73 l-52 -30 -2261
          0 -2260 0 -52 26 c-37 19 -59 38 -77 68 l-25 43 0 671 0 672 615 0 614 0 3
          -279z" />
        </g>
      </svg>

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default MotorIcon;
