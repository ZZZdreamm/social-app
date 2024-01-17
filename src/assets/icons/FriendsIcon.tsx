import { ThemeColor } from "globals/constants";
import styled from "styled-components";

interface Props {
  size?: string;
  color?: ThemeColor;
}

export function FriendsIcon({
  size = "24",
  color = "reverseToNavColor",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 376 376"
      version="1.1"
    >
      <Path d="" stroke="none" fill-rule="evenodd" color={color} />
      <Path
        d="M 105.568 80.532 C 86.567 85.746, 70.566 101.915, 65.475 121.045 C 63.125 129.878, 63.560 143.505, 66.489 152.776 C 69.334 161.782, 76.449 172.687, 83.173 178.350 C 87.468 181.967, 87.482 181.999, 85.005 182.678 C 83.632 183.054, 79.056 185.090, 74.835 187.203 C 46.946 201.162, 26.989 227.154, 20.509 257.958 C 19.716 261.728, 18.761 270.228, 18.387 276.845 C 17.663 289.660, 18.523 294.139, 22.071 296.038 C 23.186 296.635, 60.645 297, 120.760 297 L 217.651 297 219.826 294.686 C 221.822 292.560, 222 291.334, 222 279.686 L 222 267 287.066 267 C 327.595 267, 352.821 266.631, 353.961 266.021 C 357.267 264.251, 358.108 259.556, 356.902 249.596 C 352.747 215.293, 331.342 187.595, 299.189 174.915 L 296.878 174.003 300.784 169.252 C 309.687 158.422, 312.427 150.312, 311.826 136.571 C 311.479 128.623, 310.960 126.448, 307.850 119.900 C 303.131 109.963, 296.050 102.882, 286.065 98.113 C 278.731 94.610, 278.149 94.500, 267 94.500 C 256.073 94.500, 255.154 94.664, 248.557 97.788 C 239.667 101.998, 234.161 106.544, 229.561 113.473 C 224.064 121.755, 221.894 128.980, 221.894 139 C 221.894 151.401, 225.609 161.117, 233.836 170.235 L 237.207 173.971 234.853 174.867 C 220.341 180.390, 206.012 190.718, 196.942 202.193 L 193.229 206.890 186.485 201.059 C 179.050 194.630, 167.490 187.489, 159 184.081 L 153.500 181.873 160.569 174.686 C 171.324 163.753, 177 150.333, 177 135.839 C 177 109.944, 159.362 87.018, 134.448 80.528 C 127.297 78.666, 112.362 78.668, 105.568 80.532 M 113.233 95.122 C 105.905 96.327, 96.539 101.313, 91.095 106.906 C 75.257 123.176, 75.879 149.193, 92.481 164.894 C 100.128 172.126, 107.380 175.269, 117.671 175.812 C 137.048 176.834, 153.252 165.875, 159.057 147.824 C 163.581 133.754, 160.260 118.537, 150.353 107.946 C 140.474 97.384, 127.252 92.817, 113.233 95.122 M 261.920 110.063 C 238.653 113.732, 229.337 143.102, 246.118 159.882 C 252.198 165.963, 258.110 168.369, 267 168.381 C 273.152 168.389, 275.399 167.922, 279.500 165.782 C 298.447 155.895, 302.253 131.864, 287.114 117.704 C 280.200 111.236, 271.404 108.568, 261.920 110.063 M 250 186.551 C 235.676 189.619, 217.338 201.363, 208.063 213.408 C 204.112 218.538, 203.766 219.396, 204.908 221.225 C 209.165 228.040, 213.812 237.487, 216.113 244 L 218.762 251.500 280.011 251.758 L 341.260 252.015 340.588 246.951 C 339.769 240.775, 335.706 229.093, 332.258 223 C 327.919 215.332, 319.416 205.484, 312.815 200.481 C 304.803 194.410, 291.914 188.301, 283.234 186.462 C 274.807 184.676, 258.552 184.720, 250 186.551 M 107.798 193.011 C 89.333 195.941, 72.716 204.395, 59.556 217.556 C 44.486 232.625, 36.306 250.900, 34.400 273.755 L 33.712 282 120 282 L 206.287 282 205.743 271.750 C 203.839 235.893, 177.330 204.209, 141.500 194.969 C 132.375 192.615, 116.212 191.677, 107.798 193.011"
        stroke="none"
        fill-rule="evenodd"
        color={color}
      />
    </svg>
  );
}

const Path = styled.path<{
  color: ThemeColor;
}>`
  fill: ${(props) => props.theme.colors[props.color]};
`;