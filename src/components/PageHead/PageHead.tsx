import React, { FC } from "react";
import NextHead from "next/head";
import { useRouter } from "next/router";
import { BASE_URL } from "@utils/constants";

type PageHeadProps = {
  title: string;
  description: string;
  url: string;
};

const PageHead: FC<PageHeadProps> = ({ title, description, url }) => {
  const { locale } = useRouter();

  return (
    <NextHead>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta httpEquiv="Content-Language" content={locale} />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

      <meta name="apple-mobile-web-app-title" content="Imar Business Group" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />

      <meta name="robots" content="all" />
      <meta name="referrer" content="no-referrer-when-downgrade" />

      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="star wars, movies, aliens, starships, starsystem"
      />

      <title>{title}</title>

      <link rel="canonical" href={url} />
      <link rel="home" href={BASE_URL} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/icons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/images/icons/android-chrome-512x512.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/images/icons/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/icons/favicon-16x16.png"
      />
      <link rel="mask-icon" href="" color="#ffffff" />
      <link rel="author" type="text/plain" href="/humans.txt" />
      <link rel="manifest" href="/site.webmanifest" />
    </NextHead>
  );
};

export default PageHead;
