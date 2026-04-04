/**
 * JSON-LD Schema Markup Generators
 * Generate structured data for MedicalCondition, FAQPage, MedicalProcedure, Organization
 */

export interface MedicalConditionData {
  name: string;
  description: string;
  symptoms?: string[];
  causes?: string;
  treatments?: string[];
  riskFactors?: string[];
}

export interface FAQData {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export interface MedicalProcedureData {
  name: string;
  description: string;
  outcome?: string;
  preparation?: string;
  followUp?: string;
  risks?: string[];
}

/**
 * Generate MedicalCondition schema for disease/condition pages
 */
export function generateMedicalConditionSchema(
  data: MedicalConditionData
): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: data.name,
    description: data.description,
    ...(data.symptoms && {
      symptom: data.symptoms.map((symptom) => ({
        "@type": "Thing",
        name: symptom,
      })),
    }),
    ...(data.causes && {
      cause: {
        "@type": "Thing",
        name: data.causes,
      },
    }),
    ...(data.treatments && {
      possibleTreatment: data.treatments.map((treatment) => ({
        "@type": "MedicalTherapy",
        name: treatment,
      })),
    }),
    ...(data.riskFactors && {
      riskFactor: data.riskFactors.map((factor) => ({
        "@type": "Thing",
        name: factor,
      })),
    }),
  };
}

/**
 * Generate FAQPage schema for Q&A sections
 */
export function generateFAQSchema(data: FAQData): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate MedicalProcedure schema for surgical/clinical procedures
 */
export function generateMedicalProcedureSchema(
  data: MedicalProcedureData
): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: data.name,
    description: data.description,
    ...(data.outcome && { outcome: data.outcome }),
    ...(data.preparation && { preparation: data.preparation }),
    ...(data.followUp && { followUp: data.followUp }),
    ...(data.risks && {
      seriousAdverseOutcome: data.risks.map((risk) => ({
        "@type": "Thing",
        name: risk,
      })),
    }),
  };
}

/**
 * Generate Organization schema for KSA Silmakeskus (global, on all pages)
 */
export function generateOrganizationSchema(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KSA Silmakeskus",
    alternateName: "KSA Vision Clinic",
    logo: "https://ksa.ee/images/ksa-logo.svg",
    url: "https://ksa.ee",
    sameAs: [
      "https://www.facebook.com/KSASilmakeskus",
      "https://www.instagram.com/ksa_silmakeskus",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Viru 18",
      addressLocality: "Tallinn",
      addressRegion: "Harjumaa",
      postalCode: "10140",
      addressCountry: "EE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+372-6-256-256",
      email: "info@ksa.ee",
    },
    founder: {
      "@type": "Person",
      name: "Dr. Ants Haavel",
      jobTitle: "CEO, Ophthalmologist",
    },
    knowsAbout: [
      "Ophthalmology",
      "Eye Care",
      "Vision Correction",
      "Cataract Surgery",
      "Refractive Surgery",
      "Retinal Care",
      "Corneal Care",
    ],
    priceRange: "€€€",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "500",
    },
  };
}

/**
 * Combine Organization schema with content schema
 * Used when injecting multiple schemas into a single page
 */
export function combineSchemas(
  ...schemas: Record<string, any>[]
): Record<string, any> {
  // If multiple schemas, wrap in @graph
  if (schemas.length > 1) {
    return {
      "@context": "https://schema.org",
      "@graph": schemas,
    };
  }
  // Single schema, return as-is
  return schemas[0];
}

/**
 * Validate schema structure (basic check)
 */
export function isValidSchema(schema: Record<string, any>): boolean {
  return (
    schema &&
    typeof schema === "object" &&
    ("@context" in schema || "@graph" in schema) &&
    ("@type" in schema || "@graph" in schema)
  );
}
