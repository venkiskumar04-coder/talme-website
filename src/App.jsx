import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import ManagedServices from "./components/ManagedServices";
import Engagement from "./components/Engagement";
import About from "./components/About";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SeoManager from "./components/SeoManager";
import BusinessServices from "./pages/BusinessServices";
import ClientAccountingServices from "./pages/ClientAccountingServices";
import ContactPage from "./pages/ContactPage";
import ContactCountryPage from "./pages/ContactCountryPage";
import AssurancePage from "./pages/AssurancePage";
import CareersPage from "./pages/CareersPage";
import InsightDetailPage from "./pages/InsightDetailPage";
import InsightsPage from "./pages/InsightsPage";
import LegalPage from "./pages/LegalPage";
import PeoplePractice from "./pages/PeoplePractice";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ServiceHubPage from "./pages/ServiceHubPage";
import ChatWidget from "./components/ChatWidget";
import OurClientsPage from "./pages/OurClientsPage";


import { Navigate, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <ScrollToTop />
      <SeoManager />
      <Navbar />

      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Engagement />
              <Services />
            </>
          }
        />
        <Route
          path="/services"
          element={
            <>
              <Hero />
              <Engagement />
              <Services />
            </>
          }
        />

        {/* Managed Services Page */}
        <Route path="/managed-services" element={<ManagedServices />} />
        <Route path="/assurance" element={<AssurancePage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route
          path="/staff-augmentation"
          element={<Navigate to="/services" replace />}
        />
        <Route
          path="/engineering-solutions"
          element={<Navigate to="/services" replace />}
        />
        <Route
          path="/health-care-services"
          element={<Navigate to="/services" replace />}
        />
        <Route
          path="/computer-technology"
          element={<Navigate to="/services" replace />}
        />
        <Route
          path="/product-manufacturing"
          element={<Navigate to="/services" replace />}
        />
        <Route
          path="/oem-data"
          element={<Navigate to="/services" replace />}
        />
        <Route
          path="/automotive-data"
          element={<Navigate to="/services/engineering-solutions" replace />}
        />
        <Route
          path="/aerospace-data"
          element={<Navigate to="/services" replace />}
        />
        <Route
          path="/oil-gas-data"
          element={<Navigate to="/services" replace />}
        />
        <Route
          path="/information-technology-services"
          element={<Navigate to="/services" replace />}
        />
        <Route path="/service-hub/:slug" element={<ServiceHubPage />} />
        <Route path="/business-services" element={<BusinessServices />} />
        <Route path="/business-solutions" element={<Navigate to="/services" replace />} />
        <Route path="/people-practice" element={<PeoplePractice />} />

        {/* About Page */}
        <Route path="/about" element={<About />} />
        <Route path="/client-accounting" element={<ClientAccountingServices />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/:slug" element={<InsightDetailPage />} />
        <Route path="/our-clients" element={<OurClientsPage />} />
        <Route path="/clients" element={<Navigate to="/our-clients" replace />} />
        <Route path="/about-us" element={<Navigate to="/about" replace />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/contact/:country" element={<ContactCountryPage />} />


      </Routes>

      <Footer />
      <ChatWidget />
    </>
  );
}

export default App;
