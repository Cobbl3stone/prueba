import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {};
 
const withNextIntl = createNextIntlPlugin('./i18n/requests.ts');

module.exports = withNextIntl({
  reactStrictMode: true
});

export default withNextIntl(nextConfig);
