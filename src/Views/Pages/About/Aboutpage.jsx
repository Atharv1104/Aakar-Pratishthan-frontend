import OurTeam from "./OurTeam"
import Hero from "./Hero"
import Styles from "../../../CSS/Aboutpage/Hero.module.css";
function AboutPage() {
    return (
        <>
            <Helmet>
                <title>About Us - Aakar Pratishthan</title>
                <meta name="description" content="Learn about Aakar Pratishthan's mission, vision, and the dedicated team working to transform lives in Poladpur, Raigad." />
            </Helmet>
            <Hero />
            <OurTeam />
        </>




    )

}

export default AboutPage;