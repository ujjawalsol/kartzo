import { buildHome } from "./build-home.mjs";
import { buildShop } from "./build-shop.mjs";
import { buildCartOrders } from "./build-cart-orders.mjs";
import { buildInfoSupport } from "./build-info-support.mjs";
import { buildPolicies } from "./build-policies.mjs";
import { buildAuthAccount } from "./build-auth-account.mjs";
import { buildContentMisc } from "./build-content-misc.mjs";

console.log("=== Building KARTZO Master Storefront Pages ===");

buildHome();
buildShop();
buildCartOrders();
buildInfoSupport();
buildPolicies();
buildAuthAccount();
buildContentMisc();

console.log("=== All 28 KARTZO Pages Built Successfully ===");
