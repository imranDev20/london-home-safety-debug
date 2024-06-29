import { BedroomsType, PropertyType, ResidentType } from "./orders";

export type ServiceFormInput = {
  propertyType: PropertyType;
  residentType: ResidentType<PropertyType>;
  bedrooms: BedroomsType<PropertyType>;
  orderItems: string[];
};

export type PersonalFormInput = {
  name: string;
  email: string;
  phone: string;
  street: string;
  postcode: string;
  city: string;
  congestionZone: string;
  parkingOptions: string;
  inspectionDate: Date | null;
  inspectionTime: string;
  orderNotes: string;
};

export type ServiceType =
  | "eicr"
  | "gas_cert"
  | "epc"
  | "pat"
  | "gas_boiler"
  | "fire_safety"
  | "fire_risk"
  | "emergency_light";
