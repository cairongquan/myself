import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts", // 入口文件
  output: {
    dir: "dist", // 输出目录
    format: "cjs", // 输出格式，例如 'es' 或 'iife' 等
    sourcemap: true, // 生成 source map，便于调试
  },
  plugins: [
    typescript(), // 使用 TypeScript 插件
  ],
};
