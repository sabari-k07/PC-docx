/**
 * PC_DOCx Mock Catalog & Fallback Indian Market Data
 * Retailer references: PrimeABGB, MDComputers, Vedant Computers, EliteHubs, Amazon India
 */

import {
  COMPONENT_CATALOG as BASE_CATALOG,
  CANONICAL_BUILD,
  FEATURED_BUILDS,
  POPULAR_BUILDS,
  BUILDING_GUIDES,
  ROADMAP_DATA
} from '../data/mockData.js';

// Indian hardware retailers active in Delhi (Nehru Place), Bengaluru (SP Road), Mumbai (Lamington Rd), and Pan-India e-commerce
export const INDIAN_RETAILERS = [
  { id: 'mdcomputers', name: 'MDComputers', region: 'Kolkata / Pan-India', url: 'https://mdcomputers.in' },
  { id: 'vedant', name: 'Vedant Computers', region: 'Kolkata / Pan-India', url: 'https://vedantcomputers.com' },
  { id: 'primeabgb', name: 'PrimeABGB', region: 'Lamington Road, Mumbai', url: 'https://primeabgb.com' },
  { id: 'elitehubs', name: 'EliteHubs', region: 'Mumbai / Pan-India', url: 'https://elitehubs.com' },
  { id: 'pcstudio', name: 'Ankit Infotech (PCStudio)', region: 'SP Road, Bengaluru', url: 'https://pcstudio.in' },
  { id: 'smc', name: 'SMC International', region: 'Nehru Place, New Delhi', url: 'https://smcinternational.in' },
  { id: 'amazon', name: 'Amazon India', region: 'Pan-India Fulfillment', url: 'https://amazon.in' }
];

// Enrich component catalog with live Indian retailer availability & warranty
export const COMPONENT_CATALOG = Object.fromEntries(
  Object.entries(BASE_CATALOG).map(([category, items]) => [
    category,
    items.map(item => ({
      ...item,
      inStock: item.inStock !== false,
      retailer: item.retailer || 'PrimeABGB',
      warrantyYears: item.warrantyYears || (category === 'psu' ? 10 : category === 'storage' ? 5 : 3),
      gstIncluded: true,
      indianHubAvailability: {
        nehruPlace: true,
        spRoad: true,
        lamingtonRoad: true,
        online: true
      }
    }))
  ])
);

export {
  CANONICAL_BUILD,
  FEATURED_BUILDS,
  POPULAR_BUILDS,
  BUILDING_GUIDES,
  ROADMAP_DATA
};

export default COMPONENT_CATALOG;
