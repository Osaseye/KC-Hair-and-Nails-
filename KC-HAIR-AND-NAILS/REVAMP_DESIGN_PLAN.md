# KC Hair & Nails React Revamp Design Plan

## 1. Project Analysis

### Workspace structure
- Root folder contains the legacy HTML website:
  - `index.html` (homepage)
  - `book.html` (booking page)
  - `thank-you.html`
  - `KC.css` (site styles)
  - `KC.js` (site interactions)
- React app is inside `KC-HAIR-AND-NAILS/` with:
  - `src/` for React components and assets
  - `public/brand.jpg` for brand logo and favicon
- Image assets have been moved into `src/assets/`

### Existing brand identity and palette
- Primary background: **black**
- Accent: **pink** / light pink
- Text highlight: **white**
- Logo font: **Imperial Script** for brand name styling
- Body fonts: **Poppins** and **DM Sans**
- Visual tone: luxury, bold, polished salon styling

### Existing page structure
- Hero section with a strong brand welcome and Book Now CTA
- About section describing salon services and specialty
- Services section with card-style offerings
- Gallery slider section with nail and hair examples
- Contact / booking CTA section with phone, location, email
- Footer with social links and brand reaffirmation

## 2. Design language and methodology

### What top salon sites are doing
Common patterns I found:
- Strong hero sections with large, polished service imagery
- Minimal headline + bold CTA (“Book Now”, “See Services”)
- Clean modern layouts with lots of whitespace
- Elegant brand typography + consistent accent color
- Service cards with icons + short benefit text
- Gallery sections showing real nail/hair work
- Trust-building blocks: testimonials, FAQs, location/contact
- Prominent booking/contact CTA in header and footer

### Hair & nail salon design themes observed
- High-impact visual imagery
- Clean, full-bleed hero with salon brand message
- Strong CTA buttons for booking and consultation
- Balance of luxury and approachable beauty
- Stylized typography for logo and headings
- Minimal color palette with rich contrast
- Gallery-focused presentation of finished looks
- Social proof/customer trust through testimonials
- Clear, mobile-first navigation and responsive sections

### Applicable design principles for KC Hair & Nails
- Use the existing black + pink palette consistently
- Keep the brand identity bold, modern, and elegant
- Emphasize photography and finished-service visuals
- Create a clear booking path from every page
- Design sections as reusable React components
- Preserve the brand logo and use it for recognition
- Deliver a premium salon experience through UI

## 3. Recommended page architecture

### Core pages
1. `Home`
   - Hero / welcome
   - Quick services overview
   - Gallery preview
   - Booking CTA
   - Client trust highlights
2. `About`
   - Salon story
   - Expertise and values
   - Team or stylist snapshot
3. `Services`
   - Service categories: Hair Making, Gel Nails, Wig Ventilation, Braids, Custom Beauty
   - Pricing/starting rates or service features
   - Benefit statements for each service
4. `Gallery`
   - Image grid or slider using asset photos
   - Categories: nails, braids, wig work
   - Hover overlays with short descriptions
5. `Booking`
   - Embedded form page
   - Appointment details
   - Service selection and contact fields
   - Confirmation or thank-you route
6. `Contact`
   - Phone, email, location, hours
   - Social links for Instagram/TikTok
   - Small map or service area note

### Additional pages/components to add
- `Testimonials` or `Reviews` section/page
- `FAQ` or `How It Works`
- `Special Offers` or `New Client` promotion
- `Services Detail` cards with improved layout
- `Footer` with brand, nav, social, and booking CTA

## 4. React component breakdown

### Layout components
- `Header/Nav` with logo, menu, mobile menu toggle
- `Footer` with social links, contact summary, copyright
- `PageWrapper` or `Layout` to reuse global design

### Home components
- `HeroBanner` with brand statement and CTA
- `FeatureCards` or `ServiceHighlights`
- `GalleryShowcase` / `Slider`
- `BookingCTA` section
- `BrandValues` or `Why Choose Us`

### Page-specific components
- `AboutSection` with mission and story
- `ServiceCard` for each service category
- `ServiceGrid` with icons and descriptions
- `GalleryGrid` or `Carousel` using `src/assets` images
- `BookingForm` with service dropdown and date selection
- `ContactBlock` with phone, email, location, socials
- `TestimonialCard` for customer quotes

### Utility components
- `Button` for brand CTAs
- `SectionTitle` for consistent headings
- `ImageCard` for galleries
- `Badge` or `Tag` for service features

## 5. Design scheme and style system

### Color palette
- `#000000` – background, deep luxury look
- `#ffffff` – primary text and contrast
- `#ff7ab8` or similar pink – primary action and highlights
- `#ffc2df` – secondary pink accent
- `#f5f5f5` – neutral light for text blocks or subtle backgrounds

### Typography
- Brand / logo: `Imperial Script` or similar cursive
- Headings: `Poppins` bold / semi-bold
- Body / captions: `DM Sans` or `Poppins` regular
- Accent text: uppercase labels, spaced button copy

### Spacing and layout
- Generous whitespace around sections
- Responsive grids: 1 column mobile, 2-3 columns desktop
- Full-width hero and gallery sections
- Soft rounded card corners and buttons
- Consistent section dividers and spacing

### Imagery and brand usage
- Use `public/brand.jpg` as favicon + hero accent
- Use `src/assets/img-*.jpg` in Gallery and service visuals
- Preserve icon style with modern service icons
- For hero and gallery, choose images with polished hair/nail work
- Maintain a luxury salon aesthetic with clean edges

## 6. Step-by-step revamp process

1. **Audit the legacy site**
   - Confirm all current content in `index.html`, `book.html`, `thank-you.html`, `KC.css`, `KC.js`
   - Inventory images and icons in `src/assets/`
   - Identify content that must move into React as data
2. **Map current content to React pages**
   - Home, About, Services, Gallery, Booking, Contact
   - Preserve existing copy and improve structure
3. **Define design system**
   - Set palette, typography, button styles, spacing rules
   - Create reusable Tailwind/Tokens configuration
4. **Build layout skeleton in React**
   - Create `App.tsx` route/page structure
   - Add `Header`, `Footer`, `Hero`, `ServiceCard`, `GallerySlider`
5. **Create content components**
   - Implement the booking form as a React page/component
   - Convert the slider and testimonials into reusable React sections
   - Add the contact block with direct links and social icons
6. **Add responsive behaviors**
   - Mobile-first navigation and menu toggle
   - Gallery that adapts from carousel to grid on smaller screens
   - Ensure buttons and text scale cleanly
7. **Optimize for SEO and performance**
   - Use meta tags, alt text, and meaningful section IDs
   - Load local assets from `src/assets` or `public`
   - Keep bundle small and styles scoped with Tailwind
8. **Iterate with polish**
   - Refine hover states, shadows, gradients, and spacing
   - Add testimonials or social proof where needed
   - Validate booking flow and page navigation

## 7. Recommended conversion priorities

### High priority
- Move the homepage into React with the same hero, services, gallery, contact, and booking CTA.
- Rebuild the booking page as a proper React route/component.
- Keep the brand colors and typography consistent.
- Use the current `brand.jpg` in the app and in metadata.

### Medium priority
- Add a dedicated `Services` page with expanded cards.
- Add a `Gallery` page with the existing slider images.
- Add a `Testimonials/Reviews` section.
- Improve mobile menu and smooth scrolling.

### Low priority
- Add a `FAQ` section, pricing table, and service detail modals.
- Add animations or scroll entrance effects in React.
- Add a contact map or embedded directions.

## 8. Suggested component/page list for the React revamp

- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/Hero.tsx`
- `src/components/ServiceCard.tsx`
- `src/components/ServiceGrid.tsx`
- `src/components/GalleryCarousel.tsx`
- `src/components/BookingForm.tsx`
- `src/components/ContactCard.tsx`
- `src/components/TestimonialSection.tsx`
- `src/pages/Home.tsx`
- `src/pages/About.tsx`
- `src/pages/Services.tsx`
- `src/pages/Gallery.tsx`
- `src/pages/Booking.tsx`
- `src/pages/ThankYou.tsx`

## 9. Mobile/responsive design notes
- Use a sticky or fixed header on desktop and collapsed menu on mobile.
- Hero content should stack vertically on small screens.
- Service cards should become single-column on mobile.
- Gallery should switch from carousel to swipeable cards on phones.
- Booking form fields should be clear and easy to tap.

## 10. Final recommendation

This revamp should preserve the existing KC Hair & Nails brand while modernizing the experience in React. The new version should be:
- visually polished,
- mobile-friendly,
- component-driven,
- easier to maintain,
- more scalable for future pages like `Reviews`, `Offers`, or `Team`.

Once the design system is approved, the next step is to implement the actual React pages and components with Tailwind, using the same palette and brand imagery from the current HTML site.

## 11. Visual asset requirements

These are the images you should generate or collect to make the React site look premium.

### Required visual assets
- Hero image: polished salon scene featuring nails or hair with strong black and pink mood lighting
- Service image 1: gel nail design close-up with glossy pink and white accents
- Service image 2: braided hair or wig ventilation hairstyle shot with clean styling
- Service image 3: salon hands-on service moment, such as a technician working on nails or hair
- Gallery image 1: curated manicure close-up with elegant floral or French tip design
- Gallery image 2: natural hair braids or protective style with smooth finish
- Gallery image 3: luxury salon ambience with a modern interior or branded treatment station
- Brand background accent: subtle black/pink gradient texture or soft pink shimmer overlay
- Iconography style: simple line icon set for hair, nails, wig, booking (these can be created later if needed)

### Why these assets matter
- Hero image gives immediate luxury impact and sets the tone for the page.
- Service images reinforce each main service category and help visitors understand offerings at a glance.
- Gallery images build trust by showing real results and high-quality work.
- A consistent black/pink visual mood keeps the brand aligned with your existing website.

## 12. Image generation prompts

### Prompt 1: Hero image
"A luxurious hair and nail salon scene with dramatic black and pink lighting, a stylish manicure and hair styling session in progress, modern salon interior, high-resolution, fashion photography, elegant and glamorous mood."

### Prompt 2: Gel nail service image
"Close-up of a glossy pink and white gel manicure on well-groomed hands, soft lighting, luxury salon style, high-resolution, polished nail art with subtle sparkle and floral detail."

### Prompt 3: Hair braiding / wig service image
"Professional salon hairstyle shot showing neat braids or wig ventilation styling, modern hair studio background, black and pink color accents, high-resolution, clean and elegant beauty photography."

### Prompt 4: Salon service moment
"Beauty technician gently working on a client's nails in a stylish salon, warm black and pink accents, high-end beauty environment, close-up composition, premium service atmosphere."

### Prompt 5: Gallery manicure image
"Sophisticated nail art close-up with neutral pink tones, French tip design and subtle floral elements, high-resolution photography style, luxury beauty look."

### Prompt 6: Gallery hair image
"Well-defined natural braids or protective hairstyle with smooth texture and glossy finish, salon lighting, elegant and professional hair care photography."

### Prompt 7: Brand accent texture
"Black and pink gradient background with soft shimmer and subtle glow, luxury beauty brand texture, abstract elegant pattern, high-resolution."

### Prompt 8: Booking CTA icon set (optional)
"Minimal luxury line icons for hair, nails, wig, and booking, pink and white on black background, simple and modern salon brand style."

### Prompt usage notes
- Keep the palette anchored in black, pink, and white.
- Prefer realistic salon photography over cartoon or illustration.
- Use the same luxury tone across all generated assets.
- Replace any generated stock-looking art later with actual salon photos if available.
