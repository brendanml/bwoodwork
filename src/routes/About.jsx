import CaptionImage from "@/Articles/CaptionImage"
import Header from "@/Articles/Header"
import Paragraph from "@/Articles/Paragraph"

export default function About() {
    return (
        <div className="grid grid-cols-12 gap-6 gap-y-12">
            <div className="col-span-4">
                <CaptionImage src="https://khn6vfmiqjxyjkhw.public.blob.vercel-storage.com/armscrossed.png" />
            </div>
            <div className="col-span-8 flex flex-col gap-4">
                <Header>Hi, my name is Brendan.</Header>
                <Paragraph>
                    If every woodworker has an unconventional road to
                    woodworking, are any of them truly unconventional?
                </Paragraph>
                <Paragraph>
                    <b>TLDR</b>: Frequent moves lead to me resenting Ikea
                    furniture and building my first desk top (laminated fir,
                    lol). An abundance of time (COVID) and a lack of funds saw
                    me build shelves and storage solutions for my 90sqft
                    bedroom. A lack of tools pushed me towards a career that
                    could see me afford them (BSc Computer Science, Software
                    Engineer). A national recession caused a layoff that made me
                    ask the question: "why don't I just do what I love and find
                    a way to make it work?".
                </Paragraph>
            </div>
            <div className="sm:col-span-8 flex flex-col gap-4">
                <Header>2018: A Journey Begins</Header>
                <Paragraph>
                    A newly minted University drop out, I landed a gig
                    manufacturing & delivering matresses for an upscale bedroom
                    furniture company. My delivery partner was our woodworker.
                    Our deliveries took us all around the Greater Victoria area,
                    visiting many of the nicest homes in the region. Without
                    fail, my partner would name every wood variety in the homes
                    we visited. To somebody to which wood had always been just
                    "light" or "dark", this grabbed my interest. As my interest
                    grew, I began taking a bigger role, ocaisonally finishing
                    some of the things he made.
                </Paragraph>
                <Paragraph>
                    The first project I took on was the desk top for a metal
                    base I had contracted. Not having any tools to my name, I
                    payed somebody $50 to let me plane down and joint the edges
                    of my bix box lumber. The doweling jig that I was convinced
                    would have this work surface dead flat did anything but. On
                    the bright side, never again would I have to deal with
                    process of moving or building Ikea furniture. Now knowing I
                    enjoyed making things but with my hands, I knew I would one
                    day want a shop. But woodworking "does not pay". This lead
                    to me re-enrolling in University, this time in the highly
                    lucrative Computer Science, where one day soon, I would
                    assuredly afford my own shop.
                </Paragraph>
            </div>
            <div className="sm:col-span-4">
                <CaptionImage
                    src="https://khn6vfmiqjxyjkhw.public.blob.vercel-storage.com/about/desk.png"
                    caption="My uneven, unstable, rough cut fir desk top."
                />
            </div>
            <div className="sm:col-span-4">
                <CaptionImage
                    src="https://khn6vfmiqjxyjkhw.public.blob.vercel-storage.com/first_build.png"
                    caption="My first real build. Made in the backyard of a 8 person rental while in University."
                />
            </div>
            <div className="sm:col-span-8 flex flex-col gap-4">
                <Header>2020: Lockdown Builds</Header>
                <Paragraph>
                    With the onset of COVID and school moving online, I knew I
                    would have more free time to work on projects. I bought a
                    drill and a circular saw and got to building the things my
                    room lacked. I didn't have a garage or a drive way, so any
                    and all builds would be done in the yard of an 8 person
                    rental.
                </Paragraph>
                <Paragraph>
                    It wasn't perfect, but I built it. Through and through.
                </Paragraph>
            </div>
            <div className="sm:col-span-8 flex flex-col gap-4">
                <Header>2025: Graduation and Job Woes</Header>
                <Paragraph></Paragraph>
            </div>
            <div className="sm:col-span-4">
                <CaptionImage
                    src="https://khn6vfmiqjxyjkhw.public.blob.vercel-storage.com/first_build.png"
                    caption="My first real build. Made in the backyard of a 8 person rental while in University."
                />
            </div>
            <div className="sm:col-span-4">
                <CaptionImage
                    src="https://khn6vfmiqjxyjkhw.public.blob.vercel-storage.com/first_build.png"
                    caption="My first real build. Made in the backyard of a 8 person rental while in University."
                />
            </div>
            <div className="sm:col-span-8 flex flex-col gap-4">
                <Header>2026: A Pivot</Header>
                <Paragraph>Restoring furniture. Small goods.</Paragraph>
            </div>
        </div>
    )
}
