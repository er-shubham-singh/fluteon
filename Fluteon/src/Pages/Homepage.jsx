import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchHomepageCategoryProducts } from "../Redux/Customers/Product/Action";
import { CircularProgress, Box } from "@mui/material";
import { Helmet } from "react-helmet-async"; // ✅ SEO Helmet

import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";

const categoriesToFetch = [
  { name: "formal_pants", label: "Formal Pants" },
  { name: "blazer", label: "Blazers" },
  { name: "satin_shirts", label: "Satin Shirts" },
];

const Homepage = () => {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const promises = categoriesToFetch.map((category) =>
          dispatch(
            fetchHomepageCategoryProducts({
              category: category.name,
              pageNumber: 1,
              pageSize: 10,
            })
          )
        );

        const results = await Promise.all(promises);
        const allCategoryData = {};
        categoriesToFetch.forEach((category, i) => {
          allCategoryData[category.name] = results[i]?.content || [];
        });

        setCategoryData(allCategoryData);
      } catch (error) {
        console.error("Error loading homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [dispatch]);

  if (loading) {
    return (
      <Box className="h-screen flex justify-center items-center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      {/* ✅ SEO Tags */}
<Helmet>
  {/* ✅ Basic SEO */}
  <title>Buy Cotton Pants, Blazers & Satin Shirts for Women | Fluteon</title>
  <meta
    name="description"
    content="Shop affordable formal pants, blazers, and satin shirts for women online at Fluteon. Premium quality, latest designs, and fast shipping across India."
  />
  <meta
    name="keywords"
    content="women cotton pants, satin shirts, blazers for girls, affordable women wear, online kurtis, office wear women"
  />
  <link rel="canonical" href="https://fluteon.com/" />

  {/* ✅ Open Graph Tags for Social Sharing */}
  <meta property="og:title" content="Fluteon - Premium Women's Fashion" />
  <meta
    property="og:description"
    content="Shop premium cotton pants, blazers, and satin shirts for women at Fluteon. Exclusive styles, fast delivery across India."
  />
  <meta property="og:image" content="https://fluteon.com/og-banner.png" />
  <meta property="og:url" content="https://fluteon.com/" />
  <meta property="og:type" content="website" />

  {/* ✅ Structured Data (JSON-LD) */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Store",
      "@id": "https://fluteon.com/#organization",
      "name": "Fluteon",
      "url": "https://fluteon.com/",
      "logo": "https://fluteon.com/logo192.png",
      "sameAs": [
        "https://www.instagram.com/fluteostore",
        "https://www.facebook.com/fluteostore"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9876543210",
        "contactType": "Customer Service"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://fluteon.com/search?query={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    })}
  </script>
</Helmet>



      {/* ✅ Homepage UI */}
      <HomeCarousel images={homeCarouselData} />
      <div className="space-y-10">
        {categoriesToFetch.map((cat) => (
          <HomeProductSection
            key={cat.name}
            section={cat.label}
            data={categoryData[cat.name]}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
