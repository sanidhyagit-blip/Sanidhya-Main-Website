import { useEffect } from 'react'

export default function useReveal() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
        )

        // Small delay to ensure DOM is rendered
        const timer = setTimeout(() => {
            const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
            elements.forEach((el) => {
                observer.observe(el)
            })
        }, 100)

        // Fallback: if observer doesn't fire after 2s, force reveal everything
        const fallback = setTimeout(() => {
            const elements = document.querySelectorAll('.reveal:not(.active), .reveal-left:not(.active), .reveal-right:not(.active)')
            elements.forEach((el) => el.classList.add('active'))
        }, 2000)

        return () => {
            clearTimeout(timer)
            clearTimeout(fallback)
            observer.disconnect()
        }
    }, [])
}

