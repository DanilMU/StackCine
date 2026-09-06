/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 6,
  useTabs: true,
  trailingComma: "all",
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: [
    "classProperties",
    "decorators-legacy",
    "typescript"
  ],
  importOrder: ["<THIRD_PARTY_MODULES>", "^@/(.*)$", "^\\.\\./(.*)", "^\\./(.*)"],
  plugins: ["@trivago/prettier-plugin-sort-imports"]
}