// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// cloudflare: false disables the @cloudflare/vite-plugin build adapter.
// nitro({ preset: "vercel" }) produces .vercel/output/ (Vercel Build Output API v3),
// enabling Vercel to serve TanStack Start SSR routes and static assets.
// vercel.json rewrites handle /api/* and /api/auth/* proxying to the backend project.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
  },
  plugins: [nitro({ preset: "vercel" })],
});
