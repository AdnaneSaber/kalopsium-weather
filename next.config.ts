import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  images: {
    domains: ["images.pexels.com", "pixabay.com", "images.unsplash.com"],
  },
};

export default withNextIntl(nextConfig);
