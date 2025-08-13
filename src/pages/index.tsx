import AppLayout from "@/components/app-layout";
import Particles from "../components/react-bits/background/Particles/Particles";
import TextType from "../components/react-bits/textanimations/TextType/TextType";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

// Gallery4 Component and Types
export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  techstack: string[];
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
}

const portfolioData = [
  {
    id: "bsgo",
    title: "Bank SulutGo",
    description:
      "Redesign the web interface with fresher components but still maintain the web structure.",
    href: "bsgo.urbanswift.xyz",
    image: "./projects/bsgo.png",
    techstack: ["React", "Vite", "Tailwind"],
  },
  {
    id: "dms",
    title: "Document Management System",
    description:
      "Document Management System that continues to use the starter kit from Laravel 12.",
    href: "https://github.com/JayChristofel/DMS-Laravel-12-React-Starter-Kit",
    image:
      "./projects/dms.png",
    techstack: ["Laravel", "Vite", "React", "Tailwind", "SQLite"],
  },
];

// Function to get tech stack icons
const getTechIcon = (tech: string) => {
  const techIcons: { [key: string]: JSX.Element } = {
    React: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 32 32"
      >
        <path
          fill="#0288d1"
          d="M16 12c7.444 0 12 2.59 12 4s-4.556 4-12 4s-12-2.59-12-4s4.556-4 12-4m0-2c-7.732 0-14 2.686-14 6s6.268 6 14 6s14-2.686 14-6s-6.268-6-14-6"
        />
        <path fill="#0288d1" d="M16 14a2 2 0 1 0 2 2a2 2 0 0 0-2-2" />
        <path
          fill="#0288d1"
          d="M10.458 5.507c2.017 0 5.937 3.177 9.006 8.493c3.722 6.447 3.757 11.687 2.536 12.392a.9.9 0 0 1-.457.1c-2.017 0-5.938-3.176-9.007-8.492C8.814 11.553 8.779 6.313 10 5.608a.9.9 0 0 1 .458-.1m-.001-2A2.87 2.87 0 0 0 9 3.875C6.13 5.532 6.938 12.304 10.804 19c3.284 5.69 7.72 9.493 10.74 9.493A2.87 2.87 0 0 0 23 28.124c2.87-1.656 2.062-8.428-1.804-15.124c-3.284-5.69-7.72-9.493-10.74-9.493Z"
        />
        <path
          fill="#0288d1"
          d="M21.543 5.507a.9.9 0 0 1 .457.1c1.221.706 1.186 5.946-2.536 12.393c-3.07 5.316-6.99 8.493-9.007 8.493a.9.9 0 0 1-.457-.1C8.779 25.686 8.814 20.446 12.536 14c3.07-5.316 6.99-8.493 9.007-8.493m0-2c-3.02 0-7.455 3.804-10.74 9.493C6.939 19.696 6.13 26.468 9 28.124a2.87 2.87 0 0 0 1.457.369c3.02 0 7.455-3.804 10.74-9.493C25.061 12.304 25.87 5.532 23 3.876a2.87 2.87 0 0 0-1.457-.369"
        />
      </svg>
    ),
    Tailwind: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 128 128"
      >
        <path
          fill="#38bdf8"
          d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597c6.398-8.531 13.867-11.73 22.398-9.597c4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602q-9.6 12.803-22.399 9.602c-4.87-1.215-8.347-4.746-12.207-8.66c-6.27-6.367-13.53-13.738-29.394-13.738M32.004 64c-17.066 0-27.73 8.531-32 25.602Q9.603 76.799 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66c6.274 6.367 13.536 13.738 29.395 13.738c17.066 0 27.73-8.53 32-25.597q-9.6 12.797-22.399 9.597c-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64m0 0"
        />
      </svg>
    ),
    Laravel: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 32 32"
      >
        <path
          fill="#ff5252"
          d="M31.963 9.12c-.008-.03-.023-.056-.034-.085a1 1 0 0 0-.07-.156a2 2 0 0 0-.162-.205a1 1 0 0 0-.088-.072a1 1 0 0 0-.083-.068l-.044-.02l-.035-.024l-6-3a1 1 0 0 0-.894 0l-6 3l-.035.024l-.044.02a1 1 0 0 0-.083.068a.7.7 0 0 0-.187.191a1 1 0 0 0-.064.086a1 1 0 0 0-.069.156c-.01.029-.026.055-.034.085a1 1 0 0 0-.037.265v5.382l-4 2V5.385a1 1 0 0 0-.037-.265c-.008-.03-.023-.056-.034-.085a1 1 0 0 0-.07-.156a1 1 0 0 0-.063-.086a.7.7 0 0 0-.187-.191a1 1 0 0 0-.083-.068l-.044-.02l-.035-.024l-6-3a1 1 0 0 0-.894 0l-6 3l-.035.024l-.044.02a1 1 0 0 0-.083.068a1 1 0 0 0-.088.072a1 1 0 0 0-.1.119a1 1 0 0 0-.063.086a1 1 0 0 0-.069.156c-.01.029-.026.055-.034.085A1 1 0 0 0 0 5.385v19a1 1 0 0 0 .553.894l6 3l6 3c.014.007.03.005.046.011a.9.9 0 0 0 .802 0c.015-.006.032-.004.046-.01l12-6a1 1 0 0 0 .553-.895v-5.382l5.447-2.724a1 1 0 0 0 .553-.894v-6a1 1 0 0 0-.037-.265M9.236 21.385l4.211-2.106h.001L19 16.503l3.764 1.882L13 23.267ZM24 13.003v3.764l-4-2v-3.764Zm1-5.5l3.764 1.882L25 11.267l-3.764-1.882ZM8 19.767V9.003l4-2v10.764ZM7 3.503l3.764 1.882L7 7.267L3.236 5.385Zm-5 3.5l4 2v16.764l-4-2Zm6 16l4 2v3.764l-4-2Zm16 .764l-10 5v-3.764l10-5Zm6-9l-4 2v-3.764l4-2Z"
        />
      </svg>
    ),
    SQLite: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 256 256"
      >
        
            <path
              fill="#d9d9d9"
              d="M60 0C26.863 0 0 26.863 0 60v136c0 33.137 26.863 60 60 60h108.46c-1.779-5.243-3.172-13.546-3.956-23.023c-.675-8.152-.899-17.171-.525-25.87c-.101-1.286-.162-2.122-.162-2.122s-1.874-12.61-4.571-22.969c-1.194-4.598-2.553-8.756-3.98-11.166c-.735-1.243.08-6.351 2.131-13.916c1.2 2.071 6.263 10.932 7.28 13.788c1.145 3.228 1.385 4.153 1.385 4.153s-2.777-14.272-7.333-22.6a303 303 0 0 1 3.542-11.066c1.578 2.767 5.165 9.121 6.461 12.132c.12.279.228.541.307.757c.184.522.339.965.478 1.371c.731 2.118.909 2.792.909 2.792s-.271-1.386-.775-3.524c-.213-.903-.478-1.965-.773-3.096c-1.148-4.409-2.892-10.181-5.125-14.704c5.732-29.794 24.181-68.807 44.057-89.868c1.713-1.814 3.434-3.511 5.158-5.041c11.619-10.3 23.392-13.78 33.115-5.118c7.034 6.267 9.912 14.925 9.917 24.89V60c0-33.137-26.863-60-60-60z"
            />
            <path
              fill="url(#SVGoivOZcTq)"
              d="M60 0C26.863 0 0 26.863 0 60v136c0 33.137 26.863 60 60 60h108.46c-1.779-5.243-3.172-13.546-3.956-23.023c-.675-8.152-.899-17.171-.525-25.87c-.101-1.286-.162-2.122-.162-2.122s-1.874-12.61-4.571-22.969c-1.194-4.598-2.553-8.756-3.98-11.166c-.735-1.243.08-6.351 2.131-13.916c1.2 2.071 6.263 10.932 7.28 13.788c1.145 3.228 1.385 4.153 1.385 4.153s-2.777-14.272-7.333-22.6a303 303 0 0 1 3.542-11.066c1.578 2.767 5.165 9.121 6.461 12.132c.12.279.228.541.307.757c.184.522.339.965.478 1.371c.731 2.118.909 2.792.909 2.792s-.271-1.386-.775-3.524c-.213-.903-.478-1.965-.773-3.096c-1.148-4.409-2.892-10.181-5.125-14.704c5.732-29.794 24.181-68.807 44.057-89.868c1.713-1.814 3.434-3.511 5.158-5.041c11.619-10.3 23.392-13.78 33.115-5.118c7.034 6.267 9.912 14.925 9.917 24.89V60c0-33.137-26.863-60-60-60z"
            />
            <path
              fill="#003b57"
              d="M246.083 36.91c-9.723-8.662-21.496-5.183-33.115 5.118c-1.724 1.53-3.445 3.227-5.158 5.04c-19.876 21.063-38.325 60.075-44.057 89.869c2.233 4.523 3.977 10.295 5.125 14.704c.295 1.131.56 2.193.773 3.096c.504 2.138.775 3.524.775 3.524s-.178-.674-.909-2.792c-.139-.406-.294-.849-.478-1.371a16 16 0 0 0-.307-.757c-1.296-3.011-4.883-9.365-6.461-12.132a303 303 0 0 0-3.542 11.066c4.556 8.328 7.333 22.6 7.333 22.6s-.24-.925-1.385-4.153c-1.017-2.856-6.08-11.717-7.28-13.788c-2.051 7.565-2.866 12.673-2.131 13.916c1.427 2.41 2.786 6.568 3.98 11.166c2.697 10.359 4.571 22.969 4.571 22.969s.061.836.162 2.122c-.374 8.699-.15 17.718.525 25.87c.893 10.791 2.575 20.062 4.719 25.023l1.455-.793c-3.148-9.774-4.427-22.584-3.867-37.358c.847-22.581 6.05-49.813 15.662-78.196c16.24-42.847 38.772-77.224 59.394-93.642c-18.796 16.956-44.235 71.839-51.85 92.163c-8.526 22.759-14.569 44.117-18.21 64.579c6.283-19.183 26.598-27.429 26.598-27.429s9.964-12.274 21.608-29.81c-6.975 1.589-18.428 4.309-22.265 5.919c-5.658 2.371-7.183 3.18-7.183 3.18s18.33-11.15 34.056-16.198c21.628-34.025 45.19-82.362 21.462-103.505M28.52 49c-3.063 0-5.554.895-7.463 2.683c-1.91 1.79-2.878 4.137-2.878 7.012c0 1.49.24 2.848.714 4.093c.474 1.247 1.212 2.403 2.203 3.447c.992 1.045 2.977 2.465 5.936 4.27c3.63 2.186 6.005 3.96 7.145 5.346c1.141 1.385 1.707 2.836 1.707 4.348c0 2.026-.675 3.642-2.064 4.858c-1.391 1.215-3.251 1.82-5.558 1.82c-2.433 0-4.552-.845-6.372-2.526c-1.82-1.682-2.738-3.908-2.759-6.698H18V87.78h1.131c.346-.959.824-1.45 1.45-1.45c.3 0 1.005.205 2.104.588c2.671.938 4.865 1.39 6.59 1.39c2.971 0 5.508-1.026 7.622-3.114c2.11-2.086 3.176-4.602 3.176-7.54c0-2.278-.704-4.305-2.084-6.071c-1.381-1.769-4.066-3.826-8.08-6.19c-3.452-2.046-5.694-3.713-6.728-5.013c-1.036-1.298-1.568-2.733-1.568-4.309c0-1.704.634-3.072 1.885-4.093c1.252-1.022 2.891-1.528 4.943-1.528c2.309 0 4.233.676 5.756 2.037c1.521 1.363 2.401 3.252 2.66 5.68h1.132v-8.774h-1.053q-.192.67-.357.861c-.106.128-.311.196-.615.196c-.366 0-1.019-.152-1.945-.45c-1.985-.66-3.815-.999-5.499-.999m36.98 0c-3.733 0-7.121.868-10.183 2.605c-3.066 1.734-5.493 4.14-7.285 7.207c-1.79 3.066-2.68 6.323-2.68 9.793c0 4.662 1.547 8.816 4.665 12.456c3.12 3.638 6.858 5.905 11.195 6.777c.992.51 2.41 1.826 4.268 3.956c2.093 2.404 3.864 4.138 5.32 5.17a16 16 0 0 0 4.684 2.292c1.661.499 3.457.744 5.4.744c2.351 0 4.457-.403 6.311-1.234l-.416-1.018a10.2 10.2 0 0 1-3.434.568c-1.642 0-3.3-.534-4.963-1.606c-1.66-1.075-3.736-3.125-6.213-6.15c-1.164-1.45-1.967-2.364-2.421-2.722c4.745-.915 8.648-3.184 11.691-6.816c3.043-3.63 4.565-7.774 4.565-12.417c0-5.514-1.988-10.147-5.935-13.925C76.12 50.9 71.262 49 65.5 49m23.085 0l.06 1.195c2.484 0 3.876.722 4.188 2.174c.115.52.169 1.478.178 2.86l-.02 26.42q-.03 2.96-.853 3.78c-.549.543-1.476.882-2.819 1.018l-.06 1.195h24.773l.635-5.993h-1.131c-.323 1.632-1.064 2.802-2.243 3.466c-1.183.67-3.273 1-6.293 1h-2.342c-2.717 0-4.289-.97-4.704-2.92a6 6 0 0 1-.12-1.253l.1-26.714c0-1.97.252-3.29.774-3.937c.528-.643 1.48-1.004 2.858-1.096L101.507 49zm-22.688 1.45c4.21 0 7.647 1.635 10.302 4.935s3.97 7.824 3.97 13.553q.001 8.14-4.01 13.044c-2.675 3.268-6.235 4.896-10.66 4.896c-4.25 0-7.696-1.679-10.34-5.053c-2.643-3.374-3.95-7.755-3.95-13.142c0-5.535 1.323-9.967 3.989-13.279c2.665-3.308 6.233-4.955 10.699-4.955m56.968 5.679c-.604 0-1.065.201-1.409.607c-.353.404-.461.894-.338 1.489c.119.576.449 1.082.973 1.508c.521.425 1.083.646 1.687.646c.584 0 1.03-.221 1.35-.646q.478-.64.298-1.508c-.124-.595-.442-1.085-.933-1.489c-.497-.406-1.044-.607-1.628-.607m16.336 4.054c-1.027 3.897-3.252 6.006-6.669 6.346l.039 1.116h3.99l-.079 13.2c.006 2.258.076 3.76.238 4.525c.393 1.83 1.605 2.761 3.632 2.761q4.402 0 9.23-5.288l-.972-.822c-2.324 2.32-4.379 3.486-6.173 3.486c-1.103 0-1.787-.626-2.045-1.86a4.7 4.7 0 0 1-.099-1.058l.04-14.944h6.093l-.059-1.782h-6.015v-5.68zm23.561 4.975c-3.408 0-6.181 1.632-8.336 4.877c-2.145 3.25-2.809 6.85-1.965 10.81c.496 2.32 1.484 4.12 2.997 5.387c1.51 1.267 3.426 1.9 5.716 1.9c2.133 0 5.103-.534 6.352-1.607c1.253-1.072 2.408-2.81 3.474-5.19l-.854-.881c-1.7 3.087-5.133 4.642-7.721 4.642c-3.559 0-5.738-1.927-6.55-5.758a14 14 0 0 1-.239-1.567c4.234-.662 7.442-1.833 9.608-3.526c2.163-1.693 4.336-3.489 3.93-5.386c-.242-1.127-.835-2.013-1.747-2.683c-.924-.67-3.324-1.018-4.665-1.018m-37.257.137l-7.344 1.665v1.292l2.54-.313c1.231 0 1.955.55 2.184 1.645c.077.367.125.881.139 1.528l-.08 11.849c-.02 1.64-.205 2.593-.575 2.879q-.561.43-2.958.43l-.04 1.117h11.652l-.02-1.116c-1.619 0-2.668-.126-3.136-.372c-.46-.245-.776-.69-.913-1.371c-.106-.492-.152-1.338-.159-2.507l.04-16.726zm35.392 2.194c.709 0 1.394.27 2.084.802c.68.531 1.095 1.122 1.23 1.763c.665 3.15-2.166 5.328-8.535 6.542c-.182-2.297.222-4.383 1.251-6.268c1.021-1.883 2.351-2.84 3.97-2.84"
            />
          <defs>
            <linearGradient
              id="SVGoivOZcTq"
              x1="147.614"
              x2="147.614"
              y1="5.239"
              y2="241.763"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#97d9f6" />
              <stop offset=".92" stop-color="#0f80cc" />
              <stop offset="1" stop-color="#0f80cc" />
            </linearGradient>
            <clipPath id="SVG5uOHZbSz">
              <rect width="256" height="256" fill="#fff" rx="60" />
            </clipPath>
          </defs>
      </svg>
    ),
    Vite: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 128 128"
      >
        <defs>
          <linearGradient
            id="SVGdskgcebC"
            x1="6"
            x2="235"
            y1="33"
            y2="344"
            gradientTransform="translate(0 .937)scale(.3122)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#41d1ff" />
            <stop offset="1" stop-color="#bd34fe" />
          </linearGradient>
          <linearGradient
            id="SVGNm6vSb3t"
            x1="194.651"
            x2="236.076"
            y1="8.818"
            y2="292.989"
            gradientTransform="translate(0 .937)scale(.3122)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#ffea83" />
            <stop offset=".083" stop-color="#ffdd35" />
            <stop offset="1" stop-color="#ffa800" />
          </linearGradient>
        </defs>
        <path
          fill="url(#SVGdskgcebC)"
          d="M124.766 19.52L67.324 122.238c-1.187 2.121-4.234 2.133-5.437.024L3.305 19.532c-1.313-2.302.652-5.087 3.261-4.622L64.07 25.187a3.1 3.1 0 0 0 1.11 0l56.3-10.261c2.598-.473 4.575 2.289 3.286 4.594m0 0"
        />
        <path
          fill="url(#SVGNm6vSb3t)"
          d="M91.46 1.43L48.954 9.758a1.56 1.56 0 0 0-1.258 1.437l-2.617 44.168a1.563 1.563 0 0 0 1.91 1.614l11.836-2.735a1.562 1.562 0 0 1 1.88 1.836l-3.517 17.219a1.562 1.562 0 0 0 1.985 1.805l7.308-2.223c1.133-.344 2.223.652 1.985 1.812l-5.59 27.047c-.348 1.692 1.902 2.614 2.84 1.164l.625-.968l34.64-69.13c.582-1.16-.421-2.48-1.69-2.234l-12.185 2.352a1.558 1.558 0 0 1-1.793-1.965l7.95-27.562A1.56 1.56 0 0 0 91.46 1.43m0 0"
        />
      </svg>
    ),
  };

  return (
    techIcons[tech] || (
      <span className="w-5 h-5 bg-gray-400 rounded text-xs flex items-center justify-center text-white font-bold">
        {tech.charAt(0)}
      </span>
    )
  );
};

const Gallery4 = ({
  title = "My Projects",
  description = "A collection of projects I've worked on, showcasing my skills in web development and system design.",
  items = portfolioData,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="border-gray-600/40 py-6">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl text-white">
              {title}
            </h2>
            <p className="max-w-lg text-gray-300">{description}</p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto text-white hover:bg-white/10"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto text-white hover:bg-white/10"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:mr-[max(0rem,calc(50vw-700px))] 2xl:ml-[max(8rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <a href={item.href} className="group rounded-xl">
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-5/4 lg:aspect-16/9">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8 z-10">
                      <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl text-white">
                        {item.title}
                      </div>
                      <div className=" mb-8 line-clamp-2 text-sm md:mb-12 md:text-base lg:mb-9 text-white">
                        {item.description}
                      </div>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {item.techstack.map((tech) => (
                          <div
                            key={tech}
                            className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/20"
                            title={tech}
                          >
                            {getTechIcon(tech)}
                          </div>
                        ))}
                      </div>
                      <Button variant="outline">
                        <Link to="{item.href}">
                          <div className="flex items-center text-sm text-white">
                            Read more{" "}
                            <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1 text-white" />
                          </div>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-white" : "bg-white/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default function IndexPage() {
  const [showPortfolio, setShowPortfolio] = useState(false);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      y: -40,
      transition: { duration: 1, ease: [0.4, 0, 1, 1] },
    },
  };

  return (
    <AppLayout title="Jay Christofel Portfolio Website">
      <div className="fixed inset-0 -z-10 w-full h-full">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.5}
          particleBaseSize={400}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>
      <AnimatePresence mode="wait">
        {!showPortfolio && (
          <motion.div
            key="welcome"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeUp}
            className="flex items-center justify-center min-h-screen text-white font-bold px-4 sm:px-8"
          >
            <div className="w-full max-w-7xl mx-auto text-center">
              <Card className="bg-gray-800/30 p-6 sm:p-10 rounded-lg backdrop-blur-2xl border border-gray-700/50">
                <CardContent>
                  <TextType
                    text={["Welcome!"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="▎"
                    cursorClassName={"text-white"}
                    className="text-3xl sm:text-6xl mb-4 text-white"
                  />
                </CardContent>
                <CardContent>
                  <p className="text-lg sm:text-3xl">
                    I'm Jay Christofel,{" "}
                    <span>This is my personal website.</span>
                  </p>
                </CardContent>
              </Card>
              <div className="mt-6 sm:mt-8">
                <Button
                  variant="outline"
                  className="p-4 sm:p-6 bg-gray-800/30 rounded-lg backdrop-blur-2xl border border-gray-700/50 w-full sm:w-auto"
                  onClick={() => setShowPortfolio(true)}
                >
                  <span className="text-white text-base sm:text-lg flex items-center justify-center">
                    Learn More
                    <ArrowRight className="inline-block ml-2" />
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        {showPortfolio && (
          <motion.section
            key="portfolio"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeUp}
            id="portfolio"
            className="min-h-screen flex items-center justify-center px-4 sm:px-8"
          >
            <div className="w-full max-w-7xl mx-auto text-center my-9">
              <Card className="bg-gray-800/30 p-6 sm:p-10 rounded-lg backdrop-blur-2xl border border-gray-700/50">
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 items-center">
                    <div className="sm:col-span-1 flex justify-center">
                      <img
                        src="./avatars/IMG_7907x.jpg"
                        alt="Jay Christofel"
                        className="rounded-md w-32 h-auto"
                      />
                    </div>
                    <div className="sm:col-span-3 text-left flex flex-col gap-3">
                      <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">
                          Jay Christofel
                        </h1>
                        <p className="text-base text-gray-300">
                          Jakarta, Indonesia
                        </p>
                      </div>
                      <div className="flex gap-3 mt-2">
                        <a
                          href="https://github.com/jaychristofel"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                          title="GitHub"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
                        </a>
                        <a
                          href="https://linkedin.com/in/jaychristofel"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                          title="LinkedIn"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/></svg>
                        </a>
                        <a
                          href="https://instagram.com/in/jaychristofel"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                          title="Instagram"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></svg>
                        </a>
                        <a
                          href="mailto:jaymandagi09@gmail.com"
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                          title="Email"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="currentColor" d="M32 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-1.54 22H5.66l7-7.24l-1.44-1.39L4 26.84V9.52l12.43 12.37a2 2 0 0 0 2.82 0L32 9.21v17.5l-7.36-7.36l-1.41 1.41ZM5.31 8h25.07L17.84 20.47Z"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Separator className="my-8 border-gray-100/25 border-2" />
              <div className="space-y-12 text-left">
                <Card className="bg-gray-800/30 p-6 sm:p-10 rounded-lg backdrop-blur-2xl border border-gray-700/50">
                  <CardContent>
                    <Gallery4 items={portfolioData} />
                  </CardContent>
                </Card>
              </div>
              <Separator className="my-8 border-gray-100/25 border-2" />
              <div className="space-y-12 text-left">
                <Card className="bg-gray-800/30 p-6 sm:p-10 rounded-lg backdrop-blur-2xl border border-gray-700/50">
                  <CardContent>
                    <section className="border-gray-600/40 py-6">
                      <div className="grid gap-6 sm:grid-cols-12">
                        <h2 className="sm:col-span-3 font-semibold tracking-wide uppercase text-lg text-gray-200">
                          Skills
                        </h2>
                        <div className="sm:col-span-9 space-y-6">
                          <div>
                            <p className="font-medium text-xs uppercase tracking-wider text-gray-400 mb-2">
                              Language
                            </p>
                            <p className="text-sm text-gray-200">
                              Indonesian, English
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-xs uppercase tracking-wider text-gray-400 mb-2">
                              Software
                            </p>
                            <div className="flex flex-wrap gap-3 text-xl items-center">
                              {[
                                {
                                  name: "VSCode",
                                  icon: (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="32"
                                      height="32"
                                      viewBox="0 0 128 128"
                                    >
                                      <mask
                                        id="SVGwAwXtZBg"
                                        width="128"
                                        height="128"
                                        x="0"
                                        y="0"
                                        maskUnits="userSpaceOnUse"
                                      >
                                        <path
                                          fill="#fff"
                                          fill-rule="evenodd"
                                          d="M90.767 127.126a7.97 7.97 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.33 5.33 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64L1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.33 5.33 0 0 0 6.807.303l21.974-16.68l50.45 46.025a8 8 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z"
                                          clip-rule="evenodd"
                                        />
                                      </mask>
                                      <g mask="url(#SVGwAwXtZBg)">
                                        <path
                                          fill="#0065a9"
                                          d="M123.471 13.82L97.097 1.12A7.97 7.97 0 0 0 88 2.668L1.662 81.387a5.333 5.333 0 0 0 .006 7.887l7.052 6.411a5.33 5.33 0 0 0 6.811.303l103.971-78.875c3.488-2.646 8.498-.158 8.498 4.22v-.306a8 8 0 0 0-4.529-7.208Z"
                                        />
                                        <g filter="url(#SVGMofzWbef)">
                                          <path
                                            fill="#007acc"
                                            d="m123.471 114.181l-26.374 12.698A7.97 7.97 0 0 1 88 125.333L1.662 46.613a5.333 5.333 0 0 1 .006-7.887l7.052-6.411a5.33 5.33 0 0 1 6.811-.303l103.971 78.874c3.488 2.647 8.498.159 8.498-4.219v.306a8 8 0 0 1-4.529 7.208"
                                          />
                                        </g>
                                        <g filter="url(#SVGNFFJfeJv)">
                                          <path
                                            fill="#1f9cf0"
                                            d="M97.098 126.882A7.98 7.98 0 0 1 88 125.333c2.952 2.952 8 .861 8-3.314V5.98c0-4.175-5.048-6.266-8-3.313a7.98 7.98 0 0 1 9.098-1.549L123.467 13.8A8 8 0 0 1 128 21.01v85.982a8 8 0 0 1-4.533 7.21z"
                                          />
                                        </g>
                                        <path
                                          fill="url(#SVGCuCWAcYL)"
                                          fill-rule="evenodd"
                                          d="M90.69 127.126a7.97 7.97 0 0 0 6.349-.244l26.353-12.681a8 8 0 0 0 4.53-7.21V21.009a8 8 0 0 0-4.53-7.21L97.039 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026l-21.974-16.68a5.33 5.33 0 0 0-6.807.302l-7.048 6.411a5.336 5.336 0 0 0-.006 7.888L20.718 64L1.662 81.386a5.335 5.335 0 0 0 .006 7.888l7.048 6.411a5.33 5.33 0 0 0 6.807.303l21.975-16.681l50.45 46.026a8 8 0 0 0 2.742 1.793m5.252-92.184L57.662 64l38.28 29.057z"
                                          clip-rule="evenodd"
                                          opacity="0.25"
                                        />
                                      </g>
                                      <defs>
                                        <filter
                                          id="SVGMofzWbef"
                                          width="144.744"
                                          height="113.408"
                                          x="-8.411"
                                          y="22.594"
                                          color-interpolation-filters="sRGB"
                                          filterUnits="userSpaceOnUse"
                                        >
                                          <feFlood
                                            flood-opacity="0"
                                            result="BackgroundImageFix"
                                          />
                                          <feColorMatrix
                                            in="SourceAlpha"
                                            result="hardAlpha"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                          />
                                          <feOffset />
                                          <feGaussianBlur stdDeviation="4.167" />
                                          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                          <feBlend
                                            in2="BackgroundImageFix"
                                            mode="overlay"
                                            result="effect1_dropShadow_1_36"
                                          />
                                          <feBlend
                                            in="SourceGraphic"
                                            in2="effect1_dropShadow_1_36"
                                            result="shape"
                                          />
                                        </filter>
                                        <filter
                                          id="SVGNFFJfeJv"
                                          width="56.667"
                                          height="144.007"
                                          x="79.667"
                                          y="-8.004"
                                          color-interpolation-filters="sRGB"
                                          filterUnits="userSpaceOnUse"
                                        >
                                          <feFlood
                                            flood-opacity="0"
                                            result="BackgroundImageFix"
                                          />
                                          <feColorMatrix
                                            in="SourceAlpha"
                                            result="hardAlpha"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                          />
                                          <feOffset />
                                          <feGaussianBlur stdDeviation="4.167" />
                                          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                          <feBlend
                                            in2="BackgroundImageFix"
                                            mode="overlay"
                                            result="effect1_dropShadow_1_36"
                                          />
                                          <feBlend
                                            in="SourceGraphic"
                                            in2="effect1_dropShadow_1_36"
                                            result="shape"
                                          />
                                        </filter>
                                        <linearGradient
                                          id="SVGCuCWAcYL"
                                          x1="63.922"
                                          x2="63.922"
                                          y1=".33"
                                          y2="127.67"
                                          gradientUnits="userSpaceOnUse"
                                        >
                                          <stop stop-color="#fff" />
                                          <stop
                                            offset="1"
                                            stop-color="#fff"
                                            stop-opacity="0"
                                          />
                                        </linearGradient>
                                      </defs>
                                    </svg>
                                  ),
                                },
                                {
                                  name: "Office",
                                  icon: (
                                    <svg
                                      className="text-orange-600"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="32"
                                      height="32"
                                      viewBox="0 0 8 8"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="m0 6l6 1V1.5l-4 1V5zV2l6-2l2 1v6L6 8"
                                      />
                                    </svg>
                                  ),
                                },
                                {
                                  name: "Figma",
                                  icon: (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="32"
                                      height="32"
                                      viewBox="0 0 128 128"
                                    >
                                      <path
                                        fill="#0acf83"
                                        d="M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129m0 0"
                                      />
                                      <path
                                        fill="#a259ff"
                                        d="M24 64.5C24 52.6 33.6 43 45.5 43H67v43H45.5C33.6 86 24 76.4 24 64.5m0 0"
                                      />
                                      <path
                                        fill="#f24e1e"
                                        d="M24 21.5C24 9.6 33.6 0 45.5 0H67v43H45.5C33.6 43 24 33.4 24 21.5m0 0"
                                      />
                                      <path
                                        fill="#ff7262"
                                        d="M67 0h21.5C100.4 0 110 9.6 110 21.5S100.4 43 88.5 43H67zm0 0"
                                      />
                                      <path
                                        fill="#1abcfe"
                                        d="M110 64.5c0 11.9-9.6 21.5-21.5 21.5S67 76.4 67 64.5S76.6 43 88.5 43S110 52.6 110 64.5m0 0"
                                      />
                                    </svg>
                                  ),
                                },
                              ].map((s) => (
                                <span
                                  key={s.name}
                                  className="px-2 py-1 rounded-md bg-white/5 border border-white/10 flex items-center"
                                  title={s.name}
                                >
                                  {s.icon}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-xs uppercase tracking-wider text-gray-400 mb-2">
                              Tech Stack
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {[
                                {
                                  name: "Laravel",
                                  icon: (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="32"
                                      height="32"
                                      viewBox="0 0 32 32"
                                    >
                                      <path
                                        fill="#ff5252"
                                        d="M31.963 9.12c-.008-.03-.023-.056-.034-.085a1 1 0 0 0-.07-.156a2 2 0 0 0-.162-.205a1 1 0 0 0-.088-.072a1 1 0 0 0-.083-.068l-.044-.02l-.035-.024l-6-3a1 1 0 0 0-.894 0l-6 3l-.035.024l-.044.02a1 1 0 0 0-.083.068a.7.7 0 0 0-.187.191a1 1 0 0 0-.064.086a1 1 0 0 0-.069.156c-.01.029-.026.055-.034.085a1 1 0 0 0-.037.265v5.382l-4 2V5.385a1 1 0 0 0-.037-.265c-.008-.03-.023-.056-.034-.085a1 1 0 0 0-.07-.156a1 1 0 0 0-.063-.086a.7.7 0 0 0-.187-.191a1 1 0 0 0-.083-.068l-.044-.02l-.035-.024l-6-3a1 1 0 0 0-.894 0l-6 3l-.035.024l-.044.02a1 1 0 0 0-.083.068a1 1 0 0 0-.088.072a1 1 0 0 0-.1.119a1 1 0 0 0-.063.086a1 1 0 0 0-.069.156c-.01.029-.026.055-.034.085A1 1 0 0 0 0 5.385v19a1 1 0 0 0 .553.894l6 3l6 3c.014.007.03.005.046.011a.9.9 0 0 0 .802 0c.015-.006.032-.004.046-.01l12-6a1 1 0 0 0 .553-.895v-5.382l5.447-2.724a1 1 0 0 0 .553-.894v-6a1 1 0 0 0-.037-.265M9.236 21.385l4.211-2.106h.001L19 16.503l3.764 1.882L13 23.267ZM24 13.003v3.764l-4-2v-3.764Zm1-5.5l3.764 1.882L25 11.267l-3.764-1.882ZM8 19.767V9.003l4-2v10.764ZM7 3.503l3.764 1.882L7 7.267L3.236 5.385Zm-5 3.5l4 2v16.764l-4-2Zm6 16l4 2v3.764l-4-2Zm16 .764l-10 5v-3.764l10-5Zm6-9l-4 2v-3.764l4-2Z"
                                      />
                                    </svg>
                                  ),
                                },
                                {
                                  name: "Vite",
                                  icon: (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="32"
                                      height="32"
                                      viewBox="0 0 128 128"
                                    >
                                      <defs>
                                        <linearGradient
                                          id="SVGdskgcebC"
                                          x1="6"
                                          x2="235"
                                          y1="33"
                                          y2="344"
                                          gradientTransform="translate(0 .937)scale(.3122)"
                                          gradientUnits="userSpaceOnUse"
                                        >
                                          <stop
                                            offset="0"
                                            stop-color="#41d1ff"
                                          />
                                          <stop
                                            offset="1"
                                            stop-color="#bd34fe"
                                          />
                                        </linearGradient>
                                        <linearGradient
                                          id="SVGNm6vSb3t"
                                          x1="194.651"
                                          x2="236.076"
                                          y1="8.818"
                                          y2="292.989"
                                          gradientTransform="translate(0 .937)scale(.3122)"
                                          gradientUnits="userSpaceOnUse"
                                        >
                                          <stop
                                            offset="0"
                                            stop-color="#ffea83"
                                          />
                                          <stop
                                            offset=".083"
                                            stop-color="#ffdd35"
                                          />
                                          <stop
                                            offset="1"
                                            stop-color="#ffa800"
                                          />
                                        </linearGradient>
                                      </defs>
                                      <path
                                        fill="url(#SVGdskgcebC)"
                                        d="M124.766 19.52L67.324 122.238c-1.187 2.121-4.234 2.133-5.437.024L3.305 19.532c-1.313-2.302.652-5.087 3.261-4.622L64.07 25.187a3.1 3.1 0 0 0 1.11 0l56.3-10.261c2.598-.473 4.575 2.289 3.286 4.594m0 0"
                                      />
                                      <path
                                        fill="url(#SVGNm6vSb3t)"
                                        d="M91.46 1.43L48.954 9.758a1.56 1.56 0 0 0-1.258 1.437l-2.617 44.168a1.563 1.563 0 0 0 1.91 1.614l11.836-2.735a1.562 1.562 0 0 1 1.88 1.836l-3.517 17.219a1.562 1.562 0 0 0 1.985 1.805l7.308-2.223c1.133-.344 2.223.652 1.985 1.812l-5.59 27.047c-.348 1.692 1.902 2.614 2.84 1.164l.625-.968l34.64-69.13c.582-1.16-.421-2.48-1.69-2.234l-12.185 2.352a1.558 1.558 0 0 1-1.793-1.965l7.95-27.562A1.56 1.56 0 0 0 91.46 1.43m0 0"
                                      />
                                    </svg>
                                  ),
                                },
                                {
                                  name: "React",
                                  icon: (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="32"
                                      height="32"
                                      viewBox="0 0 32 32"
                                    >
                                      <path
                                        fill="#0288d1"
                                        d="M16 12c7.444 0 12 2.59 12 4s-4.556 4-12 4s-12-2.59-12-4s4.556-4 12-4m0-2c-7.732 0-14 2.686-14 6s6.268 6 14 6s14-2.686 14-6s-6.268-6-14-6"
                                      />
                                      <path
                                        fill="#0288d1"
                                        d="M16 14a2 2 0 1 0 2 2a2 2 0 0 0-2-2"
                                      />
                                      <path
                                        fill="#0288d1"
                                        d="M10.458 5.507c2.017 0 5.937 3.177 9.006 8.493c3.722 6.447 3.757 11.687 2.536 12.392a.9.9 0 0 1-.457.1c-2.017 0-5.938-3.176-9.007-8.492C8.814 11.553 8.779 6.313 10 5.608a.9.9 0 0 1 .458-.1m-.001-2A2.87 2.87 0 0 0 9 3.875C6.13 5.532 6.938 12.304 10.804 19c3.284 5.69 7.72 9.493 10.74 9.493A2.87 2.87 0 0 0 23 28.124c2.87-1.656 2.062-8.428-1.804-15.124c-3.284-5.69-7.72-9.493-10.74-9.493Z"
                                      />
                                      <path
                                        fill="#0288d1"
                                        d="M21.543 5.507a.9.9 0 0 1 .457.1c1.221.706 1.186 5.946-2.536 12.393c-3.07 5.316-6.99 8.493-9.007 8.493a.9.9 0 0 1-.457-.1C8.779 25.686 8.814 20.446 12.536 14c3.07-5.316 6.99-8.493 9.007-8.493m0-2c-3.02 0-7.455 3.804-10.74 9.493C6.939 19.696 6.13 26.468 9 28.124a2.87 2.87 0 0 0 1.457.369c3.02 0 7.455-3.804 10.74-9.493C25.061 12.304 25.87 5.532 23 3.876a2.87 2.87 0 0 0-1.457-.369"
                                      />
                                    </svg>
                                  ),
                                },
                                {
                                  name: "Tailwind",
                                  icon: (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="32"
                                      height="32"
                                      viewBox="0 0 128 128"
                                    >
                                      <path
                                        fill="#38bdf8"
                                        d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597c6.398-8.531 13.867-11.73 22.398-9.597c4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602q-9.6 12.803-22.399 9.602c-4.87-1.215-8.347-4.746-12.207-8.66c-6.27-6.367-13.53-13.738-29.394-13.738M32.004 64c-17.066 0-27.73 8.531-32 25.602Q9.603 76.799 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66c6.274 6.367 13.536 13.738 29.395 13.738c17.066 0 27.73-8.53 32-25.597q-9.6 12.797-22.399 9.597c-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64m0 0"
                                      />
                                    </svg>
                                  ),
                                },
                              ].map((t) => (
                                <span
                                  key={t.name}
                                  className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-100 flex items-center gap-1"
                                >
                                  {t.icon}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="border-t border-gray-600/40 py-6">
                      <div className="grid gap-6 sm:grid-cols-12">
                        <h2 className="sm:col-span-3 font-semibold tracking-wide uppercase text-lg text-gray-200">
                          Education
                        </h2>
                        <div className="sm:col-span-9 space-y-4">
                          <div>
                            <div className="flex flex-wrap justify-between gap-2">
                              <p className="font-medium text-gray-100">
                                Bung Karno University
                              </p>
                              <p className="text-sm text-gray-100 font-medium">
                                2019 - 2023
                              </p>
                            </div>
                            <p className="text-sm text-gray-300">
                              Informatics Engineering
                            </p>
                            <p className="text-xs text-gray-400">
                              Jakarta, Indonesia
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="border-t border-gray-600/40 py-6">
                      <div className="grid gap-6 sm:grid-cols-12">
                        <h2 className="sm:col-span-3 font-semibold tracking-wide uppercase text-lg text-gray-200">
                          Experience
                        </h2>
                        <div className="sm:col-span-9 space-y-8">
                          {[
                            {
                              company: "PT Hidup Makmur Tercencana",
                              role: "IT Support (Web & Desktop)",
                              period: "2019 - 2020",
                              location: "Jakarta, Indonesia",
                              points: [
                                "Designed and implemented user‑friendly web interfaces and conducted regular maintenance.",
                                "Performed troubleshooting for both desktop and web issues to enhance user experience.",
                                "Collaborated with cross‑functional teams to ensure seamless integration of visual design elements on the website.",
                              ],
                            },
                            {
                              company: "PT Jaya Teknik Indonesia",
                              role: "IT Staff",
                              period: "2020 - 2023",
                              location: "Jakarta, Indonesia",
                              points: [
                                "Developed internal tooling and performed scheduled maintenance tasks.",
                                "Optimized systems and enhanced security for internal user environments.",
                                "Supported end‑users with technical issues to maintain productivity.",
                              ],
                            },
                            {
                              company: "PT Jaya Teknik Indonesia",
                              role: "Presentation Staff (Internship)",
                              period: "May 2023 - July 2023",
                              location: "Jakarta, Indonesia",
                              points: [
                                "Created & customized company presentations and ensured brand consistency.",
                                "Summarized data/information for business & documentation purposes.",
                              ],
                            },
                            {
                              company: "PT Jaya Teknik Indonesia",
                              role: "Training Staff (Internship)",
                              period: "Apr 2024 - Aug 2024",
                              location: "Jakarta, Indonesia",
                              points: [
                                "Developed competency modules based on module levels for JayaTech.",
                                "Managed competency tracking & administration in the company ERP system.",
                              ],
                            },
                          ].map((exp) => (
                            <div
                              key={exp.company + exp.period}
                              className="border-l pl-4 border-gray-200"
                            >
                              <div className="flex flex-wrap justify-between gap-2">
                                <p className="font-medium text-gray-100">
                                  {exp.company}
                                </p>
                                <p className="text-sm text-gray-100 font-medium">
                                  {exp.period}
                                </p>
                              </div>
                              <p className="text-sm text-gray-300">
                                {exp.role}
                              </p>
                              <p className="text-sm text-gray-400 mb-2">
                                {exp.location}
                              </p>
                              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-300">
                                {exp.points.map((p) => (
                                  <li key={p}>{p}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    <section className="border-t border-gray-600/40 py-6">
                      <div className="grid gap-6 sm:grid-cols-12">
                        <h2 className="sm:col-span-3 font-semibold tracking-wide uppercase text-lg text-gray-200">
                          Certificates
                        </h2>
                        <div className="sm:col-span-9 space-y-6">
                          {[
                            {
                              title: "Variables and Data Types in Java Coding",
                              issuer: "Udemy",
                              year: "2020 (Online)",
                            },
                            {
                              title:
                                "Mastering Flutter Web: Build Responsive Apps",
                              issuer: "Udemy",
                              year: "2024 (Online)",
                            },
                            {
                              title:
                                "Artificial Intelligence and the Future of Work",
                              issuer: "Udemy",
                              year: "2024 (Online)",
                            },
                          ].map((c) => (
                            <div
                              key={c.title}
                              className="border-l border-gray-200 pl-4"
                            >
                              <p className="font-medium text-sm text-gray-100">
                                {c.title}
                              </p>
                              <p className="text-xs text-gray-400">
                                {c.issuer} • {c.year}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
