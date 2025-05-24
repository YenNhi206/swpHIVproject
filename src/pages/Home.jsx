// src/pages/Home.jsx
import React from "react";
import HeroSection from "@/features/home/HeroSection";
import FeatureCards from "@/features/home/FeatureCards";
import CTASection from "@/features/home/CTASection";

export default function Home() {
    return (
        <>
            <HeroSection />
            <FeatureCards />
            <CTASection />
        </>
    );
}
