import type { NextConfig } from 'next';
// We now explicitly import the Webpack Configuration type from 'webpack'
import type { Configuration } from 'webpack';

/** * Defines the structure of the context object passed to the webpack function.
 * We must ensure 'nextRuntime' is optional to match Next.js's behavior, 
 * resolving the "Type 'undefined' is not assignable" error.
 */
interface WebpackContext {
    isServer: boolean;
    dev: boolean;
    dir: string;
    config: NextConfig;
    webpack: typeof import('webpack');
    defaultLoaders: {
      babel: object;
    };
    // FIX: Making nextRuntime optional (?) allows it to be 'undefined'
    nextRuntime?: 'nodejs' | 'edge'; 
}


const nextConfig: NextConfig = {
  // We use the imported Configuration and the custom WebpackContext types here.
  webpack: (config: Configuration, context: WebpackContext): Configuration => {
    const { isServer } = context;

    // Only apply this configuration to the server-side build.
    if (isServer) {
      // 'serialport' is a native module that relies on C++ binaries.
      // We must tell webpack to treat it as an external dependency.
      
      // Ensure config.externals is initialized as an array.
      if (!config.externals) {
          config.externals = [];
      }
      
      // Add native modules to externals list to prevent bundling them.
      if (Array.isArray(config.externals)) {
          config.externals.push('serialport', 'buffer');
      }
    }

    return config;
  },
  
  // FIX: Removed the 'runtime' property as it is causing a type error 
  // within ExperimentalConfig. The runtime is correctly set 
  // on a per-route basis in 'route.ts' (export const runtime = 'nodejs';).
  experimental: {
    // runtime: 'nodejs', // Removed
  },
};

export default nextConfig;