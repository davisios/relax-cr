import type { Metadata } from "next";
import { getPageHeading, getPropertyValuationPage } from "@/lib/data/pages";
import PropertyValuationClient from "./PropertyValuationClient";

const page = getPropertyValuationPage();

export const metadata: Metadata = {
  title: "Property Valuation",
  description:
    "Do you want to see how much your property is worth? Request a free property estimation from Dominique Brousseau, Jaco Beach real estate agent.",
};

export default function PropertyValuationPage() {
  const heroTitle = getPageHeading(
    page,
    0,
    "Do you want to know what your property is worth?",
  ).replace(/^Do want/, "Do you want");

  const formTitle = getPageHeading(page, 1, "Get your Property Estimation");

  return (
    <PropertyValuationClient
      heroTitle={heroTitle}
      formTitle={formTitle}
    />
  );
}
