import { useEffect, useRef, useState } from 'react'
import SectionTitle from './SectionTitle'
import galleryOne from '../assets/img-4.jpg'
import galleryTwo from '../assets/img-7.jpg'
import galleryThree from '../assets/img-8.jpg'
import galleryFour from '../assets/img-1.jpg'
import galleryFive from '../assets/img-2.jpg'

export type GalleryImage = {
  src: string
  alt: string
}

type GalleryProps = {
  images?: GalleryImage[]
}

const defaultGalleryImages: GalleryImage[] = [
  { src: galleryOne, alt: 'Nail art gallery' },
  { src: galleryTwo, alt: 'Braided hairstyle gallery' },
  { src: galleryThree, alt: 'Luxury manicure look' },
  { src: galleryFour, alt: 'Salon service photo' },
  { src: galleryFive, alt: 'Hair care service photo' },
]

export default function Gallery({ images = defaultGalleryImages }: GalleryProps) {
  const [, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const scrollStartX = useRef(0)
  const frameRef = useRef<number | null>(null)

  const autoplayTimerRef = useRef<number | null>(null)
  const autoplayPausedByUserRef = useRef(false)
  const autoplayResumeTimeoutRef = useRef<number | null>(null)

  const slideCount = images.length

  const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const container = scrollContainerRef.current
    if (!container) return

    const clampedIndex = Math.max(0, Math.min(index, slideCount - 1))
    const slide = container.children[clampedIndex] as HTMLElement | null
    if (!slide) return

    const target = slide.offsetLeft - (container.clientWidth - slide.clientWidth) / 2
    container.scrollTo({ left: target, behavior })
  }

  const updateActiveIndex = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const center = container.scrollLeft + container.clientWidth / 2
    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    Array.from(container.children).forEach((child, index) => {
      const slide = child as HTMLElement
      const childCenter = slide.offsetLeft + slide.clientWidth / 2
      const distance = Math.abs(center - childCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex(closestIndex)
  }

  const handleScroll = () => {
    if (frameRef.current !== null) return
    frameRef.current = requestAnimationFrame(() => {
      updateActiveIndex()
      frameRef.current = null
    })
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current
    if (!container) return

    autoplayPausedByUserRef.current = true
    isDragging.current = true
    dragStartX.current = event.clientX
    scrollStartX.current = container.scrollLeft
    container.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current
    if (!container || !isDragging.current) return

    const delta = event.clientX - dragStartX.current
    container.scrollLeft = scrollStartX.current - delta
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current
    if (!container) return

    isDragging.current = false
    container.releasePointerCapture(event.pointerId)

    // resume autoplay shortly after user interaction ends
    if (autoplayResumeTimeoutRef.current !== null) {
      window.clearTimeout(autoplayResumeTimeoutRef.current)
      autoplayResumeTimeoutRef.current = null
    }

    autoplayResumeTimeoutRef.current = window.setTimeout(() => {
      autoplayPausedByUserRef.current = false
      autoplayResumeTimeoutRef.current = null
    }, 800)
  }

  useEffect(() => {
    updateActiveIndex()
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
      if (autoplayResumeTimeoutRef.current !== null) {
        window.clearTimeout(autoplayResumeTimeoutRef.current)
        autoplayResumeTimeoutRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideCount])

  useEffect(() => {
    if (slideCount <= 1) return

    // ~10s per slide
    const intervalMs = 10000

    const start = () => {
      if (autoplayTimerRef.current !== null) return
      autoplayTimerRef.current = window.setInterval(() => {
        if (isDragging.current || autoplayPausedByUserRef.current) return

        setActiveIndex((prev) => {
          const next = prev + 1 >= slideCount ? 0 : prev + 1
          scrollToIndex(next, 'smooth')
          return next
        })
      }, intervalMs)
    }

    start()

    return () => {
      if (autoplayTimerRef.current !== null) {
        window.clearInterval(autoplayTimerRef.current)
        autoplayTimerRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideCount])

  return (
    <section
      id="gallery"
      className="bg-[var(--color-background)] py-24 text-[var(--color-primary)]"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionTitle
          eyebrow="Gallery"
          title="Moments of Beauty"
          subtitle="A showcase of our latest hair and nail transformations."
        />

        <div className="arc-gallery">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
            className="arc-gallery-track no-scrollbar"
          >
            {images.map((image) => (
              <div key={image.alt} className="arc-gallery-slide">
                <img src={image.src} alt={image.alt} draggable={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}