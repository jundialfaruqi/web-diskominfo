
import HeroSection from '../components/HeroSection';
import QuickStats from '../components/QuickStats';
import ServicesPreview from '../components/ServicesPreview';
import AnnouncementsSection from '../components/AnnouncementsSection';
import NewsSection from '../components/NewsSection';
import GallerySection from '../components/GallerySection';
import PemkoNewsSection from '../components/PemkoNewsSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      <QuickStats />
      <ServicesPreview />
      <AnnouncementsSection />
      <NewsSection />
      <GallerySection />
      <PemkoNewsSection />
      <Footer />
    </main>
  );
}
