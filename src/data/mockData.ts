import { Station } from "@/components/stations/StationTable";

export const mockStations: Station[] = [
  {
    id: "1",
    name: "Front Gate",
    type: "CPE250",
    location: "123 Main Street, San Francisco",
    plans: ["cloud", "assure"],
    status: "active",
  },
  {
    id: "2",
    name: "Parking Garage",
    type: "CT4000",
    location: "456 Oak Avenue, San Francisco",
    plans: ["cloud"],
    status: "no-maintenance",
  },
  {
    id: "3",
    name: "Station 1",
    type: "CFP50",
    location: "789 Pine Street, San Jose",
    plans: ["cloud"],
    status: "no-maintenance",
  },
  {
    id: "4",
    name: "Station 2",
    type: "CFP25",
    location: "789 Pine Street, San Jose",
    plans: ["cloud", "assure"],
    status: "active",
  },
];

export interface PlanDetail {
  id: string;
  name: string;
  type: "cloud" | "assure";
  startDate: string;
  renewalDate: string;
}

export interface StationDetail {
  id: string;
  name: string;
  type: string;
  fullAddress: string;
  organization: string;
  plans: PlanDetail[];
}

export const mockStationDetails: Record<string, StationDetail> = {
  "1": {
    id: "1",
    name: "Front Gate",
    type: "CPE250",
    fullAddress: "123 Main Street, San Francisco, CA 94102",
    organization: "Acme Corporation",
    plans: [
      {
        id: "p1",
        name: "Chargepoint Power Cloud",
        type: "cloud",
        startDate: "1/14/2024",
        renewalDate: "1/9/2026",
      },
      {
        id: "p2",
        name: "Chargepoint Assure",
        type: "assure",
        startDate: "1/14/2024",
        renewalDate: "1/16/2026",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Parking Garage",
    type: "CT4000",
    fullAddress: "456 Oak Avenue, San Francisco, CA 94103",
    organization: "Acme Corporation",
    plans: [
      {
        id: "p3",
        name: "Chargepoint Power Cloud",
        type: "cloud",
        startDate: "3/20/2024",
        renewalDate: "3/20/2026",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Station 1",
    type: "CFP50",
    fullAddress: "789 Pine Street, San Jose, CA 95101",
    organization: "Acme Corporation",
    plans: [
      {
        id: "p4",
        name: "Chargepoint Power Cloud",
        type: "cloud",
        startDate: "6/1/2024",
        renewalDate: "6/1/2026",
      },
    ],
  },
  "4": {
    id: "4",
    name: "Station 2",
    type: "CFP25",
    fullAddress: "789 Pine Street, San Jose, CA 95101",
    organization: "Acme Corporation",
    plans: [
      {
        id: "p5",
        name: "Chargepoint Power Cloud",
        type: "cloud",
        startDate: "6/1/2024",
        renewalDate: "6/1/2026",
      },
      {
        id: "p6",
        name: "Chargepoint Assure",
        type: "assure",
        startDate: "6/1/2024",
        renewalDate: "6/1/2026",
      },
    ],
  },
};

export interface Package {
  id: string;
  name: string;
  tier: "Premium" | "Standard" | "Basic";
  monthlyPrice: number;
  features: string[];
}

export const cloudPackages: Package[] = [
  {
    id: "cloud-premium",
    name: "Cloud Package - Premium",
    tier: "Premium",
    monthlyPrice: 5200,
    features: [
      "24/7 monitoring and support",
      "Advanced analytics dashboard",
      "Automatic firmware updates",
      "Priority technical assistance",
    ],
  },
  {
    id: "cloud-standard",
    name: "Cloud Package - Standard",
    tier: "Standard",
    monthlyPrice: 3200,
    features: [
      "Business hours monitoring",
      "Basic analytics dashboard",
      "Scheduled firmware updates",
      "Email technical support",
    ],
  },
  {
    id: "cloud-basic",
    name: "Cloud Package - Basic",
    tier: "Basic",
    monthlyPrice: 1800,
    features: [
      "Self-service monitoring",
      "Essential analytics",
      "Manual firmware updates",
      "Community support",
    ],
  },
];

export const tenureOptions = [
  { value: "1", label: "1 Year" },
  { value: "2", label: "2 Years" },
  { value: "3", label: "3 Years" },
];
