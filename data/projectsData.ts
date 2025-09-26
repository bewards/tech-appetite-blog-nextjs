interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'UPMC Health Plan',
    description: `Healthcare Platform innovation team project created with Sitecore Headless CMS Next.js PaaS. Co-Development and mentoring six client developers while maintaining client-facing responsibilities. Activities included a build-once deploy everywhere blue-green CI/CD process, React development through Figma component design, Storybook integration with Sitecore, and Bootstrap v5.1 custom theme.`,
    imgSrc: '/static/images/portfolio-images/PortfolioCard-UPMC-HP.png',
    href: 'https://www.upmchealthplan.com/individuals/',
  },
  {
    title: 'Win Waste Innovation',
    description: `Multi-Phase Marketing Site & Customer Portal Site built meticulously with Svelte client-side hydration and thoughtful UI considerations, such as the GSAP Animation Library and MirageJS mock-data services.`,
    imgSrc: '/static/images/portfolio-images/win-waste-thumbnail.png',
    href: 'https://www.win-waste.com/',
  },
]
export default projectsData
