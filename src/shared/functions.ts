import slugify from "slugify";
import dayjs from "dayjs";
import { Pagination } from "@/types/misc";
import {
  IOrder,
  IOrderItemWithEngineers,
  IPreOrder,
  OrderStatus,
  OrderStatusValues,
} from "@/types/orders";
import { IUser } from "@/types/users";

import Mailjet from "node-mailjet";

export function snakeCaseToNormalText(snakeCaseString: string) {
  return snakeCaseString?.replace(/_/g, " ")?.toLowerCase();
}

export function toTitleCase(input: string): string {
  const smallWords = [
    "a",
    "an",
    "and",
    "as",
    "at",
    "but",
    "by",
    "for",
    "in",
    "of",
    "on",
    "or",
    "the",
    "to",
    "with",
  ];

  return input.toLowerCase().replace(/\w+/g, (word, index) => {
    if (index === 0 || !smallWords.includes(word)) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word;
    }
  });
}

export const customSlugify = (text: string) => {
  return slugify(text, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
};

export function isObjectEmpty<T extends {}>(obj: T): boolean {
  return Object.keys(obj).length === 0;
}

export const createQueryString = (name: string, value: string) => {
  const params = new URLSearchParams();
  params.set(name, value);
  return params.toString();
};

export const getFutureTime = () => {
  const userOrderTime = dayjs("2023-08-31T02:00:00");
  const currentTime = dayjs().set("minute", 0).set("second", 0);

  if (userOrderTime.hour() >= 9 && userOrderTime.hour() < 17) {
    const deliveryTime = userOrderTime.add(48, "hour");
    return deliveryTime;
  } else if (userOrderTime.hour() >= 17 && userOrderTime.hour() <= 23) {
    const nextDay9am = currentTime.set("hour", 9).add(1, "day");
    const deliveryTime = nextDay9am.add(48, "hour");
    return deliveryTime;
  } else {
    const sameDay9am = currentTime.set("hour", 9);
    const deliveryTime = sameDay9am.add(48, "hour");
    return deliveryTime;
  }
};

export function toSnakeCase(str: string) {
  return str
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/[^a-zA-Z0-9_]/g, "") // Remove special characters
    .toLowerCase(); // Convert to lowercase
}

export const formatResponse = <T>(
  success: boolean,
  data: T[] | T | null = null,
  message: string = "",
  pagination?: Pagination
): {
  success: boolean;
  data?: T[] | T;
  message: string;
  pagination?: Pagination;
} => {
  console.log("first");
  return {
    success,
    ...(data ? { data } : {}),
    message,
    ...(pagination && { pagination }),
  };
};

export function hexToRgba(hex: string, opacity: number): string {
  // Remove the hash symbol if present
  hex = hex.replace(/^#/, "");

  // Parse the hex color code
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Return the RGBA color string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function buildUrl(
  basePath: string,
  queries: { [key: string]: string | undefined }
) {
  // Initialize an array to hold query parameters
  const params = [];

  // Iterate over the entries of the queries object
  for (const [key, value] of Object.entries(queries)) {
    // Add the parameter if value is provided and not an empty string
    if (value && value.trim() !== "") {
      params.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value.trim())}`
      );
    }
  }

  // Construct the full URL with query parameters if any exist
  const url = params.length > 0 ? `${basePath}?${params.join("&")}` : basePath;

  return url;
}

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeout: NodeJS.Timeout;

  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export function calculatePreOrderTotalCost(order: IPreOrder<IUser>) {
  if (!order.personal_info) {
    console.log("Personal info is needed to calculate total cost");
    return;
  }

  // Calculate the total cost of order items
  const orderItemsTotal = order.service_info.order_items.reduce(
    (total, item) => {
      return total + item.price * item.quantity;
    },
    0
  );

  // Add parking cost
  const parkingCost = order.personal_info.parking_options.parking_cost || 0;

  // Add congestion zone cost
  const congestionCost = order.personal_info.congestion_zone.zone_cost || 0;

  // Calculate the final total cost
  const totalCost = orderItemsTotal + parkingCost + congestionCost;
  return totalCost;
}

export function calculateOrderTotalCost(order: IOrder<IUser>): number {
  // Calculate the total cost of order items
  const orderItemsCost = order.order_items.reduce(
    (total, item: IOrderItemWithEngineers) => {
      return total + item.price * item.quantity;
    },
    0
  );

  // Add parking cost
  const parkingCost = order.parking_options.parking_cost;

  // Add congestion zone cost
  const congestionCost = order.congestion_zone.zone_cost;

  // Calculate the total cost
  const totalCost = orderItemsCost + parkingCost + congestionCost;
  return totalCost;
}

export function getMostRecentStatus(
  statuses: OrderStatus[]
): OrderStatusValues {
  const sortedStatuses = statuses.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return sortedStatuses[0]?.status;
}

export function kebabCaseToNormalText(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
