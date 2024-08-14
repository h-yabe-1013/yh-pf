import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GalleryList } from "./pages/gallery/galleryList";
import { GalleryDetail } from "./pages/gallery/galleryDetail";
import { Contact } from "./pages/contact";
import { NotFound } from "./pages/misc/notFound";
import { Header } from "./components/layout/Header";
import './App.css';

function Router() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="Routes">
          <Routes>
            <Route path="/" element={<GalleryList />} />
            <Route path="/gallery" element={<GalleryList />} />
            <Route path="/gallery/:id" element={<GalleryDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default Router
